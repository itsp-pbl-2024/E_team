import spacy

DEBUG = True


def log(s):
    if DEBUG:
        print(s)

###
# Censor words from tetx that are very similar to theme
###


def censor(text: str, theme: str):
    nlp = spacy.load("ja_core_news_lg")
    if not theme:
        return "Error: Please provide a theme for censorship."
    doc = nlp(text)
    theme_doc = nlp(theme)
    for itr in doc:
        print(itr.text)

    censored_tokens = []
    for token in doc:
        print(token, token.similarity(theme_doc))
        if any(abs(token.similarity(theme_token)) > 0.4 for theme_token in theme_doc):
            print(f'token: "{token}" is censored.')
            censored_tokens.append("<censor>")
        else:
            censored_tokens.append(token.text)

    censored_text = ''.join(censored_tokens)
    return censored_text


def censor_by_list(text: str, theme, refs):
    nlp = spacy.load("ja_core_news_lg")
    if len(refs) == 0:
        return "Error: Please provide a theme for censorship."
    doc = nlp(text)
    theme_doc = nlp(theme)
    ref_theme_docs = []
    for ref_theme in refs:
        ref_theme_docs.append(nlp(ref_theme))

    censored_tokens = []

    log('Theme tokens:\n')
    for x in theme_tokens:
        log(x)

    for token in doc:
        if token.similarity(theme_doc) > 0.4 or any(abs(token.similarity(ref_theme)) > 0.7 for ref_theme in ref_theme_docs):
            print(f'token: "{token}" is censored.')
            censored_tokens.append("<censor>")
        else:
            censored_tokens.append(token.text)

    censored_text = ''.join(censored_tokens)
    log(f'censored text: {censored_text}')
    return censored_text
