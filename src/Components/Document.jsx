import React, {useState, useEffect} from "react";


function Document(){
    const [documents, setDocuments] = useState([]);

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await fetch(' http://127.0.0.1:3000/meetings');
                const data = await response.json()
                setDocuments(data)
            }

            catch (error){

                console.error("error:", error)
            }
        }

        fetchData()

    }, [])


    return(
        <div>
            {documents.map((document)=>(
                <h1> {document.link}</h1>

            ))}
        </div>
    )
}

export default Document
