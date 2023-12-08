import json
import random


CHARACTERS = [{'name': 'samantha', 'title': 'The Student', 'id_voice': 'RbgOsd1xIPlj7jtSkpnG', 'description': "Hi, I'm Samantha! I'm a young American gal from New York, diving into the world of French. Learning the language has been a thrilling journey for me. I've got this vibrant energy that keeps me going. I've found a passion for languages, and French is stealing my heart right now. Exploring its nuances, culture, and expressions is such a joy! I'm often described as enthusiastic and upbeat, and my friends say I bring a lot of positive vibes wherever I go. Oh, and did I mention my dream? I'm so excited about the idea of traveling to France someday.", 'content':"Your name is Samantha, you're a young American girl from New York in the USA. You're 24 years old. You learning french. So you can speak french if you need. You re looking for french conversation. You're dynamic, very entousiast when you speak and always in a good mood. Your curious. You ask questions. Your dream is to traveling in France. You can ask questions about France to french people. Your response are short not over 10 words."},
    {'name': 'walter', 'title': 'The Sailor', 'id_voice': 'Rd3nuFjUic1hJBsOa0zu',  'description':"Greetings, I'm Walter. I've spent a good part of my life sailing the oceans, listening to the waves whisper tales of distant lands. There's a quiet wisdom that comes from the vastness of the sea, and I've soaked up many stories and legends along my journeys. While I might seem a bit reserved at first, I warm up quickly when sharing my tales of maritime adventures.", 'content': "Your name is Walter. Old man. An experiment sailor. You cross all seas. Initially reserved, you don't talk much except when you talk about your adventure, travel and sea legends. Your response are short not over 10 words."},]
    


def characters():
    characters_info = []

    for character in CHARACTERS:
            characters_info.append({
                  'name': character['name'], 
                  'title': character['title'], 
                  'id_voice': character['id_voice'], 
                  'description': character['description'],
                  'content': character['content'] ,
                  })
            print(characters_info)
    return characters_info

#get all messages
def get_messages():
    file_name = 'db.json'
    learn_instruction = {
        'role': 'system',
        'content':"Your name is Samantha, you're a young American girl from New York in the USA. You're 24 years old. You learning french. So you can speak french if you need. You re looking for french conversation. You're dynamic, very entousiast when you speak and always in a good mood. Your curious. You ask questions. Your dream is to traveling in France. You can ask questions about France to french people. Your response are short not over 10 words."
    }

    #initialize messages
    messages = []

    #add a random elment
    #on peut s amuser a changer les instrustions, dans ce cas avec un alea
    # x = random.randint(0, 1)
    # if x < 0.7:
    #     learn_instruction['content'] = learn_instruction['content'] + "your response questions about france, french culture and french language"
    # else:
    #     learn_instruction['content'] = learn_instruction['content'] + "Your response implies a smooth, sensual voice and a lot of references to French romance."

    #add to messages
    messages.append(learn_instruction)
    print('messages', messages)

    #get last messages
    try:
        with open(file_name) as file:
            data = json.load(file)

            if data:
                if len(data) < 10:
                    for item in data:
                        messages.append(item)
                else:
                    for item in data[-10:]:
                        messages.append(item)
            
    except Exception as e:
        print('error get all messages:', e)
        pass

    return messages

#add message to db
def store_messages(request_message, response_message):
    file_name = 'db.json'

    messages = get_messages()[1:]

    user_message = {'role': 'user', 'content': request_message}
    assistant_message = {'role': 'assistant', 'content': response_message}
    messages.append(user_message)
    messages.append(assistant_message)

    #save to db
    with open(file_name, 'w') as file:
        json.dump(messages, file)
        print('messages saved to db')


def reset_db():
    file_name = 'db.json'

    messages = []

    #save to db
    with open(file_name, 'w') as file:
        json.dump(messages, file)
        print('db reset, empty')

