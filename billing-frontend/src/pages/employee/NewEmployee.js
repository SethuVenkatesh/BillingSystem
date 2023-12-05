import React, { useEffect } from 'react'
import { useState } from 'react';
import { bankDetailsParams, employeeDetailsParams } from '../../constants';
import Loader from '../../components/common/Loader';
import InputComponent from '../../components/common/InputComponent';
import Toaster from '../../components/common/Toaster';
import api from '../../axios';
import axios from 'axios';

const NewEmployee = () => {
    const [loading,setLoading]=useState(false);
    const [toastMsg,setToastMsg] =useState("");
    const [uploadFile, setUploadFile] = useState("");
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

 const handleProfileSubmit = () =>{
    setLoading(true)
    let isSucess = handleValidate();
    if(isSucess){
    const formData = new FormData ();
    formData.append("file", uploadFile);
    formData.append("upload_preset", "ruwqs5az");
    axios.post(
     "https://api.cloudinary.com/v1_1/dkjcfh7oj/image/upload",
     formData
   )
    .then((response) => {
      let employeeData={...employeeDetails,profile_url:response.data.secure_url}
      console.log("employeeData",employeeData)
      setEmployeeDetails({...employeeDetails,profile_url:response.data.secure_url})
      createEmployee(employeeData)
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
    }
 }
 const handleValidate=()=>{
    let valSuccess = true;
    for(let index=0;index<employeeDetailsParams.length;index++){
        console.log(employeeDetailsParams[index])
        if(employeeDetails[employeeDetailsParams[index].inputName].length == 0){
            setLoading(false);
            setToastMsg(employeeDetailsParams[index].labelName +" is required")
            valSuccess = false;
            return;
        }
    }

    if(!valSuccess) return false;
    for(let index=0;index<bankDetailsParams.length;index++){
        console.log(bankDetailsParams[index])
        if(employeeDetails[bankDetailsParams[index].inputName].length == 0){
            setLoading(false);
            setToastMsg(bankDetailsParams[index].labelName +" is required")
            valSuccess = false;
            return;
        }
    }

    if(!valSuccess) return false;
    if(uploadFile.length == 0){
        setLoading(false);
        setToastMsg("Profile pic is required")
    }
    return true;
  }

  const createEmployee = (employeeData) =>{
    api.post("/employee/new",{employeeData}).then((res)=>{
        console.log(res)
        setLoading(false);
    }).catch((err)=>{
        setLoading(false);
        console.log(err)
    })
  }




 useEffect(()=>{
    var today = new Date();
    let todayFormatDate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    console.log("date",todayFormatDate)
    setEmployeeDetails({...employeeDetails,date_of_birth:todayFormatDate})
 },[])
   
  return (
    <div className='w-full px-4 py-2 flex items-center justify-center flex-col '>
        <div className='flex items-center justify-between gap-x-2 mb-4 w-full '>
            <p className='border border-blue-800 w-full'></p>
            <p className='font-semibold text-blue-700 text-md min-w-fit'>Employee Details</p>
            <p className='border border-blue-800 w-full'></p>        
        </div>
        <div className='grid auto-rows-auto gap-4 w-3/4 grid-cols-2 mb-4'>
            {
                employeeDetailsParams.map((details)=>{
                    if(details.inputType === 'date')
                    {
                        return (
                            <InputComponent inputType={details.inputType} labelName={details.labelName} inputName={details.inputName} inputValue={employeeDetails[details.inputName]} companyDetails={employeeDetails} setCompanyDetails={setEmployeeDetails}/>
                        )
                    }
                    else{
                        return (
                            <InputComponent inputType={details.inputType} labelName={details.labelName} inputName={details.inputName} inputValue={employeeDetails[details.inputName]} companyDetails={employeeDetails} setCompanyDetails={setEmployeeDetails}/>
                        )
                    }
                })
            }
        </div>
        <div className='flex items-center justify-between gap-x-2 mb-4 w-full '>
            <p className='border border-blue-800 w-full'></p>
            <p className='font-semibold text-blue-700 text-md min-w-fit'>Bank Details</p>
            <p className='border border-blue-800 w-full'></p>        
        </div>
        <div className='grid auto-rows-auto gap-4 w-3/4 grid-cols-2 mb-4'>
            {
                bankDetailsParams.map((details)=>{
                    return (
                        <InputComponent inputType={details.inputType} labelName={details.labelName} inputName={details.inputName} inputValue={employeeDetails[details.inputName]} companyDetails={employeeDetails} setCompanyDetails={setEmployeeDetails}/>
                    )
                })
            }
        </div>
        <div className='p-4 border border-blue-500 rounded-md mb-4'> 
            <p className='capitalize font-semibold text-center mb-2 text-blue-700'>upload profile</p>
            <input 
                type="file" 
                accept="image/*" 
                onChange ={(event) => {setUploadFile(event.target.files[0]);}} 
            />
        </div>
        {loading && <Loader/>}
        {
            toastMsg.length>=1&&
            <Toaster toastMsg={toastMsg} setToastMsg={setToastMsg} isSuccess={false}/>
        }
        <p className='text-white w-1/2 px-4 py-2 bg-green-700 font-semibold rounded-md text-center hover:scale-110 cursor-pointer transition' onClick={()=>handleProfileSubmit()}>Create</p>
    </div>
  )
}

export default NewEmployee