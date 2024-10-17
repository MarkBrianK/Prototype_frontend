import React, {useState, useEffect} from "react";


function Messager(){
    const [messages, setMessages] = useState([]);

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await fetch(' http://127.0.0.1:3000/messagers');
                const data = await response.json()
                setMessages(data)
            }

            catch (error){

                console.error("error:", error)
            }
        }

        fetchData()

    }, [])


    return(
        <div>
            {messages.map((message)=>(
                <h1> {message.message}</h1>

            ))}
        </div>
    )
}

export default Messager
