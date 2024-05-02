import React,{lazy} from 'react'
import {BrowserRouter as Router,Routes,Route, BrowserRouter} from "react-router-dom";

const Home=lazy(()=>import("./pages/Home"));  //we use lazy function for dynmaic routing which is loaded only when its needed
const Login=lazy(()=>import("./pages/Login"));
const Chat=lazy(()=>import("./pages/Chat"));
const Group=lazy(()=>import("./pages/Group"));


const App = () => {
  return (
    <Router>
    <h1>Hello world</h1>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/chat/:chatId' element={<Chat/>}/>
        <Route path='/group' element={<Group/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </Router>
  )
}

export default App