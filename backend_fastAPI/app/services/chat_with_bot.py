import os
import requests
from dotenv import load_dotenv

def ollama_chatbot(message_history):
    load_dotenv()
    API_URL = "https://router.huggingface.co/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {os.environ['HF_API_TOKEN']}",
    }

    # Convert Pydantic models to dictionaries
    serializable_message_history = [
        {"role": msg.role, "content": msg.content} 
        for msg in message_history
    ]

    def query(payload):
        response = requests.post(API_URL, headers=headers, json=payload)
        return response.json()

    response = query({
        "messages": serializable_message_history,
        "model": "deepseek-ai/DeepSeek-V3.1:novita"
    })

    return response["choices"][0]["message"]['content']
