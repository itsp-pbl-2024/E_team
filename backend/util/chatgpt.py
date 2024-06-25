from openai import OpenAI
import re

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
    client = OpenAI()
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user",
                   "content": f"2つの単語の類似性を1~5で評価してください。簡単な理由を述べ、「類似性:<1~5>」という形式で回答してください\n"
                              f"\n"
                              f"全く同じもの、例えば「水」と「H2O」のような場合、5\n"
                              f"類似、例えば「金」と「銀」のような場合、4\n"
                              f"包含関係、例えば「日本」と「東京」のような場合、3\n"
                              f"弱い類似、例えば「犬」と「牛」のような場合、2\n"
                              f"全く異なるものなら、1\n"
                              f"---\n"
                              f"{answer}\n"
                              f"{theme}\n"
                   }],
    )
    rslt:str = completion.choices[0].message.content
    pattern = r'類似度.*?([1-5])'
    for line in rslt.splitlines():
        match = re.search(pattern, line)
        if match:
            number = match.group(1)
            if number == 5:
                return True
    return False

if __name__ == "__main__":
    content = "東工大は大岡山にある大学です。SAOの聖地でもあります。"
    theme = "東京工業大学"

    print(cencor_by_chatgpt(content, theme))
