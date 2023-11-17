import React from 'react'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import ButtonComponent from './ButtonComponent';
const PopupComponent = ({isOpen,onCloseFn,children,popUpTitle,okBtnFn,closeBtnFn,isBtnVisible}) => {

  return (
    isOpen &&
    <div className='fixed w-full h-full left-0 top-0 bottom-0 right-0 flex items-center justify-center bg-[#00000066] overflow-y-auto'>
        <div className='relative rounded-md bg-white min-w-[450px] p-4 m-4'>
            <p className='absolute right-4 top-4 text-red-500 cursor-pointer font-bold' onClick={()=>onCloseFn()}><CloseIcon/></p>
            <p className='text-center capitalize font-bold text-lg'>{popUpTitle}</p>
            <div className='flex items-center flex-col justify-between'>
                {children}
            </div>
            {
              isBtnVisible && 
              <div className='flex items-center justify-center'> 
                <ButtonComponent
                  buttonText="Ok"
                  buttonType="ok-btn"
                  onClickCallback={()=>{}}
                />
                <ButtonComponent
                  buttonText="Cancel"
                  buttonType="cancel-btn"
                  onClickCallback={()=>{closeBtnFn()}}
                />
              </div>
            }
        </div>
    </div>
  )
}

export default PopupComponent