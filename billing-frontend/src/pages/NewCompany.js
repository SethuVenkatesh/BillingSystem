import React, { useState } from 'react'
import InputComponent from '../components/common/InputComponent';

const NewCompany = () => {

    const [companyDetails,setCompanyDetails]=useState({
        company_name:"",
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

    const companyDetailsParams=[
        {inputType:"text",labelName:"company name",inputValue:companyDetails['company_name'],inputName:'company_name'},
        {inputType:"text",labelName:"addres",inputValue:companyDetails['addres'],inputName:'address'},
        {inputType:"text",labelName:"city",inputValue:companyDetails['city'],inputName:'city'},
        {inputType:"text",labelName:"state",inputValue:companyDetails['state'],inputName:'state'},
        {inputType:"number",labelName:"pincode",inputValue:companyDetails['pincode'],inputName:'pincode'},
        {inputType:"number",labelName:"mobile_number",inputValue:companyDetails['mobile_number'],inputName:'mobile_number'},
        {inputType:"number",labelName:"alternate mobile number",inputValue:companyDetails['alt_mobile_number'],inputName:'alt_mobile_number'},
        {inputType:"text",labelName:"GST number",inputValue:companyDetails['GST_number'],inputName:'GST_number'},
    ]
    
    const bankDetailsParams=[
        {inputType:"text",labelName:"bank name",inputValue:companyDetails['bank_name'],inputName:'bank_name'},
        {inputType:"text",labelName:"bank branch",inputValue:companyDetails['bank_branch'],inputName:'bank_branch'},
        {inputType:"text",labelName:"account number",inputValue:companyDetails['account_number'],inputName:'account_number'},
        {inputType:"text",labelName:"IFSC code",inputValue:companyDetails['IFSC_code'],inputName:'IFSC_code'}
    ]

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
                        <InputComponent inputType={details.inputType} labelName={details.labelName} inputName={details.inputName} inputValue={details.inputValue} companyDetails={companyDetails} setCompanyDetails={setCompanyDetails}/>
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
                        <InputComponent inputType={details.inputType} labelName={details.labelName} inputName={details.inputName} inputValue={details.inputValue} companyDetails={companyDetails} setCompanyDetails={setCompanyDetails}/>
                    )
                })
            }
        </div>
        <p className='text-white w-1/2 px-4 py-2 bg-green-700 font-semibold rounded-md text-center hover:scale-110 cursor-pointer transition'>Create</p>
    </div>
  )
}

export default NewCompany