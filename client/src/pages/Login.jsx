import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { dataContext } from '../UserContext'
import axios from "axios"

function Login() {
  let { serverUrl, setUserData } = useContext(dataContext)
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [loading,setLoading]= useState(false)
  let navigate = useNavigate()

  const handleLogin = async () => {
    try {
      setLoading(true)
      let result = await axios.post(`${serverUrl}/auth/login`, { email, password }, { withCredentials: true })
      console.log(result)
      setEmail("")
      setPassword("")
      setUserData(result.data)
      navigate("/")
    } catch (error) {
      console.log(`login error: ${error}`)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-t from-orange-500 to-lime-200 flex justify-center items-center'>
      <div className='w-[80vw] md:w-[40vw] h-[80vh] bg-[#00000068] rounded-3xl flex flex-col gap-[10px] p-[10px]'>
        <div className='flex flex-col gap-[10px]'>
          <label htmlFor="email">Email</label>
          <input type="email" id='email' className='w-full rounded-lg outline-none px-[10px] h-[40px] bg-[#ffffff77]' onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
        <div className='flex flex-col gap-[10px]'>
          <label htmlFor="password">Password</label>
          <input type="password" id='password' className='w-full rounded-lg outline-none px-[10px] h-[40px] bg-[#ffffff77]' onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>
        <div className='w-full flex justify-center items-center mt-[40px]'>
          <button className='bg-[#a9e87f] p-[10px] font-bold rounded-2xl hover:bg-[#60fd60]' onClick={handleLogin}>{loading?"loading...":"Login"}</button>
        </div>
        <div className='text-center w-full mt-[30px]'>
          <p onClick={() => navigate("/signup")} className='cursor-pointer'>Not have account? <span className='text-red-500'>Signup</span></p>
        </div>
      </div>
    </div>
  )
}

export default Login
