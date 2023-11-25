import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import Toaster from '../../components/common/Toaster';
import api from '../../axios';

const SignUpPage = () => {
  const [passwordShown,setPasswordShown] = useState('password');
  const [confirmPasswordShown, setConfirmPasswordShown] =  useState('password');
  const [toastMsg,setToastMsg] =useState("");

  const [userData, setUserData] =  useState({
    username:'',
    password:'',
    email:'',
    profile_url:'',
    mobile_number:'',
  })
  const navigate = useNavigate()
  const handlePassword=(method, passwordType )=>{
    const newInputType = passwordType === 'text' ? 'password' : 'text';
    if(method === 'password'){
      setPasswordShown(newInputType);  
    }else if(method === 'confirmPassword'){
      setConfirmPasswordShown(newInputType);
    }
  }

  const isValidEmail = (email) => {
    const regex =  /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/;
    return email.match(regex);
  }

  const handleLogin=()=>{
    navigate('/')
  }

  const createNewAccount = () => {
    if(!isValidEmail(userData.email)){
      setToastMsg("Enter a valid email address");
      return;
    }
    if(userData.password !== userData.confirmPassword){
      setToastMsg("Pasword and confirm password should be same");
      return;
    }
    // call create user api
    api.post('/user/new',{userData}).then((req,res)=>{
      console.log(res)
    }).catch(e=>console.log("error"))
  }

  const handleInputChange = (e) => {
    setUserData({...userData, [e.target.name]:e.target.value})
  }

  return (
      <div className="flex items-center justify-center h-screen bg-authimg bg-cover bg-center bg-no-repeat">
        {toastMsg.length>=1&&
          <Toaster toastMsg={toastMsg} setToastMsg={setToastMsg} isSuccess={false}/>
        }
          <div className='p-8 border border-gray-300 rounded-md flex flex-col w-1/4 gap-4 z-10 bg-white shadow-md min-w-[300px]'>
              <p className='text-center font-bold text-slate-500 text-xl '>Sign Up</p>
              <input type='text' className='px-2 py-2 border-2 border-gray-400 rounded-md outline-none focus:border-sky-500	' placeholder='Username' name='username' onChange={handleInputChange}/>
              <input type='text' className='px-2 py-2 border-2 border-gray-400 rounded-md outline-none focus:border-sky-500	' placeholder='Email' name='email' onChange={handleInputChange}/>
              <div className='relative'>
                <input type={`${passwordShown}`} className='w-full px-2 py-2 border-2 border-gray-400 rounded-md outline-none focus:border-sky-500' placeholder='Password' name='password' onChange={handleInputChange}/>
                <span className='absolute right-2 top-2 cursor-pointer z-10' onClick={()=>handlePassword('password', passwordShown)}>
                    {
                      passwordShown === 'text' ? <VisibilityIcon/> : <VisibilityOffIcon/>
                    }
                </span>
              </div>
              <div className='relative'>
                <input type={`${confirmPasswordShown}`} className='w-full px-2 py-2 border-2 border-gray-400 rounded-md outline-none focus:border-sky-500' placeholder='Confirm Password' name='confirmPassword' onChange={handleInputChange}/>
                <span className='absolute right-2 top-2 cursor-pointer z-10' onClick={()=>handlePassword('confirmPassword', confirmPasswordShown)}>
                    {
                      confirmPasswordShown === 'text' ? <VisibilityIcon/> : <VisibilityOffIcon/>
                    }
                </span>
              </div>
              <input type='number' className='px-2 py-2 border-2 border-gray-400 rounded-md outline-none focus:border-sky-500	' placeholder='Mobile Number' name='mobile_number' onChange={handleInputChange}/>
              <div className='bg-blue-500 px-2 py-2 rounded-md font-bold text-white text-center cursor-pointer' onClick={() => createNewAccount()}>Sign Up</div>
              <p className='text-blue-600 font-semibold cursor-pointer' onClick={()=>handleLogin()}>Already have an account</p>
          </div>
      </div>
  )
}

export default SignUpPage;