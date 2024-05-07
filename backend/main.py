from fastapi import FastAPI
import random

app = FastAPI()

odais = ["東工大", "東京工業大学", "東京工科大学", "日本工業大学", "科学大", "医科歯科大", "デジタルハリウッド大"]

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/odai")
async def odai(id: int = None):
    if id == None:
        return {"message": odais[random.randint(0,len(odais)-1)]}
    else:
        return {"message": odais[id % len(odais)]}

# pip install uvicorn fastapi
#  uvicorn main:app --reload で起動
# http://localhost:8000 でHellow Worldを確認