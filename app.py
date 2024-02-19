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

st.set_page_config(page_title="BioBot")

st.header("BioBot")

if 'chat_history' not in st.session_state:
    st.session_state['chat_history'] = []
you_style = "color: #aaccff;"
biobot_style = "color:white;"

# Display chat history
st.subheader("History:")

for role, text in st.session_state['chat_history']:
    if role == "You":
        st.markdown(f'<p style="{you_style}">You: {text}</p>', unsafe_allow_html=True)
    else:
        st.markdown(f'<p style="{biobot_style}">BioBot: {text}</p>', unsafe_allow_html=True)

input_text = st.text_input("Your message:", key="input", value="")
submit_button = st.button("Ask")

# Check if the user pressed the "Enter" key
if st.session_state.get('input_text', '') != input_text:
    st.session_state['input_text'] = input_text
    if input_text:
        st.session_state['chat_history'].append(("You", input_text))
        response = get_gemini_response(input_text)
        
        # Concatenate all response chunks into a single string
        response_text = ' '.join([chunk.text for chunk in response])
        
        st.session_state['chat_history'].append(("BioBot", response_text))
        
        if 'input_text' in st.query_params:
            del st.query_params['input_text']
        st.experimental_rerun()

# Check if the user clicked the "Ask" button
if submit_button:
    st.session_state['chat_history'].append(("You", input_text))
    response = get_gemini_response(input_text)
    
    # Concatenate all response chunks into a single string
    response_text = ' '.join([chunk.text for chunk in response])
    
    st.session_state['chat_history'].append(("BioBot", response_text))
    
    if 'input_text' in st.query_params:
        del st.query_params['input_text']
    st.experimental_rerun()
