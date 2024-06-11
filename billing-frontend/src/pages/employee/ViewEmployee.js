import React from 'react'
import { useEffect,useState } from 'react'
import PhoneIcon from '@mui/icons-material/Phone';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PersonIcon from '@mui/icons-material/Person';
import Loader from '../../components/common/Loader'
import { useParams } from 'react-router-dom'
import api from '../../axios';

const ViewEmployee = () => {
    const[loading,setLoading]=useState(false);
    const { employeeId } = useParams();
    const [employeeDetails,setEmployeeDetails]=useState({
        employee_name:"",
        profile_url:"",
        address:"",
        city:"",
        state:"",
        pincode:"",
        mobile_number:"",
        alt_mobile_number:"",
        date_of_birth:"",
        bank_name:"",
        bank_branch:"",
        account_number:"",
        IFSC_code:""
    });
    
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

    useEffect(()=>{
        setLoading(true);
        api.get(`/employee/${employeeId}`).then((res)=>{
            setLoading(false);
            let employeeDetail = res.data;
            employeeDetail.date_of_birth = employeeDetail.date_of_birth.substring(0,10)
            setEmployeeDetails(employeeDetail)
        }).catch(e=>{
            console.log(e)
        })
    },[])

    
  return (
    <div className='p-4 flex flex-1 gap-x-4'>
        <div className='p-4 border border-gray-200 rounded-md shadow-md '>
            <p className='text-blue-800 font-bold flex items-center gap-x-2 mb-2'><PersonIcon/> Employee Details:</p>
            <div className=''>
                <img src={employeeDetails.profile_url} className='object-cover rounded-full w-[100px] aspect-square m-auto'></img>
            </div>
            <p className='text-slate-500 font-bold text-lg text-center mb-2'>{employeeDetails.employee_name}</p>
            <div className='grid grid-cols-2 '>
                <p className='text-slate-600 font-semibold'>Date of Birth </p>
                <p>: {employeeDetails.date_of_birth}</p>
            </div>
            <div className='grid grid-cols-2 mb-2'>
                <p className='text-slate-600 font-semibold'>Age </p>
                <p>: {employeeAge()}</p>
            </div>
            <p className='text-slate-600 text-center '>{employeeDetails.address}</p>
            <p className='text-slate-600 text-center mb-2'>{employeeDetails.city} - {employeeDetails.pincode} , {employeeDetails.state}</p>
            <div className='flex gap-x-2 items-center justify-center'>
                <p><PhoneIcon className='text-green-500 '/>  {employeeDetails.mobile_number}</p>
                <p><PhoneIcon className='text-sky-500 '/>  {employeeDetails.alt_mobile_number}</p>
            </div>
        </div>
        <div className='shadow-md p-4 border border-gray-200 rounded-md shadow-md max-h-[200px]'>
            <p className='text-blue-800 font-bold flex items-center gap-x-2 mb-2'><AccountBalanceIcon/> Bank Details:</p>
            <div className='grid grid-cols-2'>
                <p className='text-gray-600 font-semibold'>Bank Name </p>
                <p>: {employeeDetails.bank_name}</p>
            </div>
            <div className='grid grid-cols-2'>
                <p className='text-gray-600 font-semibold'>Account Number </p>
                <p>: {employeeDetails.account_number}</p>
            </div>
            <div className='grid grid-cols-2'>
                <p className='text-gray-600 font-semibold'>IFSC Code </p>
                <p>: {employeeDetails.IFSC_code}</p>
            </div>
            <div className='grid grid-cols-2'>
                <p className='text-gray-600 font-semibold'>Branch Name </p>
                <p>: {employeeDetails.bank_branch}</p>
            </div>
        </div>
        {loading && <Loader/>}
    </div>
  )
}

export default ViewEmployee