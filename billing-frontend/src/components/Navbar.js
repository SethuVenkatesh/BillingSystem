import React from 'react'
import appLogo from '../assets/appLogo.png'
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
export const Navbar = () => {

  const handleUserProfile = () =>{

  }


  return (
    <div className='fixed top-0 w-full flex items-center justify-between h-[70px] shadow-lg z-30 bg-white'>
      <div className='flex-1 h-full'>
        <img src={appLogo} className='w-[200px] h-full object-cover'/>
      </div>
      <div className='flex-4 relative flex justify-between px-2 py-4 '>
        <p className='font-bold text-blue-600 cursor-pointer text-md'>Home</p>
        <p className='font-bold text-blue-600 cursor-pointer text-md'>Company</p>
        <p className='font-bold text-blue-600 cursor-pointer text-md'>Employee</p>
        <p className='font-bold text-blue-600 cursor-pointer text-md'>Billing</p>
        <p className='font-bold text-blue-600 cursor-pointer text-md'>Report</p>
      </div>
      <div className='flex-1 flex items-center justify-center cursor-pointer relative group pb-4 mt-2'>
        <div className='w-[50px] h-[50px] rounded-full border-gray-500 border shadow-lg ' onClick={()=>handleUserProfile()}>
          <img src='https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png' className='object-cover rounded-full'/>
        </div>
        <div className='absolute hidden group-hover:block top-[65px] right-[30px] z-30 w-fit '>
          <div className="relative border border-gray-300 bg-white shadow-md duration-200 rounded-md flex flex-col max-w-[200px] text-slate-600 ">
              <div className='px-4 py-1 text-ellipsis overflow-hidden whitespace-nowrap'>Hello, sethu kjkjnkjnkjkjkjnkjkjnkjnkjnkjnkjnkjnkjn</div>
              <p className='px-4 py-1 w-full hover:text-blue-500 '><PersonIcon/> Profile</p>
              <p className='px-4 py-1 w-full hover:text-red-500 '><LogoutIcon/> Logout</p>
          </div>
        </div>
      </div>
    </div>
  )
}
