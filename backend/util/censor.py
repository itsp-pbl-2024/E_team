import spacy
from fastapi import HTTPException

DEBUG = True

def log(s):
    if DEBUG:
        print(s)

###
# Censor words from tetx that are very similar to theme
###
def censor(text: str, theme: str):
    nlp = spacy.load("ja_core_news_sm")
    if not theme:
        log("Error: Please provide a theme for censorship.")
        raise HTTPException(status_code=400, detail="Error: No theme selected")
    if not text:
        log("Error: Please provide an explanation for censorship.")
        raise HTTPException(status_code=400, detail="Error: Please input explanation")
    doc = nlp(text)
    theme_doc = nlp(theme)

    theme_tokens = set(token for token in theme_doc)
    log(f'theme_tokens: {theme_tokens}')

    censored_tokens = []

    log('Theme tokens:\n')
    for x in theme_tokens:
        log(x)

    for token in doc:
        log(f'similarity {token} and {theme_tokens}: {max(token.similarity(theme_token) for theme_token in theme_tokens)}')
        if any(token.similarity(theme_token) > 0.5 for theme_token in theme_tokens):
            log(f'token: "{token}" is censored.')
            censored_tokens.append("<censor>")
        else:
            censored_tokens.append(token.text)

    censored_text = ''.join(censored_tokens)
    log(f'censored text: {censored_text}')
    return censored_text