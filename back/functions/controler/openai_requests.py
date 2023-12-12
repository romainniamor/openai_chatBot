from dotenv import load_dotenv
import os
import openai
from functions.controler.database import get_messages


load_dotenv()  # python-decouple ne marchait pas, utilisation dotenv pr load variables depuis .env

openai.organization= os.getenv("OPEN_AI_ORG")
openai.api_key = os.getenv("OPEN_AI_KEY")


#OPENAI API - https://platform.openai.com/docs/api-reference/audio/createTranscription?lang=python
#openi AI - whisper
#convert audio to text
def convert_audio_to_text(audio_file):
    try:
        transcript = openai.audio.transcriptions.create(
            model="whisper-1", 
            file=audio_file, 
            response_format="text"
        )
        print(transcript)
        return transcript

    except Exception as e:
        print('error conversion audio to text:', e)
        return None
    

#openi AI - chatGpt
#get response from openAI

def get_chat_response(message_input, content):
    messages = get_messages(content)
    user_message = {'role': 'user', 'content': message_input}
    messages.append(user_message)
    print ('messages recupere par chatgpt:', messages)
    
    try:
        response = openai.chat.completions.create(
        model="gpt-4",
        messages = messages,
        max_tokens=200,
        stream=True,)
        
        print('response', response)

        message_text = ""
        for chunk in response:
            if chunk.choices[0].delta.content is not None:
                message_text += chunk.choices[0].delta.content

        print('Message text generated:', message_text)
        return message_text

    except Exception as e:
        print('Error in chat response:', str(e))
        return "Erreur lors de la génération de la réponse."
    



