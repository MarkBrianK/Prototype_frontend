import React, {useState, useEffect} from "react";


function Meeting(){
    const [meetings, setMeetings] = useState([]);

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await fetch(' http://127.0.0.1:3000/meetings');
                const data = await response.json()
                setMeetings(data)
            }

            catch (error){

                console.error("error:", error)
            }
        }

        fetchData()

    }, [])


    return(
        <div>
            {meetings.map((meet)=>(

                <div>
                <p> {meet.description}</p>
                <p> {meet.date}</p>
                </div>

            ))}
        </div>
    )
}

export default Meeting
