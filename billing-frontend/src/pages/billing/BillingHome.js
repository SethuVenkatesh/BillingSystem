import React from 'react'
import SellIcon from '@mui/icons-material/Sell';

const BillingHome = () => {
  return (
    <div className='relative w-full min-h-[calc(100vh-70px)]'>
        <div className='p-2 absolute  w-fit rounded-md text-white z-10 bg-blue-600 font-semibold bottom-4 right-4 cursor-pointer select-none'>
          <SellIcon/>  Add New Sales
        </div>
    </div>
  )
}

export default BillingHome