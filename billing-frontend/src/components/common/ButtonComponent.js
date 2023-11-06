import React from 'react';

const ButtonComponent = ({
    txt,
    buttonType,
    onClickCallback
  }) => {

  return (
    <div className='inline-block'>
      <button className={`font-bold min-w-[130px] text-[1.2em] px-[32px] py-[15px] m-2 scale-90 rounded-2xl hover:scale-100 duration-300 hover:ease-in ${buttonType}`} onClick={onClickCallback}>
          {txt} 
      </button>
    </div>
  )
}

export default ButtonComponent;
