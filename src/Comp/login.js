import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import React, { useEffect, useState } from "react";
export default function Login(props) {

    const signupLink={
        "color":"cyan",
        "fontWeight":"bold"
    }

    let id,pass;
    let navigate = useNavigate();
    const [auth, setauth] = useState(false);
    const [json,setjson]=useState();
    const [user,setuser]=useState();

    useEffect(()=>{
        getuser();
    },[user])

    function getuser(){
        axios.get("http://localhost:3001/user")
        .then((res)=>setuser(res.data.name))
        .catch((err)=>console.log(err));
    }


    useEffect(()=>{
         axios.get("http://localhost:3001/data")
        .then((res)=>setjson(res.data))
        .catch((err)=>console.log(err));
    },[])

    function authen(id){
        axios.post("http://localhost:3001/user",{"name":id})
        .then(getuser());
        props.handle("on authen");
        setauth(true);
    }



    

    useEffect(() => {
        if (auth) {
            navigate("/");
        }
        if(user==="admin"){
            navigate('/admin');
        }
    },[user,auth,navigate]);



    const handleSubmit = (e) => {
        e.preventDefault();
        id = $("#id").val();
        pass = $("#pass").val();
        for (let key in json) {
            if(json[key].id===id && json[key].pass===pass){
                authen(id);
                return;
            }
        }
        alert("Wrong Crendials");
    };

    const clearData=(user)=>{
        axios.post("http://localhost:3001/user",{})
        setuser();
        props.handle();
    }

    return (
        <>{ !user ?(
            <div className="main">
                <div className="form">
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <div>Username</div>
                        <div>
                            <input type="text" title="username" id="id"></input>
                        </div>
                        <div>Password</div>
                        <div>
                            <input type="text" id="pass"></input>
                        </div>
                        <div>
                            <button type="Submit">Submit</button>
                        </div>
                        <div style={{textAlign:"center"}}>
                            Already have an account ? 
                            <Link to="/signup" style={signupLink}> SignUp</Link>
                        </div>
                    </form>
                </div>
            </div>
):(
    <div className="main button">
        <button type="submit" onClick={clearData}>Log Out</button>
    </div>
)
}
        </>
    );
}
