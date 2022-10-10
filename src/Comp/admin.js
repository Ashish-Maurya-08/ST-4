import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Admin(props){
    const navigate=useNavigate();
    const [data,setdata]=useState([]);
    const btn={
        "marginTop":"2rem"
    }


    useEffect(()=>{
        getData();
    },[]);

    async function getData(){
        let res=await axios.get(props.data)
        setdata(res.data);
    }

    async function deletedata(id){
        await axios.delete(`http://localhost:5000/data/${id}`);
        getData();
    }
    const clearUser=()=>{
        async function deleteUser() {
            await axios.post(props.userlink, {})
        }
        deleteUser();
        props.update();
        navigate("/")

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
            <div className="button textcenter" style={btn} >
            <button onClick={clearUser}>Log Out</button>
            </div>
        </div>
        </>
    )
}


