from openai import OpenAI


# client = openai.OpenAI(
#     organization="org-I8YkLWwovxecZf4Vx8IyF2ok",
#     project="proj_LApVUeX69juOsNm9f5WrZENZ",
# )

def cencor_by_chatgpt(text: str, theme: str):
    client = OpenAI()
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user",
                   "content": f"これからあなたにある単語についての説明文を渡します。"
                              f"あなたの役割は、説明文を検閲し、なんの単語について説明しているかわかりにくくすることです。"
                              f"ゲームを楽しくするため、何を説明しているかわかりにくくなるようにしてください。"
                              f"次の文章に関して、{theme}と推測されそうな言葉すべてを-に置き換えて返信してください。\n\n"
                              f"{text}"
                   }],
    )
    return completion.choices[0].message.content

def is_synonym_by_chatgpt(answer: str, theme: str) -> bool:
    return answer.lower() == theme.lower()

if __name__ == "__main__":
    content = "東工大は大岡山にある大学です。SAOの聖地でもあります。"
    theme = "東京工業大学"

    print(cencor_by_chatgpt(content, theme))
