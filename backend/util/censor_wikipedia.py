import wikipedia
from .censor import censor_by_list, DifficultyType

wikipedia.set_lang("jp")

def censor_by_wikipedia(text: str, theme: str, difficulty: DifficultyType) -> str:
    return censor_by_list(text, theme, wikipedia.page(theme).links)

if __name__ == "__main__":
    content="""
東京工業大学（東工大）は、理工系分野で日本を代表する国立大学です。
1881年に設立され、東京都にキャンパスがあります。
科学技術と工学の教育・研究に特化しており、世界的に高い評価を受けています。
多くの優秀な研究者や技術者を輩出し、産学連携を通じて社会に貢献しています。by chatgpt-4o
"""
    theme = "東工大"
    # content = "東工大は大岡山にある大学です。SAOの聖地でもあります。"
    # theme = "東京工業大学"

    print(censor_by_list(content, theme , wikipedia.page(theme).links))
