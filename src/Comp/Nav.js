import './Nav.css';
import logo from './logo.png';
import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
function Nav(props){

    const [user,setuser]=useState("Login");

    useEffect(()=>{
        async function getUser(){
            if(props.user){
                setuser(props.user);  
            }
            else{
                setuser("Login")
            }
        }
        getUser();
    },[props.user])

    return(
        <>
        <div className="Nav">
            <div className='logo'><Link to='/'><img src={logo} alt='logo'></img></Link></div>
            <div className='NavLinks'>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/login">{user}</Link>
            </div>
        </div>
        </>
    )
}

export default Nav;