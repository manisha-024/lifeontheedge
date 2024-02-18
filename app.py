from dotenv import load_dotenv
import streamlit as st
import os
import google.generativeai as genai

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEYS"))
model = genai.GenerativeModel("gemini-pro")
chat = model.start_chat(history=[])

def get_gemini_response(question):
    response = chat.send_message(question, stream=True)
    return response 

st.set_page_config(page_title="Q&A Demo")

st.header("BioBot")

if 'chat_history' not in st.session_state:
    st.session_state['chat_history'] = []

st.subheader("History")

for role, text in st.session_state['chat_history']:
    st.write(f"{role}: {text}")

input_text = st.text_input("Your message:", key="input", value="")
submit_button = st.button("Ask")

if submit_button and input_text:
    st.session_state['chat_history'].append(("You", input_text))
    response = get_gemini_response(input_text)
    for chunk in response:
        st.session_state['chat_history'].append(("BioBot", chunk.text))
    
    if 'input_text' in st.query_params:
        del st.query_params['input_text']
    st.experimental_rerun()

