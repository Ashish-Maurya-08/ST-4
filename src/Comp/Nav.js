import './Nav.css';
import logo from './logo.png';
import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
function Nav(props){

    const [user,setuser]=useState("Login");

    useEffect(()=>{
        updateTag();
    },[props.user])

    const updateTag=()=>{
        if(props.user){
            setuser(props.user)
        }
    }

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