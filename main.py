from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import ollama

app = FastAPI()

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    text: str

@app.post("/chat")
async def chat(msg: Message):

    response = ollama.chat(
        model='llama3',
        messages=[
            {
                'role': 'user',
                'content': msg.text
            }
        ]
    )

    return {
        "reply": response['message']['content']
    }