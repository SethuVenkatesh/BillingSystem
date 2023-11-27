import React from 'react'
import appLogo from '../assets/appLogo.png'

export const Navbar = () => {
  return (
    <div className='fixed top-0 w-full  bg-[#f6f6e9] flex items-center justify-between h-[70px] shadow-md z-30'>
      <div className='flex-1 h-full'>
        <img src={appLogo} className='w-[150px] h-full'/>
      </div>
      <div className='flex-3 relative flex justify-between px-2 py-4                                                                                                                            '>
        <p className=' font-semibold'>Home</p>
        <p className=' font-semibold'>Company</p>
        <p className=' font-semibold'>Employee</p>
        <p className=' font-semibold'>Billing</p>
        <p className=' font-semibold'>Report</p>
      </div>
      <p></p>
    </div>
  )
}
