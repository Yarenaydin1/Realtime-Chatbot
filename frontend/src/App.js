import useWebSocket from "react-use-websocket";
import { useState , useEffect} from "react";
function App() {
   
  const [text,setText]= useState("")
   
  const[ messages,setMessages] =useState([])

  const{sendMessage , lastMessage }= useWebSocket("ws://localhost:8000/chatroom/")

  console.log(messages)
  const submitMessage = (e) => {
    e.preventDefault()
    sendMessage(text)
    setMessages(
      [...messages, {value: text , sent:true}]
    )
    setText("")
  }
  
  useEffect(() => {
    if(lastMessage !== null){
      setMessages(
        [...messages,{value: lastMessage.data , sent:false}]
      )
    }
  }, [lastMessage])

  return (
    <div className="bg-green-300" >
      <div className="bg-white  h-screen max-w-xl mx-auto flex flex-col justify-between">
        <div className="bg-green-700 p-4 text-white font-bold text-xl" >
           <span>
          ChatApp
        </span>
        </div>



      <div className="h-full p-4 overflow-y-auto">
        <div className="flex flex-col space-y-2">

          {messages.map((msg, index)=>(
            msg.sent ? (
              <div className="flex flex-col items-end " key={index}>
            <div className="bg-green-100  p-3 rounded-xl text-lg">
              {msg.value}
            </div>
           

          </div>
            ) :(
                <div className="flex flex-col items-start" key={index}>
            <div className="bg-slate-100 p-3 rounded-xl text-lg">
              {msg.value}
            </div>
           

          </div>
            )
  

          ))}
        
        
          

        </div>

      </div>

      <form className="p-3" onSubmit={submitMessage}>
        <input 
        type="text"
        placeholder=" Your message"
        onChange= {(e) => setText(e.target.value)}
        value={text}
        className="border-2  border-black rounded-full w-full text-xl p-3 text-black"
        />
      </form>
       
      </div>
    </div>
  );
}

export default App;
