from dotenv import load_dotenv
import os
import requests


load_dotenv()  # python-decouple ne marchait pas, utilisation dotenv pr load variables depuis .env


ELEVEN_LABS_KEY = os.getenv("ELEVEN_LABS_KEY")



#ELEVEN_LABS API - https://developers.eleven-labs.com/documentation/eleven-labs-api
#Convert text to speech

def convert_text_to_speech(message, id_voice):

    #define body
    data = {
        'text': message,
        "model_id": "eleven_multilingual_v2",
        "voice_settings": {
             "stability": 0.5,
             "similarity_boost": 0.5
             }
    }

    #define voice
    man_voice = 'Rd3nuFjUic1hJBsOa0zu'
    women_voice   = 'RbgOsd1xIPlj7jtSkpnG'

    headers = {'xi-api-key': ELEVEN_LABS_KEY,
                'Content-Type': 'application/json',
                  'Accept': 'audio/mpeg'}
    endpoint = f"https://api.elevenlabs.io/v1/text-to-speech/{id_voice}"

    #send request

    try:
        response = requests.post(endpoint, json=data, headers=headers)
        print('response', response)
    except Exception as e:
        print('Error in text to speech:', str(e))
        return "Erreur lors de la génération de l'audio."
    
    #handle response
    if response.status_code == 200:
        print('response ok')
        return response.content
    else:
        print('response not ok')
        return





