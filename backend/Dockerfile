FROM python:3.12.3

# Install Rust
RUN apt-get update && apt-get install -y curl \
    && curl https://sh.rustup.rs -sSf | sh -s -- -y

ENV PATH /root/.cargo/bin:$PATH

WORKDIR /app

RUN pip install uvicorn fastapi pydantic pytest
RUN pip install pip setuptools wheel spacy

# Run the code below in the backend container
# RUN python -m spacy download ja_core_news_sm

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app",  "--host", "0.0.0.0", "--port", "8000", "--reload"]
