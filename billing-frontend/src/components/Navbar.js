import React from 'react'
import appLogo from '../assets/appLogo.png'

export const Navbar = () => {

  const handleUserProfile = () =>{

  }


  return (
    <div className='fixed top-0 w-full flex items-center justify-between h-[70px] shadow-lg z-30'>
      <div className='flex-1 h-full'>
        <img src={appLogo} className='w-[200px] h-full object-cover'/>
      </div>
      <div className='flex-4 relative flex justify-between px-2 py-4                                                                                                                            '>
        <p className='font-bold text-blue-600 cursor-pointer text-md'>Home</p>
        <p className='font-bold text-blue-600 cursor-pointer text-md'>Company</p>
        <p className='font-bold text-blue-600 cursor-pointer text-md'>Employee</p>
        <p className='font-bold text-blue-600 cursor-pointer text-md'>Billing</p>
        <p className='font-bold text-blue-600 cursor-pointer text-md'>Report</p>
      </div>
      <div className='flex-1 flex items-center justify-center cursor-pointer relative'>
        <div className='w-[50px] h-[50px] rounded-full border-gray-500 border shadow-lg' onClick={()=>handleUserProfile()}>
          <img src='https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png' className='object-cover rounded-full'/>
        </div>
        <div className='absolute top-[65px] right-[30px] z-30 w-fit '>
          <div className='relative border border-gray-300 shadow-md rounded-md flex flex-col max-w-[200px]'>
              <div className='px-2 py-1 text-ellipsis overflow-hidden whitespace-nowrap'>Hello, sethu kjkjnkjnkjkjkjnkjkjnkjnkjnkjnkjnkjnkjn</div>
              <p className='px-2 py-1 w-fit'>Profile</p>
              <p className='px-2 py-1 w-fit'>Logout</p>
          </div>
        </div>
      </div>
    </div>
  )
}
