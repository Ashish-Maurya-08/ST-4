
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './Comp/Nav';
import Home from './Comp/home';
import Login from './Comp/login';
import Signup from './Comp/signup';
import About from './Comp/about';
import Contact from './Comp/contact';
import Admin from './Comp/admin';
import { useState } from 'react';
import axios from 'axios';

function App() {

  const [id,setid]=useState();
  let data="http://localhost:5000/data";
  let user="http://localhost:5000/user";

  async function getUser(){
    let res=await axios.get(user);
    if(res.data.name){
      setid(res.data.name);
    }
  }

  getUser();

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
        <Nav link={user} user={id}/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/login' element={<Login datalink={data} userlink={user} update={setid}/>}></Route>
          <Route path='/signup' element={<Signup datalink={data} userlink={user} update={setid}/>}></Route>
          <Route path='/admin' element={<Admin data={data} userlink={user} update={setid}/>}></Route>
          <Route path='*' element={<>Page Not Found</>}></Route>
        </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
