import React, { useEffect, useState } from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
import { useContext } from 'react'
import { UserDetailsContext } from '../context/userContext'
import Icons from '../components/common/Icons'
import PopupComponent from './common/PopupComponent';
import { sideBarAccountTabs, sideBarTabs } from '../constants'
import InputComponent from './common/InputComponent';
import axios from 'axios';
import api from '../axios';
import Loader from './common/Loader';
import Toaster from './common/Toaster';
import { stateNames } from '../constants';
import SelectComponent from './common/SelectComponent';

const SideBar = () => {
    //bg-color #212934
    //active-color  #191f26
    // border-color #3e454e
    // text-color #9b9ea3
    // tab-color #ed1a3b
    const { userDetails,userLogout,firmDetails,setFirmDetails } = useContext(UserDetailsContext);
    const location = useLocation();
    const [showPopUp,setShowPopUp]=useState(false);
    const onCloseFn=()=>{
      setShowPopUp(false);
    }
  
    const onOpenFn=()=>{
      setShowPopUp(true);
    }


    const [activeTab, setActiveTab] = useState(sideBarTabs[0].tabName);
    const [expandSubTab, setExpandSubTab] = useState("");
    const [activeSubTab, setActiveSubTab] = useState("");
    const navigate = useNavigate();

    const handleTabChange = (tabName, tabExpand, subTab) => {
        if(tabName=='Logout'){
            handleLogout()                 
            return;
        }
        if (activeTab == tabName && expandSubTab == tabName) {
            setExpandSubTab("")
            setActiveSubTab("")
        }else if(tabExpand){
            setExpandSubTab(tabName)
            setActiveSubTab(subTab[0].routeName)
        }
        setActiveTab(tabName)
        if(tabExpand){
            navigate(`${tabName}/${subTab[0].routeName}`)
            
        }else{
            navigate(`${tabName}`)
        }
        
    }

    const handleLogout =async () =>{
    
        await userLogout();
        navigate('/')
      }
    

    const handleSubTabChange = (subTab) => {
        setActiveSubTab(subTab)
        navigate(`${activeTab}/${subTab}`)
    }

    
    useEffect(()=>{
        let tabName = location.pathname.split("/")[2];
        let subTabName = location.pathname.split("/")[3];
        setActiveTab(tabName);
        console.log(subTabName)
        if(subTabName){
            setExpandSubTab(tabName)
        }
        setActiveSubTab(subTabName);
        console.log(location.pathname)
    },[firmDetails])

  
    return (

        <div className='min-h-[100vh] w-[220px] bg-[#212934] flex flex-col justify-between relative '>
                <PopupComponent isOpen={showPopUp} onCloseFn={()=>onCloseFn()} popUpTitle={'Edit Firm'} isBtnVisible={false} >
                    <EditFirmComponent/>
                </PopupComponent>
            <div>
                {
                    firmDetails &&
                    <div className='p-2 flex items-center gap-x-4 border-b-2 border-[#3e454e] cursor-pointer text-white' onClick={()=>onOpenFn()}>
                        <div className='w-[45px] h-[45px] aspect-square rounded-full'>
                            {
                                firmDetails.logo_url == '' ?
                                <img className='h-full w-full object-cover rounded-full' src={firmDetails.default_logo_url} alt='not-found' />
                                :
                                <img className='h-full w-full object-cover rounded-full' src={firmDetails.logo_url} alt='not-found' />

                            }
                        </div>
                        <p className='capitalize font-bold w-full overflow-hidden truncate'>{firmDetails.firm_name}</p>
                        {Icons['arrow-right-icon']}
                    </div>
                }
            {

                sideBarTabs.map((sideBarTab) => {
                    if (sideBarTab.isTabExpand) {
                        return (
                            <div className=''>
                                <div className={` p-2 flex items-center gap-x-4 cursor-pointer relative ${activeTab === sideBarTab.tabName ? 'text-white bg-[#191f26]' : 'text-[#9b9ea3]'}`} onClick={() => handleTabChange(sideBarTab.tabName, sideBarTab.isTabExpand, sideBarTab.subTabs)}>
                                    <div className='ml-2'>
                                        {sideBarTab.icon}
                                    </div>
                                    <p className='font-semibold capitalize'>{sideBarTab.tabName}</p>
                                    {
                                        activeTab === sideBarTab.tabName &&
                                        <p className='absolute h-full w-1 bg-[#ed1a3b] left-0'></p>
                                    }
                                    {
                                        (activeTab == sideBarTab.tabName && expandSubTab == sideBarTab.tabName) ?
                                        <div className='ml-auto'>
                                            {
                                                Icons['arrow-up-icon']
                                            }
                                        </div>
                                        :
                                        <div className='ml-auto'>
                                            {
                                                Icons['arrow-down-icon']
                                            }
                                        </div>
                                    }
                                </div>
                                {/*  &&  */}
                                <div className={`transition-all duration-300 ease-in-out ${(activeTab == sideBarTab.tabName && expandSubTab == sideBarTab.tabName) ? 'block':'hidden'}`}>
                                {
                                    
                                    sideBarTab.subTabs.map((subTab) => {
                                        return (
                                            <div className={`p-2 flex items-center cursor-pointer relative ${activeSubTab === subTab.routeName ? 'text-white bg-[#191f26]' : 'text-[#9b9ea3]'}`} onClick={() => handleSubTabChange(subTab.routeName)}>
                                                <p className='font-semibold capitalize text-sm text-center ml-8'>{subTab.tabName}</p>
                                            </div>
                                        )
                                    })
                                }
                                </div>
                            </div>
                        )
                    }
                    else {
                        return (
                            <div className={` p-2 flex items-center gap-x-4 cursor-pointer relative ${activeTab === sideBarTab.tabName ? 'text-white bg-[#191f26]' : 'text-[#9b9ea3]'}`} onClick={() => handleTabChange(sideBarTab.tabName, sideBarTab.isTabExpand, sideBarTab.subTabs)}>
                                <div className='ml-2'>
                                    {sideBarTab.icon}
                                </div>
                                <p className='font-semibold capitalize'>{sideBarTab.tabName}</p>
                                {
                                    activeTab === sideBarTab.tabName &&
                                    <p className='absolute h-full w-1 bg-[#ed1a3b] left-0'></p>
                                }
                            </div>
                        )
                    }
                })
            }
            <p className='mt-2 border-b-2 border-[#3e454e] relative'></p>
            </div>
            <div className='border-t-2 border-[#3e454e]'>
                {
                    sideBarAccountTabs.map((sideBarTab)=>{
                        return(
                            <div className={`p-2 flex items-center gap-x-4 cursor-pointer relative ${activeTab === sideBarTab.tabName ? 'text-white bg-[#191f26]' : 'text-[#9b9ea3]'}`} onClick={() => handleTabChange(sideBarTab.tabName)}>
                            <div className='ml-2'>
                                {sideBarTab.icon}
                            </div>
                            <p className='font-semibold capitalize'>{sideBarTab.tabName}</p>
                            {
                                activeTab === sideBarTab.tabName &&
                                <p className='absolute h-full w-1 bg-[#ed1a3b] left-0'></p>
                            }
                        </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

const EditFirmComponent = ({}) =>{
    const { userDetails,userLogout,firmDetails,setFirmDetails } = useContext(UserDetailsContext);


    const [firmData,setFirmData] = useState(firmDetails);
    const [loading,setLoading]=useState(false);
    const [toastMsg,setToastMsg] =useState("");
    const [toastStatus,setToastStatus] = useState(false);
    const [selectedTab,setSelectedTab] = useState(1);
    const [uploadFile, setUploadFile] = useState("");

    const handleTabChange = (tabIndex)=>{
        setSelectedTab(tabIndex)
    }
    const handleInputChange = (e) =>{
        setFirmData({...firmData,[e.target.name]:e.target.value})
    
    }


    const handleValidate = () =>{
        if(firmData.firm_name.trim()==""){
            setToastMsg("Firm Name cannot be empty");
            setToastStatus(false);
            return false;
        }
        return true
    }   
    const handleSaveFirm = () => {
        setLoading(true)
        let isSuccess = handleValidate();
        if(!isSuccess){
            setLoading(false)
            return;
        }
        console.log("save Employee",firmData)
        console.log("uploadFile",uploadFile)
        if(uploadFile){
            const formData = new FormData ();
            formData.append("file", uploadFile);
            formData.append("upload_preset", "ruwqs5az");
            formData.append("folder","firms/"+firmData._id);
            axios.post(
             "https://api.cloudinary.com/v1_1/dkjcfh7oj/image/upload",
             formData
           ).then((response)=>{
               let firmDetails = {...firmData,logo_url:response.data.secure_url} 
               setFirmData(firmDetails)
               api.put(`/firm/${firmData._id}`,{firmDetails}).then((res)=>{
                   console.log(res)
                   setLoading(false);
                   setToastMsg("Firm Updated successfully");
                   setFirmDetails(firmDetails)
                   setToastStatus(true);
                   setUploadFile(null)
               }).catch((err)=>{
                   setLoading(false)
                   setToastMsg("Error in Updating Firm");
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
            api.put(`/firm/${firmData._id}`,{firmData}).then((res)=>{
                console.log(res)
                setLoading(false);
                setToastMsg("Firm Updated successfully");
                setFirmDetails(firmData)
                setToastStatus(true);
                setUploadFile(null)
            }).catch((err)=>{
                setLoading(false)
                setToastMsg("Error in Updating Firm");
                setToastStatus(false);
                console.log(err)
            })
        }
    }

    return(
        <div className='flex flex-col'>
            <div className='grid grid-cols-2'>
                <div className='p-4 w-[300px] truncate'>
                    {
                        firmData.logo_url == '' ?
                       
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
                            <img src={firmData.logo_url} className='w-[200px] aspect-square rounded-full border border-gray-300'/>
                            <p className='absolute bottom-2 right-1/4 p-2 bg-red-500 rounded-full cursor-pointer text-white' onClick={()=>setFirmData({...firmData,logo_url:""})}>
                                {
                                    Icons['delete-icon']
                                }
                            </p>
                        </div>
                    }
                </div>
                <div className='flex flex-col '>
                    <InputComponent inputType="text" labelName="Firm Name" inputName="firm_name" inputValue={firmData.firm_name} jsonDetails={firmData} setJsonDetails={setFirmData}/>
                    <InputComponent inputType="text" labelName="GSTIN" inputName="GST_number" inputValue={firmData.GST_number} jsonDetails={firmData} setJsonDetails={setFirmData}/>
                    <InputComponent inputType="text" labelName="mobile number" inputName="mobile_number" inputValue={firmData.mobile_number} jsonDetails={firmData} setJsonDetails={setFirmData}/>                        
                    <InputComponent inputType="text" labelName="alternate mobile number" inputName="alt_mobile_number" inputValue={firmData.alt_mobile_number} jsonDetails={firmData} setJsonDetails={setFirmData}/>
                    <InputComponent inputType="text" labelName="Email ID" inputName="email_id" inputValue={firmData.email_id} jsonDetails={firmData} setJsonDetails={setFirmData}/>
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
                        <div className=''>
                            <InputComponent inputType="text" labelName="Address" inputName="address" inputValue={firmData.address} jsonDetails={firmData} setJsonDetails={setFirmData}/>
                            <InputComponent inputType="text" labelName="City" inputName="city" inputValue={firmData.city} jsonDetails={firmData} setJsonDetails={setFirmData}/>
                            <InputComponent inputType="number" labelName="pincode" inputName="pincode" inputValue={firmData.pincode} jsonDetails={firmData} setJsonDetails={setFirmData}/>
                            <SelectComponent labelName="state" inputName="state" inputValue={firmData.state} inputArray={stateNames} jsonDetails={firmData} setJsonDetails={setFirmData}/>
                        </div> : 
                        <div className=''>
                            <InputComponent inputType="text" labelName="Bank Name" inputName="bank_name" inputValue={firmData.bank_name} jsonDetails={firmData} setJsonDetails={setFirmData}/>
                            <InputComponent inputType="text" labelName="Branch Name" inputName="bank_branch" inputValue={firmData.bank_branch} jsonDetails={firmData} setJsonDetails={setFirmData}/>
                            <InputComponent inputType="number" labelName="Account Number" inputName="account_number" inputValue={firmData.account_number} jsonDetails={firmData} setJsonDetails={setFirmData}/>
                            <InputComponent inputType="text" labelName="IFSC Code" inputName="IFSC_code" inputValue={firmData.IFSC_code} jsonDetails={firmData} setJsonDetails={setFirmData}/>
                        </div>
                    }
                </div>
            </div>
            {loading && <Loader/>}
            {
                toastMsg.length>=1&&
                <Toaster toastMsg={toastMsg} setToastMsg={setToastMsg} isSuccess={toastStatus}/>
            }
            <p className='text-white bg-blue-500 rounded-md p-1 cursor-pointer px-6 capitalize w-fit ml-auto mr-2 select-none' onClick={()=>handleSaveFirm()}>save</p>
        </div>
    )
}

export default SideBar