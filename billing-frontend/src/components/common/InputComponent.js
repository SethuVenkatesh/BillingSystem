import React from 'react'

const InputComponent = ({inputType,labelName,inputName,inputValue,companyDetails,setCompanyDetails}) => {

    const handleChange=(e)=>{
        setCompanyDetails({...companyDetails,[e.target.name]:e.target.value})
    }
  return (
    <div className='relative mb-4'>
        <input type={inputType} id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handleChange} name={inputName} value={inputValue}/>
        <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2  peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 pointer-events-none capitalize">{labelName}</label>
    </div>
  )
}

export default InputComponent