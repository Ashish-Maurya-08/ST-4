// import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './Comp/Nav';
import Home from './Comp/home';
import Login from './Comp/login';
import Signup from './Comp/signup';
import About from './Comp/about';
import Contact from './Comp/contact';
import Admin from './Comp/admin';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [user,setuser]=useState();
  let str;
  function updateUser(str){
    axios.get("http://localhost:3001/user")
    .then((res)=>{
      setuser(res.data.name);
    })
    .catch((err)=>{
      setuser([]);
    })
    console.log(str);
  }

  useEffect(()=>{
    updateUser();
  },[user])

  
  updateUser("from App");

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
        <Nav user={user}/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/login' element={<Login handle={updateUser}/>}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/admin' element={<Admin />}></Route>
          <Route path='*' element={<>Page Not Found</>}></Route>
        </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
