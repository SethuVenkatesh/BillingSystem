import React from 'react'

export const Navbar = () => {
  return (
    <div className='fixed top-0 w-full px-2 py-4 bg-blue-500'>
      <div className='relative flex justify-between'>
        <p className='text-white font-semibold'>Home</p>
        <p className='text-white font-semibold'>Company</p>
        <p className='text-white font-semibold'>Employee</p>
        <p className='text-white font-semibold'>Billing</p>
        <p className='text-white font-semibold'>Report</p>
      </div>
      <p></p>
    </div>
  )
}
