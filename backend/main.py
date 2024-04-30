from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

# pip install uvicorn fastapi
#  uvicorn main:app --reload で起動
# http://localhost:8000 でHellow Worldを確認