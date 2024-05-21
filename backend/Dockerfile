FROM python:3.12.3

WORKDIR /app

RUN pip install uvicorn fastapi

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app",  "--host", "0.0.0.0", "--port", "8000", "--reload"]