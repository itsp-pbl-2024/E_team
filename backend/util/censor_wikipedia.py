import wikipedia
import censor

wikipedia.set_lang("jp")

print(censor.censor_by_list("""
東京工業大学（東工大）は、理工系分野で日本を代表する国立大学です。
1881年に設立され、東京都にキャンパスがあります。
科学技術と工学の教育・研究に特化しており、世界的に高い評価を受けています。
多くの優秀な研究者や技術者を輩出し、産学連携を通じて社会に貢献しています。by chatgpt-4o
""", "東工大", wikipedia.page("東工大").links))
