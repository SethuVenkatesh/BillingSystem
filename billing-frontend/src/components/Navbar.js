import React, { useState } from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import appLogo from '../assets/appLogo.png'
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { useContext } from 'react';
import { UserDetailsContext } from '../context/userContext';
import { navBarTabs } from '../constants';

export const Navbar = ({userDetails}) => {

  const {setUserDetails} = useContext(UserDetailsContext);
  const [activeTab,setActiveTab] = useState(navBarTabs[0]);
  const navigate = useNavigate();
  const location = useLocation()

  const handleUserProfile = () =>{

  }

  const handleLogout = () =>{
    localStorage.removeItem('techprinting-current-user');
    setUserDetails({isLoggedIn:false})
  }

  const handleTabChange = (tabName) =>{
    setActiveTab(tabName)
    let routeName;
    if(tabName == 'home'){
      routeName = '/home'
    }
    if(tabName == 'company'){
      routeName = '/company/all'
    }
    if(tabName == 'employee'){
      routeName = '/employee/all'
    }
    if(tabName == 'billing'){
      routeName = '/billing/all'
    }
    if(tabName == 'report'){
      routeName = '/report/all'
    }
    navigate(routeName)
  }

  return (
    <>
    {
      (location.pathname != '/login' && '/signup' ) &&
    <>
    <div className='fixed top-0 w-full flex items-center justify-between h-[70px] shadow-lg z-30 bg-white'>
      <div className='flex-1 h-full'>
        <img src={appLogo} className='w-[200px] h-full object-cover'/>
      </div>
      <div className='flex-4 relative flex justify-between px-2 py-4 '>
        {
          navBarTabs.map((tabName)=>{
            return (
              <div className='relative cursor-pointer ' onClick={()=>handleTabChange(tabName)}>
                <p className={`font-bold text-blue-600 cursor-pointer text-md  ${tabName === activeTab ? "before:content-[''] before:absolute before:w-full before:h-[3px] before:bg-blue-600 before:bottom-[-5px]" :""} capitalize `}>{tabName}</p>
              </div>

            )
          })
        }
      </div>
      <div className='flex-1 flex items-center justify-center cursor-pointer relative group pb-4 mt-2'>
        <div className='w-[50px] h-[50px] rounded-full border-gray-500 border shadow-lg ' onClick={()=>handleUserProfile()}>
          <img src={userDetails.userData.profile_url} className='object-cover h-full w-full rounded-full'/>
        </div>
        <div className='absolute hidden group-hover:block top-[65px] right-[30px] z-30 '>
          <div className="relative border border-gray-300 bg-white shadow-md duration-200 rounded-md flex flex-col min-w-[200px] max-w-[250px] text-slate-600 ">
              <div className='px-4 py-1 text-ellipsis overflow-hidden whitespace-nowrap'>Hello, {userDetails.userData.username}</div>
              <p className='px-4 py-1 w-full hover:text-blue-500 '><PersonIcon/> Profile</p>
              <p className='px-4 py-1 w-full hover:text-red-500 ' onClick={()=>handleLogout()}><LogoutIcon/> Logout</p>
          </div>
        </div>
      </div>
    </div>
    <p className='mt-[70px]'></p>
    </>
  }
    </>
  )
}
