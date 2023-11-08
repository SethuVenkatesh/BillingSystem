import React from 'react';

const ButtonComponent = ({
    buttonText,
    buttonType,
    onClickCallback,
    iconComponent
  }) => {

  return (
    <div className='inline-block'>
      <button className={`font-bold flex items-center justify-center gap-x-2 min-w-[130px] text-base px-2 py-2 m-2 scale-90 rounded-md hover:scale-100 duration-100 hover:ease-in ${buttonType}`} onClick={onClickCallback}>
          {iconComponent} {buttonText} 
      </button>
    </div>
  )
}

export default ButtonComponent;
