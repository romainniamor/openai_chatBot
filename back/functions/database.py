import json
import random

# load characters from json file
with open('characters.json') as file:
        characters = json.load(file)  

#get all messages
def get_messages():
    file_name = 'db.json'
    learn_instruction = {
        'role': 'system',
        'content': 'your name is walter. You response yes or no. Response under 2 words'
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

