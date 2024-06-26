ChatGPTを使う場合は、.envファイルを作成し、
```
OPENAI_API_KEY=XXXXXXXXXX
```
のように記述してください。

ターミナルで[chatgpt.py](./util/chatgpt.py)を実行する場合は以下のコマンドを実行して環境変数を読み込んでください。
```
export $(cat .env | grep -v ^# | xargs);
```
