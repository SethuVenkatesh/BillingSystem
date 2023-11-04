import React from 'react'
import InputComponent from '../../components/common/InputComponent';
import Toaster from '../../components/common/Toaster';
import Loader from '../../components/common/Loader';
import { companyDetailsParams,bankDetailsParams } from '../../constants';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

const UpdateCompany = ({props}) => {

    const [loading,setLoading]=useState(false);
    const [toastMsg,setToastMsg] =useState("");
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
    const [uploadFile, setUploadFile] = useState("");

    const handleImageUpload = () => {
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
          let companyData={...companyDetails,logo_url:response.data.secure_url}
          setCompanyDetails({...companyDetails,logo_url:response.data.secure_url})
          updateCompany(companyData)
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
        }
      };

      const handleValidate=()=>{
        let valSuccess = true;
        for(let index=0;index<companyDetailsParams.length;index++){
            console.log(companyDetailsParams[index])
            if(companyDetails[companyDetailsParams[index].inputName].length == 0){
                setLoading(false);
                setToastMsg(companyDetailsParams[index].labelName +" is required")
                valSuccess = false;
                return;
            }
        }

        if(!valSuccess) return false;
        for(let index=0;index<bankDetailsParams.length;index++){
            console.log(bankDetailsParams[index])
            if(companyDetails[bankDetailsParams[index].inputName].length == 0){
                setLoading(false);
                setToastMsg(bankDetailsParams[index].labelName +" is required")
                valSuccess = false;
                return;
            }
        }

        if(!valSuccess) return false;
        if(uploadFile.length == 0){
            setLoading(false);
            setToastMsg("company logo is required")
        }
        return true;
      }

      const updateCompany= (companyData)=>{
        axios.put("http://localhost:4000/company/edit",{companyData}).then((res)=>{
            console.log(res)
            setLoading(false);
        }).catch((err)=>{
            console.log(err)
        })
      }

  useEffect(()=>{
    console.log(companyId)
    setLoading(true);
    axios.get(`http://localhost:4000/company/${companyId}`).then((res)=>{
      setLoading(false);
      setCompanyDetails(res.data)
    }).catch(e=>{
      console.log(e)
    })
  },[])

  return (
    <div className='w-full px-4 py-2 flex items-center justify-center flex-col'>
        <div className='flex items-center justify-between gap-x-2 mb-4 w-full '>
            <p className='border border-blue-800 w-full'></p>
            <p className='font-semibold text-blue-700 text-md min-w-fit'>Company Details</p>
            <p className='border border-blue-800 w-full'></p>        
        </div>
        <div className='grid auto-rows-auto gap-4 w-3/4 grid-cols-2 mb-4'>
            {
                companyDetailsParams.map((details)=>{
                    return (
                        <InputComponent inputType={details.inputType} labelName={details.labelName} inputName={details.inputName} inputValue={companyDetails[details.inputName]} companyDetails={companyDetails} setCompanyDetails={setCompanyDetails}/>
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
                        <InputComponent inputType={details.inputType} labelName={details.labelName} inputName={details.inputName} inputValue={companyDetails[details.inputName]} companyDetails={companyDetails} setCompanyDetails={setCompanyDetails}/>
                    )
                })
            }
        </div>
        <div className='p-4 border border-blue-500 rounded-md mb-4'> 
            <p className='capitalize font-semibold text-center mb-2 text-blue-700'>upload logo</p>
            <input 
                type="file" 
                onChange ={(event) => {setUploadFile(event.target.files[0]);}} 
            />
        </div>
        <p className='text-white w-1/2 px-4 py-2 bg-green-700 font-semibold rounded-md text-center hover:scale-110 cursor-pointer transition' onClick={()=>handleImageUpload()}>Update</p>
        {loading && <Loader/>}
        {
            toastMsg.length>=1&&
            <Toaster toastMsg={toastMsg} setToastMsg={setToastMsg} isSuccess={false}/>
        }
    </div>
  )
}

export default UpdateCompany