import React from 'react'
import { useEffect,useState } from 'react'
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Loader from '../../components/common/Loader'
import { useParams } from 'react-router-dom'
import api from '../../axios';

const ViewCompany = () => {

    const[loading,setLoading]=useState(false);
    const { companyId } = useParams();
    const [companyDetails,setCompanyDetails]=useState({
        company_name:"",
        logo_url:"",
        address:"",
        city:"",
        state:"",
        pincode:"",
        mobile_number:"",
        alt_mobile_number:"",
        GST_number:"",
        bank_name:"",
        bank_branch:"",
        account_number:"",
        IFSC_code:""
    });
    useEffect(()=>{
        console.log(companyId)
        setLoading(true);
        api.get(`/company/${companyId}`).then((res)=>{
            setLoading(false);
            setCompanyDetails(res.data)
        }).catch(e=>{
            console.log(e)
        })
    },[])
  return (
    <div className='p-4 flex flex-1 gap-x-4'>
        <div className='p-4 border border-gray-200 rounded-md shadow-md '>
            <p className='text-blue-800 font-bold flex items-center gap-x-2 mb-2'><PersonIcon/> Company Details:</p>
            <div className=''>
                <img src={companyDetails.logo_url} className='object-cover rounded-full w-[100px] aspect-square m-auto'></img>
            </div>
            <p className='text-slate-500 font-bold text-lg text-center '>{companyDetails.company_name}</p>
            <div className='grid grid-cols-2 mb-2'>
                <p className='text-slate-600 font-semibold'>GST Number </p>
                <p>: {companyDetails.GST_number}</p>
            </div> 
            <p className='text-slate-600 text-center '>{companyDetails.address}</p>
            <p className='text-slate-600 text-center mb-2'>{companyDetails.city} - {companyDetails.pincode} , {companyDetails.state}</p>
            <div className='flex gap-x-2 items-center justify-center'>
                <p><PhoneIcon className='text-green-500 '/>  {companyDetails.mobile_number}</p>
                <p><PhoneIcon className='text-sky-500 '/>  {companyDetails.alt_mobile_number}</p>
            </div>
        </div>
        <div className='shadow-md p-4 border border-gray-200 rounded-md shadow-md max-h-[200px]'>
            <p className='text-blue-800 font-bold flex items-center gap-x-2 mb-2'><AccountBalanceIcon/> Bank Details:</p>
            <div className='grid grid-cols-2'>
                <p className='text-gray-600 font-semibold'>Bank Name </p>
                <p>: {companyDetails.bank_name}</p>
            </div>
            <div className='grid grid-cols-2'>
                <p className='text-gray-600 font-semibold'>Account Number </p>
                <p>: {companyDetails.account_number}</p>
            </div>
            <div className='grid grid-cols-2'>
                <p className='text-gray-600 font-semibold'>IFSC Code </p>
                <p>: {companyDetails.IFSC_code}</p>
            </div>
            <div className='grid grid-cols-2'>
                <p className='text-gray-600 font-semibold'>Branch Name </p>
                <p>: {companyDetails.bank_branch}</p>
            </div>
        </div>
        {loading && <Loader/>}
    </div>
  )
}

export default ViewCompany