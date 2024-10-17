import React, {useState, useEffect} from "react";


function Sales(){
    const [salesData, setSalesData] = useState([]);

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await fetch(' http://127.0.0.1:3000/sales');
                const data = await response.json()
                setSalesData(data)
            }

            catch (error){

                console.error("error:", error)
            }
        }

        fetchData()

    }, [])


    return(
        <div>
            {salesData.map((sale)=>(
                <h1> {sale.sale_date}</h1>

            ))}
        </div>
    )
}

export default Sales
