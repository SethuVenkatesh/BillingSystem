import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
  const [passwordShown,setPasswordShown] = useState('password')
  const navigate = useNavigate()
  const handlePassword=()=>{
    const newInputType = passwordShown === 'text' ? 'password' : 'text';
    setPasswordShown(newInputType);
  }

  const handleSignUp = () =>{
    navigate('/signup')
  }


  return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-orange-800 via-white to-green-800">
          <div className='p-8 border border-gray-300 rounded-md flex flex-col w-1/4 gap-4 z-10 bg-white shadow-md min-w-[300px]'>
              <p className='text-center font-bold text-slate-500 text-xl '>Login</p>
              <input type='' className='px-2 py-2 border-2 border-gray-400 rounded-md outline-none focus:border-sky-500	' placeholder='Username'/>
              <div className='relative'>
                <input type={`${passwordShown}`} className='w-full px-2 py-2 border-2 border-gray-400 rounded-md outline-none focus:border-sky-500	' placeholder='Password'/>
                <span className='absolute right-2 top-2 cursor-pointer z-10' onClick={()=>handlePassword()}>
                    {
                      passwordShown=='text' ? <VisibilityIcon/> : <VisibilityOffIcon/>
                    }
                </span>
              </div>
              <div className='bg-blue-500 px-2 py-2 rounded-md font-bold text-white text-center'>Login</div>
              <p className='text-blue-600 font-semibold cursor-pointer' onClick={()=>handleSignUp()}>Create an account</p>
          </div>
      </div>
  )
}

export default LoginPage