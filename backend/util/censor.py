import spacy

###
# Censor words from tetx that are very similar to theme
###
def censor(text: str, theme: str):
    nlp = spacy.load("ja_core_news_sm")
    if not theme:
        return "Error: Please provide a theme for censorship."
    doc = nlp(text)
    theme_doc = nlp(theme)

    theme_tokens = set(token for token in theme_doc)
    print(f'theme_tokens: {theme_tokens}')

    censored_tokens = []
    for token in doc:
        if any(token.similarity(theme_token) > 0.6 for theme_token in theme_tokens):
            print(f'token: "{token}" is censored.')
            censored_tokens.append("<censor>")
        else:
            censored_tokens.append(token.text)

    censored_text = ''.join(censored_tokens)
    return censored_text