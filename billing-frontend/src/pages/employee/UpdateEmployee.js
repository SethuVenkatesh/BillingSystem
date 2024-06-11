import React from 'react'
import InputComponent from '../../components/common/InputComponent';
import Toaster from '../../components/common/Toaster';
import Loader from '../../components/common/Loader';
import { employeeDetailsParams,bankDetailsParams } from '../../constants';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../axios';
import axios from 'axios';

const UpdateEmployee = () => {
    const [loading,setLoading]=useState(false);
    const [toastMsg,setToastMsg] =useState("");
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
    const [uploadFile, setUploadFile] = useState(null);

    const handleImageUpload = () => {
        setLoading(true)
        let isSucess = handleValidate();
        if(isSucess){
           console.log(uploadFile)
            if(uploadFile){
                console.log("image upload")
                const formData = new FormData ();
                formData.append("file", uploadFile);
                formData.append("upload_preset", "ruwqs5az");
                axios.post(
                "https://api.cloudinary.com/v1_1/dkjcfh7oj/image/upload",
                formData
                )
                .then((response) => {
                let employeeData={...employeeDetails,profile_url:response.data.secure_url}
                setEmployeeDetails({...employeeDetails,profile_url:response.data.secure_url})
                updateEmployee(employeeData)
                })
                .catch((error) => {
                console.log(error);
                setLoading(false);
                });
            }
            else{
                console.log("image upload no")
                updateEmployee(employeeDetails)
            }
        }
      };

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
        console.log(uploadFile)
        if(employeeDetails.profile_url.length == 0 &&  uploadFile == null){
            setLoading(false);
            setToastMsg("Company Logo is required")
            return false;
        }
        return true;
      }

    const updateEmployee= (employeeData)=>{
        api.put(`/employee/${employeeId}`,{employeeData}).then((res)=>{
            console.log(res)
            setLoading(false);
            setUploadFile(null)
        }).catch((err)=>{
            setLoading(false)
            console.log(err)
        })
    }

    const handleLogoDelete=()=>{
        setEmployeeDetails({...employeeDetails,profile_url:""});
    }


  useEffect(()=>{
    console.log(employeeId)
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
    <div className='w-full px-4 py-2 flex items-center justify-center flex-col'>
        <div className='flex items-center justify-between gap-x-2 mb-4 w-full '>
            <p className='border border-blue-800 w-full'></p>
            <p className='font-semibold text-blue-700 text-md min-w-fit'>Employee Details</p>
            <p className='border border-blue-800 w-full'></p>        
        </div>
        {
            employeeDetails.profile_url.length > 0 &&
            <div className='mb-4 relative'>
                <img src={employeeDetails.profile_url} className='w-[250px] aspect-square rounded-full'/>
                <p className='absolute bottom-[15px] right-[10px] p-2 bg-red-500 rounded-full cursor-pointer' onClick={()=>handleLogoDelete()}>
                    <DeleteIcon className='text-white '/>
                </p>
            </div>
        }
        <div className='grid auto-rows-auto gap-4 w-3/4 grid-cols-2 mb-4'>
            {
                employeeDetailsParams.map((details)=>{
                    return (
                        <InputComponent inputType={details.inputType} labelName={details.labelName} inputName={details.inputName} inputValue={employeeDetails[details.inputName]} jsonDetails={employeeDetails} setJsonDetails={setEmployeeDetails}/>
                    )
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
                        <InputComponent inputType={details.inputType} labelName={details.labelName} inputName={details.inputName} inputValue={employeeDetails[details.inputName]} jsonDetails={employeeDetails} setJsonDetails={setEmployeeDetails}/>
                    )
                })
            }
        </div>
        {
            employeeDetails.profile_url.length == 0 &&
            <div className='p-4 border border-blue-500 rounded-md mb-4'> 
                <p className='capitalize font-semibold text-center mb-2 text-blue-700'>upload logo</p>
                <input 
                    type="file" 
                    onChange ={(event) => {setUploadFile(event.target.files[0]);}} 
                />
            </div>
        }
        <p className='text-white w-1/2 px-4 py-2 bg-green-700 font-semibold rounded-md text-center hover:scale-110 cursor-pointer transition' onClick={()=>handleImageUpload()}>Update</p>
        {loading && <Loader/>}
        {
            toastMsg.length>=1&&
            <Toaster toastMsg={toastMsg} setToastMsg={setToastMsg} isSuccess={false}/>
        }
    </div>
  )
}

export default UpdateEmployee