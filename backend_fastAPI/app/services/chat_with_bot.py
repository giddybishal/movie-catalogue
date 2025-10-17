import ollama

def ollama_chatbot(message_history):
    MODEL = 'deepseek-v3.1:671b-cloud'
    response = ollama.chat(model=MODEL, messages=message_history)
    return response['message']['content']
