import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Loader from '../../components/common/Loader';
import ButtonComponent from '../../components/common/ButtonComponent';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const AllCompany = () => {
  const navigate=useNavigate()
  const [allCompany,setAllCompany]=useState([]);
  const [loading,setLoading]=useState(false);
  useEffect(()=>{
    setLoading(true);
    getCompanies()

  },[])


  const getCompanies=()=>{
    axios.get("http://localhost:4000/company/all").then((res)=>{
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
    axios.delete(`http://localhost:4000/company/${companyId}`).then((res)=>{
      console.log("deleted succesfully");
      getCompanies();
    }).catch(e=>{
      console.log(e);
      setLoading(false);
    });
  }

  const CompanyCard=({details})=>{
    return(
      <div className='px-4 py-4 rounded-md border border-gray-500 w-full flex justify-between items-center mb-4 shadow-md'>
        <div className='flex items-center justify-between gap-x-2' >
          <img src={details.logo_url} alt="" className='rounded-full w-[50px] h-[50px]'/>
          <p>{details.company_name}</p>
        </div>
        <div className='flex gap-x-2 	'>
          <ButtonComponent
            buttonText="View"
            buttonType="success-btn"
            iconComponent={<VisibilityIcon/>}
          />
          <ButtonComponent
            buttonText="Update"
            buttonType="update-btn"
            onClickCallback={()=>handleUpdateCompany(details._id)}
            iconComponent={<EditNoteIcon/>}
          />
          <ButtonComponent
            buttonText="Delete"
            buttonType="danger-btn"
            onClickCallback={()=>handleDeleteCompany(details._id)}
            iconComponent={<DeleteForeverIcon/>}
          />
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen p-4'>
        <p className='text-slate-500 font-bold text-center text-lg'>All Company List</p>
        <div className='flex items-center justify-end pb-4'>
          <p 
            onClick={()=>handleNewCompany()}
            className=' px-4 py-2 bg-blue-700 text-white font-bold rounded-md max-w-fit flex items-center justify-center cursor-pointer'
          >
              <AddIcon/>
              Create New Company
          </p>
        </div>
        <div>
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