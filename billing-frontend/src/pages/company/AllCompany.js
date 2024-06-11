import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/common/Loader';
import ButtonComponent from '../../components/common/ButtonComponent';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../axios';

const AllCompany = () => {
  const navigate=useNavigate()
  const [allCompany,setAllCompany]=useState([]);
  const [loading,setLoading]=useState(false);
  useEffect(()=>{
    setLoading(true);
    getCompanies()

  },[])


  const getCompanies=()=>{
    api.get("/company/all").then((res)=>{
      setAllCompany(res.data)
      setLoading(false)
    }).catch(err=>{
      console.log(err);
    })
  }

  const handleNewCompany=()=>{
    navigate("/company/new")
  }

  
  const handleViewCompany=(companyId)=>{
    navigate(`/company/view/${companyId}`)
  }

  const handleUpdateCompany=(companyId)=>{
    navigate(`/company/update/${companyId}`)
  }

  const handleDeleteCompany=(companyId)=>{
    setLoading(true)
    api.delete(`/company/${companyId}`).then((res)=>{
      console.log("deleted succesfully");
      getCompanies();
    }).catch(e=>{
      console.log(e);
      setLoading(false);
    });
  }

  const CompanyCard=({details})=>{
    return(
      <div className='flex flex-col items-center justify-center w-[300px] border border-gray-200 rounded-md shadow-md px-2 py-2'>
        <div className='w-[100px] h-[100px] mb-2'>
                  <img src={details.logo_url} className='w-full h-full rounded-full object-cover'/>
              </div>
              <div className='mb-4'>
                  <p className='text-slate-500 capitalize font-bold text-center'>{details.company_name}</p>
                  <p className='text-slate-500 text-center font-semibold'>{details.GST_number}</p>
                  <p className='text-slate-500 text-center'>{details.city} - {details.pincode}</p>
                  
              </div>   
        <div className='flex w-full items-center justify-center gap-x-4 mb-4'>
          <div 
              className='bg-green-600 text-white w-[30px] h-[30px] rounded-full flex items-center justify-center cursor-pointer'
              onClick={()=>handleViewCompany(details._id)}
          >
              <RemoveRedEyeIcon/>
          </div>
          <div 
              className='bg-blue-600 text-white w-[30px] h-[30px] rounded-full flex items-center justify-center cursor-pointer'
              onClick={()=>handleUpdateCompany(details._id)}
          >
              <EditIcon/>
          </div>
          <div 
              className='bg-red-600 text-white w-[30px] h-[30px] rounded-full flex items-center justify-center cursor-pointer'
              onClick={()=>handleDeleteCompany(details._id)}
          >
              <DeleteIcon/>
          </div>
            </div>
      </div>
    )
  }

  return (
    <div className=' p-4'>
        <div className='flex items-center justify-end pb-4'>
          <p 
            onClick={()=>handleNewCompany()}
            className=' px-4 py-2 bg-blue-700 text-white font-bold rounded-md max-w-fit flex items-center justify-center cursor-pointer'
          >
              <AddIcon/>
              Create New Company
          </p>
        </div>
        <div className='flex gap-x-2'>
          {
            allCompany.map((company)=>{
              return(
                <CompanyCard details={company}/>
              )
            })
          }
        </div>
        {loading && <Loader/>}
    </div>
  )
}

export default AllCompany