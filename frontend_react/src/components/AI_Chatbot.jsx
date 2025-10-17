import { useState } from "react"

function AI_Chatbot(){
    const [ chatActive, setChatActive ] = useState(false)
    const [ chatInput, setChatInput ] = useState('')
    const [ chatHistory, setChatHistory] = useState([{'role':'user', 'content': 'hello'}, {'role': 'bot', 'content': 'hey there!'}])

    function handleChatInput(){
        if (!chatInput){
            return
        }
        setChatHistory([...chatHistory, {'role':'user', 'content': chatInput}])
        setChatInput('')
    }
    
    return(
        <div className="fixed bottom-15 right-5 flex items-end space-x-2">
           { !chatActive && 
            <div className="bg-white text-blue-500 text-[12px] md:text-[15px] px-3 py-2 rounded-lg relative max-w-xs left-5">
                Let's talk about a movie!
                <div className="absolute bottom-0 right-0 w-0 h-0 border-t-8 border-t-white border-l-8 border-l-transparent translate-x-1/2 translate-y-1/2"></div>
            </div>}
            { chatActive && 
            <div className="w-[250px] h-[300px] md:w-[300px] md:h-[350px] bg-pink-200/95 relative bottom-15 left-11 md:bottom-20 md:left-12 rounded-md">
                <div className="font-normal text-sm text-left h-[85%] flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-lime-800 scrollbar-track-pink-100">
                    { chatHistory.map(chat => 
                    <div className={chat.role === 'user' ? 'text-black  ml-auto m-1 bg-purple-400 rounded-md w-fit max-w-[60%] px-2 py-1': 'text-white m-1 mr-auto bg-cyan-800 rounded-md w-fit max-w-[60%] text-left px-2 py-1'}>
                        {chat.content}
                    </div>)
                }
                </div>
                <div className="absolute bottom-0 left-0 h-[15%] w-full flex">
                    <input 
                        type="text" 
                        className="w-4/5 font-normal bg-orange-800 text-white text-[15px] px-2 focus:outline-none focus:border-transparent" 
                        placeholder="Talk to me..."
                        value={chatInput}
                        onChange={e=>setChatInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleChatInput()}
                    />

                    <button className="w-1/5 bg-cyan-700 text-white text-sm hover:bg-cyan-800 cursor-pointer" onClick={handleChatInput}>
                        Send
                    </button>
                </div> 
            </div>
            }

            <img src="/chat_bot.png" className="w-15 md:w-20 cursor-pointer bg-white rounded-full" onClick={()=>setChatActive(!chatActive)}/>
        </div>
    )
}

export default AI_Chatbot
