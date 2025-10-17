from fastapi import APIRouter
from pydantic import BaseModel
from starlette import status
from typing import Literal, List

from ..services import chat_with_bot

router = APIRouter(
    prefix='/chat_with_bot',
    tags=['chat_with_bot']
)

class ChatMessage(BaseModel):
    role: Literal['system', 'user', 'assistant' , 'tool']
    content: str

class ChatRequest(BaseModel):
    message_history: List[ChatMessage]

@router.post('/', status_code=status.HTTP_200_OK)
async def chatbot(request: ChatRequest):
    return chat_with_bot.ollama_chatbot(request.message_history)
