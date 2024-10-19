import React from 'react'
import { useState,useEffect } from 'react';
import Loader from '../../components/common/Loader';
import Toaster from '../../components/common/Toaster';
import { useContext } from 'react';
import { UserDetailsContext } from '../../context/userContext';
import api from '../../axios';
import axios from 'axios';
import Icons from '../../components/common/Icons';
import PopupComponent from '../../components/common/PopupComponent';
import InputComponent from '../../components/common/InputComponent';
import SelectComponent from '../../components/common/SelectComponent';
import { stateNames } from '../../constants'

const Parties = () => {
  const [loading,setLoading]=useState(false);
  const [toastMsg,setToastMsg] =useState("");
  const [toastStatus,setToastStatus] = useState(false);
  const [allParties,setAllParties] = useState([])
  const [showPopUp,setShowPopUp]=useState(false);
  const [popUpTitle,setPopUpTitle] = useState("");
  const [isPopUpEdit,setIsPopUpEdit] = useState(false);
  const [partyDetails,setPartyDetails] = useState({})
  const { firmDetails } = useContext(UserDetailsContext);
  const [isNewParty,setIsNewParty] = useState(true);

  const onCloseFn=()=>{
      setShowPopUp(false);
    }
    const createNewEmployee=()=>{
      setIsNewParty(true);
      setIsPopUpEdit(true);
      setPopUpTitle("Add Party")
      setShowPopUp(true);
  }


  const getAllParties = (toastMessage) =>{
      setLoading(true);
      api.get("/party/all/"+firmDetails._id).then((res)=>{
            setAllParties(res.data)
            setLoading(false)
            setToastMsg(toastMessage)
            setToastStatus(true)
          }).catch(err=>{
              setLoading(false)
              
            console.log(err);
      })
    }

  useEffect(()=>{
    getAllParties("")
  },[])



  const handleView = (partyData) =>{
      setShowPopUp(true);
      setIsPopUpEdit(false);
      setPopUpTitle("Party Details");
      setPartyDetails(partyData);
  }
  const handleEdit = (partyData) =>{
      setIsNewParty(false)
      setIsPopUpEdit(true);
      setPopUpTitle("Edit Party")
      setShowPopUp(true);
      setPartyDetails(partyData);
  }
  
  const handleDelete = (partyData) =>{
      setLoading(true);
      api.delete("/party/delete/"+partyData._id).then((res)=>{
          setLoading(false);
          setToastStatus(true);
          getAllParties("Party Deleted successfully")
      }).catch(err=>{
          setLoading(false);
          setToastMsg("Error in Creating Party");
          setToastStatus(false);
      })
  }

return (
  <>
  {
      loading ? (
          <Loader/> 
      ) : (
          <div className='flex items-center justify-center gap-2 flex-col'>
              <PopupComponent isOpen={showPopUp} onCloseFn={()=>onCloseFn()} popUpTitle={popUpTitle} isBtnVisible={false} >
                  {
                      isPopUpEdit ? <PartyPopUp isNewParty={isNewParty} partyDetails={partyDetails} setShowPopUp={setShowPopUp} getAllParties={getAllParties}/> : <PartyDetailsPopUp partyDetails={partyDetails}/>
                  }
              </PopupComponent>
              <div className='rounded-sm border border-gray-300 shadow-md w-full min-h-[calc(100vh-50px)]'>
                  <div className='p-4 border-b border-gray-200 flex items-center'>
                      <p className='font-semibold text-lg text-slate-600 '>Party List</p>
                      <p className='px-2 py-2 shadow-md text-white font-semibold w-fit select-none cursor-pointer rounded-md ml-auto bg-[#212934]' onClick={()=>createNewEmployee()}>{Icons['add-icon']} Add Parties</p>
                  </div>
                  <div className='p-4 grid md:grid-cols-2 gap-x-2 gap-y-1 sm:grid-cols-1'>
                      {
                          allParties.map((party)=>{
                              return (
                                  <PartyCard partyDetails={party} handleView={handleView} handleEdit={handleEdit} handleDelete={handleDelete}/>
                              )
                          })
                      }
                  </div>
              </div>
              {
                  toastMsg.length>=1&&
                  <Toaster toastMsg={toastMsg} setToastMsg={setToastMsg} isSuccess={toastStatus}/>
              }
          </div>
      ) 
  }
  </>
  )
}

const PartyPopUp = ({isNewParty,partyDetails,getAllParties,setShowPopUp}) =>{

  const { firmDetails } = useContext(UserDetailsContext);
  const [partyData,setPartyData] = useState({
      party_name:"",
      logo_url:"",
      email_id:"",
      address:"",
      city:"",
      state:"",
      pincode:"",
      mobile_number:"",
      alt_mobile_number:"",
      bank_name:"",
      bank_branch:"",
      account_number:"",
      IFSC_code:"",
      GST_number:"",
      firm:firmDetails._id
  });
  
  const [loading,setLoading]=useState(false);
  const [toastMsg,setToastMsg] =useState("");
  const [toastStatus,setToastStatus] = useState(false);
  const [selectedTab,setSelectedTab] = useState(1);
  const [uploadFile, setUploadFile] = useState("");

  let today = new Date();
  let maxDate = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);

  const handleTabChange = (tabIndex)=>{
      setSelectedTab(tabIndex)
  }
  const handleInputChange = (e) =>{
      setPartyData({...partyData,[e.target.name]:e.target.value})
  }


  const handleValidate = () =>{
      if(partyData.party_name.trim()==""){
          setToastMsg("Party Name cannot be empty");
          setToastStatus(false);
          return false;
      }
      if(partyData.mobile_number.toString().trim()==""){
          setToastMsg("Mobile Number cannot be empty");
          setToastStatus(false);
          return false;
      }
      if(partyData.address.trim()==""){
          setToastMsg("Address cannot be empty");
          setToastStatus(false);
          return false;
      }
      if(partyData.city.trim()==""){
          setToastMsg("City cannot be empty");
          setToastStatus(false);
          return false;
      }
      if(partyData.state.trim()==""){
          setToastMsg("State cannot be empty");
          setToastStatus(false);
          return false;
      }
      if(partyData.pincode.toString().trim()==""){
          setToastMsg("Pincode cannot be empty");
          setToastStatus(false);
          return false;
      }
      if(partyData.bank_name.trim()==""){
        setToastMsg("Bank Name cannot be empty");
        setToastStatus(false);
        return false;
      }
      if(partyData.bank_branch.trim()==""){
        setToastMsg("Bank Branch cannot be empty");
        setToastStatus(false);
        return false;
      }
      if(partyData.account_number.toString().trim()==""){
        setToastMsg("Account cannot be empty");
        setToastStatus(false);
        return false;
      }
      if(partyData.IFSC_code.trim()==""){
        setToastMsg("IFSC Code cannot be empty");
        setToastStatus(false);
        return false;
    }
      return true
  }   
  const handleSaveEmployee = () => {
      setLoading(true)
      let isSuccess = handleValidate();
      if(!isSuccess){
          setLoading(false)
          return;

      }
      if(uploadFile){
          const formData = new FormData ();
          formData.append("file", uploadFile);
          formData.append("upload_preset", "ruwqs5az");
          formData.append("folder","employees/"+firmDetails._id+"/"+partyData.party_name);
          axios.post(
           "https://api.cloudinary.com/v1_1/dkjcfh7oj/image/upload",
           formData
         ).then((response)=>{
             let partyDetails = {...partyData,profile_url:response.data.secure_url,age:findEmployeeAge()} 
             setPartyData(partyDetails)
             api.post('/party/new',{partyDetails}).then((res)=>{
                 console.log(res)
                 setLoading(false);
                 setToastMsg("Party Created successfully");
                 setPartyData(partyDetails)
                 setToastStatus(true);
                 setUploadFile(null)
                 setShowPopUp(false);
                 getAllParties("Party Created successfully");
                 setShowPopUp(false);
             }).catch((err)=>{
                 setLoading(false)
                 setToastMsg("Error in Creating Party");
                 setToastStatus(false);
                 console.log(err)
             })
         }).catch((error) => {
          console.log(error);
          setToastMsg("Error in Uploading Image");
          setToastStatus(false);
          
        });
      }else{
          let partyDetails = {...partyData} 
          setPartyData(partyDetails)
          api.post('/party/new',{partyDetails}).then((res)=>{
              console.log(res)
              setLoading(false);
              setPartyData(partyDetails)
              setToastStatus(true);
              setUploadFile(null)
              setShowPopUp(false);
              getAllParties("Party Created successfully");
          }).catch((err)=>{
              setLoading(false)
              setToastMsg("Error in Creating Party");
              setToastStatus(false);
              console.log(err)
          })
      }
  }

  const findEmployeeAge = () =>{
      var today = new Date();
      var birthDate = new Date(partyData.date_of_birth);  
      console.log(today,birthDate)
      var age_now = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
      {
          age_now--;
      }
      return age_now;
  }

  const handleUpdateEmployee = () =>{
      setLoading(true)
      let isSuccess = handleValidate();
      if(!isSuccess){
          setLoading(false)
          return;
      }
      if(uploadFile){
          const formData = new FormData ();
          formData.append("file", uploadFile);
          formData.append("upload_preset", "ruwqs5az");
          formData.append("folder","employees/"+firmDetails._id+"/"+partyData.employee_name);
          axios.post(
           "https://api.cloudinary.com/v1_1/dkjcfh7oj/image/upload",
           formData
         ).then((response)=>{
             let partyDetails = {...partyData,profile_url:response.data.secure_url,age:findEmployeeAge()} 
             setPartyData(partyDetails)
             api.put('/party/update/'+partyDetails._id,{partyDetails}).then((res)=>{
                 console.log(res)
                 setLoading(false);
                 setToastMsg("Party Updated successfully");
                 setPartyData(partyDetails)
                 setToastStatus(true);
                 setUploadFile(null);
                 getAllParties("Party Updated successfully")
                 setShowPopUp(false);

             }).catch((err)=>{
                 setLoading(false)
                 setToastMsg("Error in Updating Party");
                 setToastStatus(false);
                 console.log(err)
             })
         }).catch((error) => {
          console.log(error);
          setToastMsg("Error in Uploading Image");
          setToastStatus(false);
          setLoading(false);
        });
      }else{
          let partyDetails = {...partyData} 
          setPartyData(partyDetails)
          api.put('/party/update/'+partyDetails._id,{partyDetails}).then((res)=>{
              console.log(res)
              setLoading(false);
              setToastMsg("Party Updated successfully");
              setPartyData(partyDetails)
              setToastStatus(true);
              setUploadFile(null)
              getAllParties("Party Updated successfully");
              setShowPopUp(false);

          }).catch((err)=>{
              setLoading(false)
              setToastMsg("Error in Updating Party");
              setToastStatus(false);
              console.log(err)
          })
      }
  }

  

  useEffect(()=>{
      if(isNewParty){
          setPartyData({...partyData})
      }
      else{
          setPartyData(partyDetails)
      }
  },[])


   return (
      <div className='flex flex-col'>
      <div className='grid grid-cols-2'>
          <div className='p-4 w-[300px] truncate'>
              {
                  partyData.logo_url == '' ?
                 
                  <div className='p-4 border border-blue-500 rounded-md mb-4 w-full h-fit '> 
                      <p className='capitalize font-semibold text-center mb-2 text-blue-500'>upload logo</p>
                      <input 
                          type="file" 
                          accept="image/*" 
                          className='w-full'
                          onChange ={(event) => {setUploadFile(event.target.files[0]);}} 
                      />
                  </div>
                  :
                  <div className='mb-4 relative p-4 flex items-center justify-center'>
                      <img src={partyData.logo_url} className='w-[200px] aspect-square rounded-full border border-gray-300'/>
                      <p className='absolute bottom-2 right-1/4 p-2 bg-red-500 rounded-full cursor-pointer text-white' onClick={()=>setPartyData({...partyData,logo_url:""})}>
                          {
                              Icons['delete-icon']
                          }
                      </p>
                  </div>
              }
          </div>
          <div className='flex flex-col gap-y-4'>
              <InputComponent inputType="text" labelName="Party Name" inputName="party_name" inputValue={partyData.party_name} jsonDetails={partyData} setJsonDetails={setPartyData}/>
              <InputComponent inputType="text" labelName="GST Number" inputName="GST_number" inputValue={partyData.GST_number} jsonDetails={partyData} setJsonDetails={setPartyData}/>
              <InputComponent inputType="text" labelName="mobile number" inputName="mobile_number" inputValue={partyData.mobile_number} jsonDetails={partyData} setJsonDetails={setPartyData}/>                        
              <InputComponent inputType="text" labelName="alternate mobile number" inputName="alt_mobile_number" inputValue={partyData.alt_mobile_number} jsonDetails={partyData} setJsonDetails={setPartyData}/>
              <InputComponent inputType="text" labelName="Email ID" inputName="email_id" inputValue={partyData.email_id} jsonDetails={partyData} setJsonDetails={setPartyData}/>
          </div>
      </div>
      <div className='mb-4'>
          <div className='flex border-b border-gray-300'>
              <p className={`capitalise px-2 py-2 cursor-pointer select-none ${selectedTab == 1 ? 'text-blue-500 font-bold border-b-2 border-blue-500' : 'text-slate-500 font-semibold'}`} onClick={()=>handleTabChange(1)}>Address Details</p>
              <p className={`capitalise px-2 py-2 cursor-pointer select-none ${selectedTab == 2 ? 'text-blue-500 font-bold border-b-2 border-blue-500' : 'text-slate-500 font-semibold'}`} onClick={()=>handleTabChange(2)}>Bank Details</p>
          </div>
          <div className='p-4 w-1/2 h-[200px]'>
              {
                  selectedTab == 1 ? 
                  <div className='flex flex-col gap-y-4'>
                      <InputComponent inputType="text" labelName="Address" inputName="address" inputValue={partyData.address} jsonDetails={partyData} setJsonDetails={setPartyData}/>
                      <InputComponent inputType="text" labelName="City" inputName="city" inputValue={partyData.city} jsonDetails={partyData} setJsonDetails={setPartyData}/>
                      <InputComponent inputType="number" labelName="pincode" inputName="pincode" inputValue={partyData.pincode} jsonDetails={partyData} setJsonDetails={setPartyData}/>
                      <SelectComponent labelName="state" inputName="state" inputValue={partyData.state} inputArray={stateNames} jsonDetails={partyData} setJsonDetails={setPartyData}/>
                  </div> : 
                  <div className='flex flex-col gap-y-4'>
                      <InputComponent inputType="text" labelName="Bank Name" inputName="bank_name" inputValue={partyData.bank_name} jsonDetails={partyData} setJsonDetails={setPartyData}/>
                      <InputComponent inputType="text" labelName="Branch Name" inputName="bank_branch" inputValue={partyData.bank_branch} jsonDetails={partyData} setJsonDetails={setPartyData}/>
                      <InputComponent inputType="number" labelName="Account Number" inputName="account_number" inputValue={partyData.account_number} jsonDetails={partyData} setJsonDetails={setPartyData}/>
                      <InputComponent inputType="text" labelName="IFSC Code" inputName="IFSC_code" inputValue={partyData.IFSC_code} jsonDetails={partyData} setJsonDetails={setPartyData}/>
                  </div>
              }
          </div>
      </div>
      {loading && <Loader/>}
      {
          toastMsg.length >=1 &&
          <Toaster toastMsg={toastMsg} setToastMsg={setToastMsg} isSuccess={toastStatus}/>
      }
      {
          isNewParty ? 
          <p className='text-white bg-blue-500 rounded-md p-1 cursor-pointer px-6 capitalize w-fit ml-auto mr-2 select-none' onClick={()=>handleSaveEmployee()}>save</p>
          :
          <p className='text-white bg-blue-500 rounded-md p-1 cursor-pointer px-6 capitalize w-fit ml-auto mr-2 select-none' onClick={()=>handleUpdateEmployee()}>update</p>
      }
  </div>
  )
}
const PartyCard = ({partyDetails,handleView,handleEdit,handleDelete}) =>{
  return(
    <div className='p-2 border border-gray-300 w-full'>
        <div className='flex gap-x-4 items-center relative'>
            <div className='w-[50px] rounded-full'>
                {
                    partyDetails.logo_url == '' ? 
                    <img src={partyDetails.default_logo_url} alt='Not Found' className='h-full w-full object-cover '/> 
                    :
                    <img src={partyDetails.logo_url} alt='Not Found' className='h-full aspect-square object-cover rounded-full'/> 
                }
            </div>
            <div className='text-slate-900'>
                <p className='font-semibold'>{partyDetails.party_name}</p>
            </div>
            <div className=' relative ml-auto cursor-pointer group'>
                <div className='p-4'>
                    {
                        Icons['more-icon']
                    }
                </div>
                <div className='absolute hidden group-hover:block right-4 top-10 cursor-pointer z-10 bg-white border border-gray-300 rounded-md shadow-md min-w-[150px] '>
                    <p className='flex px-4 py-2 items-center gap-x-2  hover:text-green-600 font-semibold' onClick={()=>handleView(partyDetails)}>
                        {
                            Icons['eye-icon']
                        }
                        <span>View</span>
                    </p>
                    <p className='flex px-4 py-2 items-center gap-x-2 hover:text-blue-600 font-semibold' onClick={()=>handleEdit(partyDetails)}>
                        {
                            Icons['edit-icon']
                        }
                        <span>Edit</span>
                    </p>
                    <p className='flex px-4 py-2 items-center gap-x-2 hover:text-red-600 font-semibold' onClick={()=>handleDelete(partyDetails)}>
                        {
                            Icons['delete-icon']
                        }
                        <span>Delete</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
)
}

const PartyDetailsPopUp = ({partyDetails}) =>{
  return (
    <div className='flex flex-col w-full'>
        <div className='flex items-center justify-center w-full'>
            {
                <img src={partyDetails.logo_url == '' ? partyDetails.default_logo_url: partyDetails.logo_url} alt='not found' className='w-[100px] aspect-square  object-cover rounded-full'/>
            }
            
        </div>
        <p className='font-bold text-slate-600 text-center mb-2'>{partyDetails.party_name}</p>
        <div className='flex flex-col gap-y-2'>
            <div className='grid grid-cols-2 text-slate-500 capitalize'>
                <p className='font-semibold'>GST_number</p>
                <p>: {partyDetails.GST_number}</p>
            </div>
            <div className='grid grid-cols-2 text-slate-500 capitalize'>
                <p className='font-semibold'>Mobile Number</p>
                <p>: {partyDetails.mobile_number}</p>
            </div>
            <div className='grid grid-cols-2 text-slate-500 capitalize'>
                <p className='font-semibold'>alternate mobile number</p>
                <p>: {partyDetails.alt_mobile_number}</p>
            </div>
            <div className='grid grid-cols-2 text-slate-500 capitalize'>
                <p className='font-semibold'>Address</p>
                <p>: {partyDetails.address}</p>
            </div>
            <div className='grid grid-cols-2 text-slate-500 capitalize'>
                <p className='font-semibold'>City</p>
                <p>: {partyDetails.city}</p>
            </div>
            <div className='grid grid-cols-2 text-slate-500 capitalize'>
                <p className='font-semibold'>state</p>
                <p>: {partyDetails.state}</p>
            </div>
            <div className='grid grid-cols-2 text-slate-500 capitalize'>
                <p className='font-semibold'>pincode</p>
                <p>: {partyDetails.pincode}</p>
            </div>
            <div className='grid grid-cols-2 text-slate-500 capitalize'>
                <p className='font-semibold'>Account Number</p>
                <p>: {partyDetails.account_number}</p>
            </div>
            <div className='grid grid-cols-2 text-slate-500 capitalize'>
                <p className='font-semibold'>IFSC Code</p>
                <p>: {partyDetails.IFSC_code}</p>
            </div>
            <div className='grid grid-cols-2 text-slate-500 capitalize'>
                <p className='font-semibold'>Bank Name</p>
                <p>: {partyDetails.bank_name}</p>
            </div>
            <div className='grid grid-cols-2 text-slate-500 capitalize'>
                <p className='font-semibold'>Branch</p>
                <p>: {partyDetails.bank_branch}</p>
            </div>

        </div>
    </div>
)
}

export default Parties