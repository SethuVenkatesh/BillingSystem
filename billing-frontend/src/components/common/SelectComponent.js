import React from 'react'

const SelectComponent = ({labelName,inputName,inputValue,inputArray,jsonDetails,setJsonDetails}) => {

    
  const handleInputChange = (e) =>{
    setJsonDetails({...jsonDetails,[e.target.name]:e.target.value})
  }  
  return (
    <select className='w-full h-max border border-gray-300 py-2 px-2 text-md rounded-md focus:outline-none focus:border-blue-500 text-gray-500 text-sm capitalize mb-4' value={inputValue} name={inputName} onChange={(e)=>handleInputChange(e)}>
        <option value="" disabled>Select {labelName}</option>
        {
            inputArray.map((inputDetails)=>{
                return(
                    <option value={inputDetails.key}>{inputDetails.value}</option>
                )
            })
        }
    </select>
  )
}

export default SelectComponent