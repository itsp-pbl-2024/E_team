from fastapi import FastAPI
import random
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from util.censor import censor
from util.chatgpt import censor_by_chatgpt
from util.chatgpt import is_synonym_by_chatgpt

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

theme_list = ["東工大", "大岡山", "東京工業大学", "東京工科大学", "日本工業大学", "科学大", "医科歯科大", "デジタルハリウッド大"]


@app.get("/theme")
async def get_theme():
    index = random.randrange(0, len(theme_list), 1)
    return {
        "theme": theme_list[index]
    }


class CensorItem(BaseModel):
    text: str
    theme: str


@app.post("/censor")
async def censor_text(item: CensorItem):
    censored_text = censor(item.text, item.theme)
    return {"censored_text": censored_text}


@app.post("/censor/chatgpt")
async def censor_text_chatgpt(item: CensorItem):
    censored_text = censor_by_chatgpt(item.text, item.theme)
    return {"censored_text": censored_text}

class SynonymItem(BaseModel):
    answer: str
    theme: str 

@app.post("/synonym")
async def is_synonym(item: SynonymItem):
    rslt = is_synonym_by_chatgpt(item.answer, item.theme)
    return {"is_synonym": rslt}


# pip install uvicorn fastapi
#  uvicorn main:app --reload で起動
# http://localhost:8000 でHellow Worldを確認
