import React, { createContext, useEffect, useState,useCallback } from 'react';
import api from '../axios';


export const UserDetailsContext = createContext();

export function UserDetailsProvider({ children }) {


  const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem('techprinting-current-user'))||null);
  const [firmDetails,setFirmDetails] = useState();
  
  const userLogin = useCallback(async (inputs) => {
    console.log("userLogin")
    const res = await api.post("user/login",inputs);
    setUserDetails(res.data.userData);
    return res;
  }, []);

  const userLogout = useCallback(async () => {
    console.log("userLogout")
    setUserDetails(null)
  }, []);


   const getFirmDetails = () =>{
    let firmId = userDetails.firm
    api.get(`/firm/${firmId}`).then((res)=>{
      setFirmDetails(res.data)
    }).catch(err=>console.log(err))
   }
   console.log(firmDetails)


   useEffect(() => {
    console.log("useEffect userContect")
     if (userDetails) {
       localStorage.setItem("techprinting-current-user", JSON.stringify(userDetails));
       getFirmDetails();

    } else {
      localStorage.removeItem("techprinting-current-user");
      setFirmDetails()
    }
  }, [userDetails]);


  return (
    <UserDetailsContext.Provider value={{ userDetails,userLogin,userLogout,firmDetails,setFirmDetails}}>
      {children}
    </UserDetailsContext.Provider>
  );
}