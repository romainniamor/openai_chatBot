#COMMANDS TO RUN:
#uvicorn main:app --reload
#uvicorn main:app 

from fastapi import FastAPI, File, UploadFile, HTTPException, Form
import json
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from functions.openai_requests import convert_audio_to_text, get_chat_response
from functions.database import get_messages, store_messages, reset_db
from functions.text_to_speech import convert_text_to_speech
from functions.database import characters
from pydantic import BaseModel


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

#get all characters
@app.get('/characters')
async def get_characters():
    return characters


#get selected character 
class CharacterSelection(BaseModel):
    id: int

@app.post('/select-character')
async def select_character(selection: CharacterSelection = None):
    if selection is None or selection.id is None:
        # Sélection par défaut du premier personnage si aucun ID n'est spécifié
        selected_character = characters[0]
        print('selected_character_by_default', selected_character)
        return selected_character

    selected_character_id = selection.id
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

    with open(file.filename, "wb") as buffer:
        buffer.write(file.file.read())
    audio_input = open(file.filename, "rb")

    message_decoded = convert_audio_to_text(audio_input)
    print('message decode', message_decoded)
    
    
    #raise error if no message
    if not message_decoded:
        return HTTPException(status_code=404, detail="Decode failed")
    
    chat_response = get_chat_response(message_decoded)
    #store all messages in db
    store_messages(message_decoded, chat_response)

    print('chat_response', chat_response)

    #raise error if no response
    if not chat_response:
        return HTTPException(status_code=404, detail="Chat response failed")
    
    #convert text to speech
    audio_output = convert_text_to_speech(chat_response)

    if not audio_output:
        return HTTPException(status_code=404, detail="Problem audio output elevenlabs failed" )

    #create a generator to stream audio
    def iter_file():
        yield audio_output

    #return audio
    return StreamingResponse(iter_file(), media_type="application/octet-stream")