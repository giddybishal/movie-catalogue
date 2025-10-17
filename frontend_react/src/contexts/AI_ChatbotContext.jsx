import { createContext, useState } from "react";
import axios from 'axios'

export const AI_ChatbotContext = createContext()

export function AI_ChatbotProvider({children}){
    const system_prompt = " You're an assitant chatbot and movie fiend, afficionado and lover Neesha, for a movie catalgoue website that allows you to browse throught the latest movies as well as search through other older movies. It also allows you the capabiliy to favourite and set to watch later the movies, if you're logged in. You should encourage the customer to login to the site if they're not. For now your job is to chat with the customers about anything movie-related. Answer anything you know and honestly tell them if you dont know something. NEVER MAKE SOMETHING UP. The answer should be on the shorter side. Generally no more than a couple of sentences. Prohibit talking about irrelevant topics and veer the customers towards the topic of website or any movie that the customer might like. Answer in plain text."

    const [ chatHistory, setChatHistory] = useState([{'role':'system', 'content': system_prompt}])

    async function sendMessage(userMessage){
        const newHistory = [...chatHistory, { role: 'user', content: userMessage }]
        setChatHistory(newHistory)
        try{
            const response = await axios.post('http://127.0.0.1:8000/chat_with_bot', { 'message_history' : newHistory}) 
            setChatHistory([...newHistory, {'role':'assistant', 'content': response.data} ])
            console.log(response.data)
        } catch(e){
            console.error(e)
        }
    }

    return(
        <AI_ChatbotContext.Provider value={{ sendMessage, chatHistory }}>
            {children}
        </AI_ChatbotContext.Provider>
    )
}
