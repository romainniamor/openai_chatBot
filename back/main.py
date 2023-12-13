#COMMANDS TO RUN:
#uvicorn main:app --reload
#uvicorn main:app 

from fastapi import FastAPI, File, UploadFile, HTTPException, Form
import json
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from functions.controler.openai_requests import convert_audio_to_text, get_chat_response
from functions.controler.database import get_messages, store_messages, reset_db
from functions.controler.text_to_speech import convert_text_to_speech
from functions.controler.database import characters

from pydantic import BaseModel


from functions.analyser.doc_to_text import get_pdf_text, get_text_chunks
from functions.analyser.openai_embedings import get_vectorstore
from functions.analyser.openai_embedings import get_conversation_chain


#CONFIG

#initiate app
app = FastAPI()

#CORS - origins - URLS that can access this API
#https://fastapi.tiangolo.com/tutorial/cors/
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
]

#CORS - middleware - allows for cross origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#CONTROLER

#get all characters
@app.get('/characters')
async def get_characters():
    return characters


#get selected character 
class CharacterSelection(BaseModel):
    id: int

selected_character_id = 0  # ID du personnage par défaut (premier personnage)

@app.post('/select-character')
async def select_character(selection: CharacterSelection = None):
    global selected_character_id
    if selection is None or selection.id is None:
        # Sélection par défaut du premier personnage si aucun ID n'est spécifié
        selected_character = characters[0]
        selected_character_id = selected_character['id']  # Mise à jour de la variable globale
        print('selected_character_by_default', selected_character)
        return selected_character

    selected_character_id = selection.id  # Mise à jour de la variable globale
    print('selected_character_id', selected_character_id)

    for character in characters:
        if character['id'] == selected_character_id:
            selected_character = character
            print('selected_character', selected_character)
            return selected_character
    
    return HTTPException(status_code=404, detail="Character not found")



#localhost:8000/docs - documentation for all API
#reset db messages
@app.get("/reset")

async def reset_conversation():
    reset_db()
    return {"message": "conversation reset empty db"}

#get audio
@app.post("/audio-post")
async def post_audio(file: UploadFile = File(...)):

    global selected_character_id

    with open(file.filename, "wb") as buffer:
        buffer.write(file.file.read())
    audio_input = open(file.filename, "rb")

    message_decoded = convert_audio_to_text(audio_input)
    print('message decode', message_decoded)
    
    
    #raise error if no message
    if not message_decoded:
        return HTTPException(status_code=404, detail="Decode failed")
    


       # Get selected character's voice ID
    selected_character = next((c for c in characters if c['id'] == selected_character_id), characters[0])
    id_voice = selected_character['id_voice']
    prompt = selected_character['content']
    print('id_voice', id_voice)
    print('prompt', prompt)
    
    chat_response = get_chat_response(message_decoded, prompt)
    #store all messages in db
    store_messages(message_decoded, chat_response, prompt)

    print('chat_response', chat_response)

    #raise error if no response
    if not chat_response:
        return HTTPException(status_code=404, detail="Chat response failed")
    
 
    
    #convert text to speech
    audio_output = convert_text_to_speech(chat_response, id_voice)

    if not audio_output:
        return HTTPException(status_code=404, detail="Problem audio output elevenlabs failed" )

    #create a generator to stream audio
    def iter_file():
        yield audio_output
        

    # return both text and audio
    return StreamingResponse(iter_file(), media_type="application/octet-stream")

#ANALYSER

@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):

    #get pdf text
    raw_text = get_pdf_text(file)
    print('raw_text', raw_text)

    #get text chunks
    text_chunks = get_text_chunks(raw_text)
    print('text_chunks', text_chunks)

    #create vectorestore
    vectorestore = get_vectorstore(text_chunks)
    print('vectorestore', vectorestore)

    #create conversation chain
    conversation = get_conversation_chain(vectorestore)
    print('conversation', conversation)
  
    return {"message": "pdf uploaded and treated"}
    

@app.post("/get-request")
async def get_request():
    ia_response = "Réponse de l'IA"
    user_request = "Requête de l'utilisateur lorem ipsum generator user"
    return {"user": user_request, "bot": ia_response}