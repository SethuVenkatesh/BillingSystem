import React, { useEffect, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PopupComponent from '../../components/common/PopupComponent';
import { useNavigate } from 'react-router-dom';
import api from '../../axios';
import { useRef } from 'react';
const LoginPage = () => {
  const itemsRef = useRef([]);

  const [showPopUp,setShowPopUp]=useState(false);
  const [resetPassIndex,setResetPassIndex] = useState(0);
  const [resetInfo,setResetInfo] = useState({
    email:"",
    otp:"",
    username:"",
    password:"",
    confirm_password:""
  })


  const onCloseFn=()=>{
    setShowPopUp(false);
  }

  const [passwordShown,setPasswordShown] = useState('password')
  const [newPasswordShown,setNewPasswordShown] = useState('password');
  const [confirmNewPasswordShown, setConfirmNewPasswordShown] =  useState('password');
  const [userCredentials,setUserCredentials] = useState({
    username:'',
    password:''
  })
  const navigate = useNavigate()

  const handlePassword=(method, passwordType )=>{
    const newInputType = passwordType === 'text' ? 'password' : 'text';
    if(method === 'newPassword'){
      setNewPasswordShown(newInputType);  
    }else if(method === 'confirmNewPassword'){
      setConfirmNewPasswordShown(newInputType);
    }
    else{
      setPasswordShown(newInputType)
    }
  }

  const handleInputChange = (e) => {
    setUserCredentials({...userCredentials, [e.target.name]:e.target.value})
  }

  const handleSignUp = () =>{
    navigate('/signup')
  }

  const handleLogin = () =>{
    api.post("/user/login",{userCredentials})
  }

  const handleForgotPassword = () =>{
    setShowPopUp(true)
  }



  const handleOTPText = (event,inputIndex) => {
    const key = event.key.toLowerCase(); 
    if (key == "backspace" || key == "delete") {
      const prevIndex = inputIndex - 1;
      if(prevIndex >=0 && prevIndex <= 5){
        itemsRef.current[prevIndex].focus();
      }
    }else{
      const nextIndex = inputIndex + 1;
      if(nextIndex <= 5){
        itemsRef.current[nextIndex].focus();
      }
    }

  }

  const OTPInputForm = () =>{
    return (
      <div className='flex flex-col w-full gap-y-4 justify-center'>
                <p className='font-bold text-blue-500 '>OTP Verification</p>
                <p className='text-slate-500'>Enter the OTP you received to : <span className='font-semibold text-black'>{resetInfo.email}</span></p>

                <div className='flex items-center justify-between'>
                  {
                    Array.from({length: 6},(_,index) => {
                      if(index == 0){
                        return(
                          <input type='text'  
                          autoFocus         
                          ref={el => itemsRef.current[index] = el} 
                          maxLength={1} 
                          onKeyUp={(e)=>handleOTPText(e,index)}
                          className='border-2 border-gray-300 appearance-none text-center w-[40px] h-[50px] rounded-md outline-none focus:border-sky-500 valid:border-sky-500' required/>
                        )
                      }
                      else{
                        return(
                          <input type='text'           
                          ref={el => itemsRef.current[index] = el} 
                          onKeyUp={(e)=>handleOTPText(e,index)}
                          maxLength={1} className='border-2 border-gray-300 appearance-none text-center w-[40px] h-[50px] rounded-md outline-none focus:border-sky-500 valid:border-sky-500' required/>
                        )
                      }
                    
                    })
                  }
                </div>
                <p className='font-semibold text-blue-500 cursor-pointer text-sm'>Resend OTP</p>
                <p 
                className='float-none font-semibold text-white bg-green-500 px-2 py-1 text-center w-fit rounded-sm mx-auto cursor-pointer' 
                onClick={()=>setResetPassIndex(2)}>
                  Submit OTP
                </p>
              </div>
    )
  }

  const PasswordResetForm = () =>{
    return (
    <div className='flex flex-col w-full gap-y-4 justify-center items-center'>
        <input type='text' className='px-2 py-2 border-2 border-gray-400 rounded-md outline-none focus:border-sky-500	cursor-not-allowed' placeholder='Username' name='username' disabled/>
        <input type='text' className='px-2 py-2 border-2 border-gray-400 rounded-md outline-none focus:border-sky-500	cursor-not-allowed' placeholder='Email' name='email' disabled/>
        <div className='relative'>
          <input type={`${newPasswordShown}`} className='w-full px-2 py-2 border-2 border-gray-400 rounded-md outline-none focus:border-sky-500' placeholder='Password' name='newPassword'/>
          <span className='absolute right-2 top-2 cursor-pointer z-10' onClick={()=>handlePassword('newPassword', newPasswordShown)}>
              {
                newPasswordShown === 'text' ? <VisibilityIcon/> : <VisibilityOffIcon/>
              }
          </span>
        </div>
        <div className='relative'>
          <input type={`${confirmNewPasswordShown}`} className='w-full px-2 py-2 border-2 border-gray-400 rounded-md outline-none focus:border-sky-500' placeholder='Confirm Password' name='confirmNewPassword'/>
          <span className='absolute right-2 top-2 cursor-pointer z-10' onClick={()=>handlePassword('confirmNewPassword', confirmNewPasswordShown)}>
              {
                confirmNewPasswordShown === 'text' ? <VisibilityIcon/> : <VisibilityOffIcon/>
              }
          </span>
        </div>
        <p 
          className='font-semibold text-white bg-green-500 px-2 py-1 text-center w-1/2 rounded-sm mx-auto cursor-pointer capitalize' 
          onClick={()=>setResetPassIndex(2)}>
          update
        </p>
    </div>
    )
  }


  
  return (
      <div className="flex items-center justify-center h-screen bg-authimg bg-cover bg-center bg-no-repeat">
        <PopupComponent  isOpen={showPopUp} onCloseFn={()=>onCloseFn()} popUpTitle={'Forgot Password'} isBtnVisible={false}>
          
          {
            resetPassIndex == 0 ? (
              <div className='flex flex-col w-full gap-y-4 justify-center items-center'>
                <input type='' className='px-2 py-2  border-2 border-gray-400 rounded-md outline-none focus:border-sky-500 w-full' placeholder='email' onChange={(e)=>setResetInfo({...resetInfo,email:e.target.value})}/>
                <p className='bg-blue-500 px-2 py-2 rounded-md font-semibold text-white text-center cursor-pointer w-fit' onClick={()=>setResetPassIndex(1)}>Sent OTP</p>
              </div>
            ):
            (
              resetPassIndex == 1 ? <OTPInputForm/> : <PasswordResetForm/>
            )
          }
        </PopupComponent>
          <div className='p-8 border border-gray-300 rounded-md flex flex-col w-1/4 gap-4 z-10 bg-white shadow-md min-w-[350px]'>
              <p className='text-center font-bold text-slate-500 text-xl '>Login</p>
              <input type='' className='px-2 py-2 border-2 border-gray-400 rounded-md outline-none focus:border-sky-500	' placeholder='Username' name='username' onChange={handleInputChange}/>
              <div className='relative'>
                <input type={`${passwordShown}`} className='w-full px-2 py-2 border-2 border-gray-400 rounded-md outline-none focus:border-sky-500	' placeholder='Password' name='password' onChange={handleInputChange}/>
                <span className='absolute right-2 top-2 cursor-pointer z-10' onClick={()=>handlePassword("password",passwordShown)}>
                    {
                      passwordShown=='text' ? <VisibilityIcon/> : <VisibilityOffIcon/>
                    }
                </span>
              </div>
              <div className='bg-blue-500 px-2 py-2 rounded-md font-bold text-white text-center cursor-pointer' onClick={()=>handleLogin()}>Login</div>
              <div className='flex justify-between'>
                <p className='text-blue-600 font-semibold cursor-pointer' onClick={()=>handleForgotPassword()}>Forgot Password?</p>
                <p className='text-blue-600 font-semibold cursor-pointer' onClick={()=>handleSignUp()}>Create an account</p>
              </div>
          </div>
      </div>
  )
}

export default LoginPage