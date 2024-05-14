from fastapi import FastAPI
import random

app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware

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

@app.get("/censor")
async def get_theme(theme:str, sentence: str):
    mask_asta = ''
    for i in range(len(theme)):
        mask_asta = mask_asta+'*'
    censored=sentence.replace(theme,mask_asta)
    return {
        "censoredSentence": censored
    }

# pip install uvicorn fastapi
#  uvicorn main:app --reload で起動
# http://localhost:8000 でHellow Worldを確認
