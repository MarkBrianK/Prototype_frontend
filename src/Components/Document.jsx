import React, {useState, useEffect} from "react";
function DocumentPage(){
    const [documents, setDocuments] = useState([])


    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await fetch(' http://127.0.0.1:3000/documents');
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
        <>

            {documents.map((document)=>(
                <>


                <p> {document.user_id} </p>
                </>

            ))}
        </>
    )
}

export default DocumentPage
