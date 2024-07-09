import spacy
from fastapi import HTTPException
from .censor_settings import DifficultyType

###
# Censor words from tetx that are very similar to theme
###

no_wikipedia = False

def censor(text: str, theme: str, difficulty: DifficultyType):
    similarity_th = 0.4 if difficulty == DifficultyType.normal else 0.3

    if(not no_wikipedia):
        from .censor_wikipedia import censor_by_wikipedia
        censored_text = censor_by_wikipedia(text, theme, difficulty)
    else:
        nlp = spacy.load("ja_core_news_lg")
        if not theme:
            log("Error: Please provide a theme for censorship.")
            raise HTTPException(status_code=400, detail="Error: No theme selected")
        if not text:
            log("Error: Please provide an explanation for censorship.")
            raise HTTPException(status_code=400, detail="Error: Please input explanation")
        doc = nlp(text)
        theme_doc = nlp(theme)
        for itr in doc:
            print(itr.text)

        censored_tokens = []
        for token in doc:
            print(token, token.similarity(theme_doc))
            if any(abs(token.similarity(theme_token)) > similarity_th for theme_token in theme_doc):
                print(f'token: "{token}" is censored.')
                censored_tokens.append("<censor>")
            else:
                censored_tokens.append(token.text)

        censored_text = ''.join(censored_tokens)
    return censored_text


def censor_by_list(text: str, theme: str, refs: list[str], difficulty=DifficultyType.normal):
    sim_theme_th = 0.4 if difficulty == DifficultyType.normal else 0.35
    sim_ref_th = 0.9 if difficulty == DifficultyType.normal else 0.6

    nlp = spacy.load("ja_core_news_lg")
    if len(refs) == 0:
        return "Error: Please provide a theme for censorship."
    doc = nlp(text)
    theme_doc = nlp(theme)
    ref_theme_docs = []
    #print(f"refs: {refs}")
    for ref_theme in refs:
        ref_theme_docs.append(nlp(ref_theme))
        #print(f"sim: {ref_theme} {theme_doc.similarity(ref_theme_docs[-1])}")

    censored_tokens = []

    for token in doc:
        if token.similarity(theme_doc) > sim_theme_th or any(abs(token.similarity(ref_theme)) > sim_ref_th for ref_theme in ref_theme_docs):
            print(f'token: "{token}" is censored.')
            censored_tokens.append("<censor>")
        else:
            censored_tokens.append(token.text)

    censored_text = ''.join(censored_tokens)
    #log(f'censored text: {censored_text}')
    #print(f'censored text: {censored_text}')
    return censored_text
