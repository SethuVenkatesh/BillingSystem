import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom'
import api from '../../axios';
import Loader from '../../components/common/Loader';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const AllEmployee = () => {

    const handleViewEmployee=(employeeId)=>{
      navigate(`/employee/view/${employeeId}`)
    }
  
    const handleUpdateEmployee=(employeeId)=>{
      navigate(`/employee/update/${employeeId}`)
    }
  
    const handleDeleteEmployee=(employeeId)=>{
      setLoading(true)
      api.delete(`/employee/${employeeId}`).then((res)=>{
        console.log("deleted succesfully");
        getAllEmployees();
      }).catch(e=>{
        console.log(e);
        setLoading(false);
      });
    }

    const addNewEmployee = () => {
        navigate('/employee/new');
      }
    
      const getAllEmployees = () =>{
        api.get("/employee/all").then((res)=>{
              setAllEmployees(res.data)
              setLoading(false)
            }).catch(err=>{
              console.log(err);
        })
      }

    const navigate = useNavigate();
    const [allEmployees,setAllEmployees] = useState([]);
  
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
      setLoading(true);
      getAllEmployees()
  
    },[])

    const EmployeeCard = ({employeeDetails}) => {
      const employeeAge = () =>{
        var today = new Date();
        var birthDate = new Date(employeeDetails.date_of_birth);  
        console.log(today,birthDate)
        var age_now = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
            age_now--;
        }
        return age_now;
      }
    
    
      return(
          <div className='flex flex-col items-center justify-center w-[200px] border border-gray-300 rounded-md shadow-md px-2 py-2 '>
              <div className='w-[100px] h-[100px] mb-2'>
                  <img src={employeeDetails.profile_url} className='w-full h-full rounded-full object-cover'/>
              </div>
              <div className='mb-4'>
                  <p className='text-slate-500 capitalize font-bold'>{employeeDetails.employee_name}</p>
                  <p className='text-slate-500'>Age : {employeeAge()}</p>
              </div>                                                            
            <div className='flex w-full items-center justify-center gap-x-4 mb-4'>
                <div 
                    className='bg-green-600 text-white w-[30px] h-[30px] rounded-full flex items-center justify-center cursor-pointer'
                    onClick={()=>handleViewEmployee(employeeDetails._id)}
                >
                    <RemoveRedEyeIcon/>
                </div>
                <div 
                    className='bg-blue-600 text-white w-[30px] h-[30px] rounded-full flex items-center justify-center cursor-pointer'
                    onClick={()=>handleUpdateEmployee(employeeDetails._id)}
                >
                    <EditIcon/>
                </div>
                <div 
                    className='bg-red-600 text-white w-[30px] h-[30px] rounded-full flex items-center justify-center cursor-pointer'
                    onClick={()=>handleDeleteEmployee(employeeDetails._id)}
                >
                    <DeleteIcon/>
                </div>
            </div>
          </div> 
      )
    }  


  


  return (
    <div className='p-4'>
        <div className='flex justify-end'>
            <p 
                onClick={()=>addNewEmployee()}
                className=' px-4 py-2 bg-sky-700 text-white font-bold rounded-md max-w-fit flex items-center justify-center cursor-pointer'
            >
                <AddIcon/>
                Create New Employee
            </p>
        </div>
        <div className='flex mt-4 gap-2'>
        {
            allEmployees.map((employee)=>{
                return (
                    <EmployeeCard employeeDetails={employee}/>
                )
            })
        }
        </div>
        { loading && <Loader/>}
    </div>
  )
}

export default AllEmployee