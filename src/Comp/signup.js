import axios from "axios";
import $ from "jquery";
import { useNavigate } from "react-router-dom";

export default function Signup(props) {
    let email,id,pass;
    let navigate=useNavigate();
    const handleSubmit=(e)=>{
        e.preventDefault();
        email=$('#email').val();
        id=$('#id').val();
        pass=$('#pass').val();

        if(!id || !email || !pass){
            alert("Invailed")
            return;
        }

        axios.post("http://localhost:3001/data",{
            "id":id,
            "email":email,
            "pass":pass
        }).then((res)=>{
            navigate("/");
        })
        .catch((err)=>{alert("Some Error Occured!!")})

        axios.post("http://localhost:3001/user",{"name":id})
    }

    return (
        <div className="main">
            <div className="form">
                <form onSubmit={handleSubmit} autoComplete="off">
                    <div>Email Address</div>
                    <div>
                        <input type="text" title="Email" id="email"></input>
                    </div>
                    <div>Username</div>
                    <div>
                        <input type="text" title="username" id="id"></input>
                    </div>
                    <div>Password</div>
                    <div>
                        <input type="text" id="pass"></input>
                    </div>
                    <div>
                        <button type="Submit">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
