from fastapi import FastAPI
import random
<<<<<<< HEAD

app = FastAPI()

odais = ["東工大", "東京工業大学", "東京工科大学", "日本工業大学", "科学大", "医科歯科大", "デジタルハリウッド大"]
=======
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]
>>>>>>> origin/main

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

theme_list = ["東工大", "大岡山"]

@app.get("/theme")
async def get_theme():
    index = random.randrange(0, len(theme_list), 1)
    return {
        "theme": theme_list[index]
    }

@app.get("/odai")
async def odai(id: int = None):
    if id == None:
        return {"message": odais[random.randint(0,len(odais)-1)]}
    else:
        return {"message": odais[id % len(odais)]}

# pip install uvicorn fastapi
#  uvicorn main:app --reload で起動
# http://localhost:8000 でHellow Worldを確認
