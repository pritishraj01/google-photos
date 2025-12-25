import React, { useContext } from 'react'
import {Navigate, Route, Routes} from "react-router-dom"
import Signup from './pages/Signup'
import Home from './pages/Home'
import Login from './pages/Login'
import { dataContext } from './UserContext'

function App() {
  let {userData}= useContext(dataContext)
  return (
    <Routes>
      <Route path='/signup' element={userData?<Navigate to={"/"}/>:<Signup/>}/>
      <Route path='/login' element={userData?<Navigate to={"/"}/>:<Login/>}/>
      <Route path='/' element={userData?<Home/>:<Navigate to={"/login"}/>}/>
    </Routes>
  )
}

export default App
