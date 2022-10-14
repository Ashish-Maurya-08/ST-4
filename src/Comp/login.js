import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import React, { useEffect, useState } from "react";
export default function Login(props) {

    const signupLink = {
        "color": "cyan",
        "fontWeight": "bold"
    }

    let buttonStyle={
        "marginTop":"3rem"
    }

    const [user, setuser] = useState();
    const [json, setjson] = useState();
    const [id, setid] = useState();
    const [pass, setpass] = useState();
    const [authr, setauthr] = useState(false);

    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setid($("#id").val());
        setpass($("#pass").val());

    }

    useEffect(() => {
        async function fetchdata() {
            let data = await axios.get(props.datalink);
            setjson(data.data);
        }
        fetchdata();
        if (id && pass) {
            auth(id, pass);
        }
    }, [id, pass])

    const auth = (user, pass) => {
        for (let key in json) {
            if (json[key].id === user && json[key].pass === pass) {
                setauthr(true);
                return;
            }
        }
        alert("Wrong Credentials!")
    }

    useEffect(() => {
        if (authr === true) {
            async function postUser() {
                await axios.post(props.userlink, { "name": id })
            }
            postUser();
            props.update(id);
            navigate("/")
        }

    }, [authr])

    const clearUser=()=>{
        async function deleteUser() {
            await axios.post(props.userlink, {})
        }
        deleteUser();
        props.update();
        setuser();
    }




    useEffect(() => {
        async function fetchuser() {
            let data = await axios.get(props.userlink);
            setuser(data.data.name);
        }
        fetchuser();
    },[]);




    if(user==="admin"){
        navigate("/admin")
    }

    // 

    return (
        <>{!user ?( 
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
                        <div style={{ textAlign: "center" }}>
                            Already have an account ?
                            <Link to="/signup" style={signupLink}> SignUp</Link>
                        </div>
                    </form>
                </div>
            </div>
        ):(
            <div className="button main" >
            <button onClick={clearUser}>Log Out</button>
            </div>
        )
}
        </>
    );
}
