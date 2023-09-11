import './App.css';
import React, { useContext, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import { useEffect } from 'react';
import { connectWithWebSocket } from './utils/wssConnection/wssConnection';
import Dashboard from './Dashboard/Dashboard';
import Login from "./User/Login"
import SignUp from './User/SignUp';
import AuthContext from './utils/auth/AuthContext';

function App () {
  const {user}=useContext(AuthContext)
  const [isFinishUseEffect, setIsFinishUseEffect]=useState(false);
  useEffect(() => {
    const confunc=async()=>{
      console.log("app useeffect")
    const res=await connectWithWebSocket(setIsFinishUseEffect);
    console.log(res);
    }
    confunc();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {user && isFinishUseEffect && <Route path='/' element={<Dashboard />}/>}
        {!user && <Route path='/' element={<Login />}/>}
        {!user && <Route path='/signup' element={<SignUp/>} />}
        </Routes>
      </BrowserRouter>
  );
}

export default App