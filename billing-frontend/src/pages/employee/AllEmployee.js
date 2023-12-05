import React from 'react'
import AddIcon from '@mui/icons-material/Add';


const AllEmployee = () => {


  const EmployeeCard = () => {

    return(
        <div className='flex flex-col items-center justify-center w-[300px] border border-gray-300 rounded-md shadow-md px-2 py-2'>
            <div className='w-[100px] h-[100px]'>
                <img src='https://res.cloudinary.com/dkjcfh7oj/image/upload/v1701794110/sxeh9f87penpcltvy56q.png' className='w-full h-full rounded-full object-cover'/>
            </div>                                                            
        </div> 
    )
  }  
  return (
    <div className='p-4'>
        <div className='flex justify-end'>
            <p 
                // onClick={()=>handleNewCompany()}
                className=' px-4 py-2 bg-sky-700 text-white font-bold rounded-md max-w-fit flex items-center justify-center cursor-pointer'
            >
                <AddIcon/>
                Create New Employee
            </p>
        </div>

        <div className=''>
            <EmployeeCard/>
        </div>
    </div>
  )
}

export default AllEmployee