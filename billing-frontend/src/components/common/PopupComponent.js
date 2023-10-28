import React from 'react'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
const PopupComponent = ({isOpen,onCloseFn,children,popUpTitle}) => {

  return (
    isOpen &&
    <div className='fixed w-full h-full left-0 top-0 flex items-center justify-center bg-[#00000066] overflow-y-auto'>
        <div className='relative rounded-md bg-white min-w-[450px] p-4 m-4 '>
            <p className='absolute right-4 top-4 text-red-500 cursor-pointer' onClick={()=>onCloseFn()}><CloseIcon/></p>
            <p className='text-center capitalize font-bold text-lg'>{popUpTitle}</p>
            <div className='flex items-center flex-col justify-between'>
                {children}
            </div>
        </div>
    </div>
  )
}

export default PopupComponent