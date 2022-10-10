import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin(){

    const [data,setdata]=useState([]);

    let navigate=useNavigate();

    useEffect(()=>{
        getData();
    },[]);

    function getData(){
        axios.get("http://localhost:3001/data")
        .then((res)=>setdata(res.data))
        .catch((err)=>console.log(err))
    }

    async function deletedata(id){
        let res=await axios.delete(`http://localhost:3001/data/${id}`);
        console.log(res);
        getData();

    }

    
    const clearData=(user)=>{
        axios.post(`http://localhost:3001/user`,{})
        navigate("/");
    }

    return(
        <>
        <div className="container">
            <div className="textcenter">DataBase</div>
            {
                data.map((info)=>(
                    <>
                    <div className="button">
                    <div>{info.id}</div>
                    <div>{info.pass}</div>
                    <button onClick={()=>{deletedata(info.id)}}>Delete</button>
                    </div>
                    </>
                ))
            }
            <div className="button textcenter" style={{"marginTop":"2rem"}} >
            <button onClick={clearData}>Log Out</button>
            </div>
        </div>
        </>
    )
}


