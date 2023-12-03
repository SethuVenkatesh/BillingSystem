import React, { createContext, useEffect, useState } from 'react';
import api from '../axios';


export const UserDetailsContext = createContext();

export function UserDetailsProvider({ children }) {
  const [userDetails, setUserDetails] = useState({
    isLoggedIn:false
  });
  
  useEffect(()=>{
    let currentUser = JSON.parse(localStorage.getItem('techprinting-current-user'))
    if(currentUser){
      setUserDetails({isLoggedIn:true,userData:currentUser})
    }else{
      setUserDetails({isLoggedIn:false})
    }
  },[])

  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails}}>
      {children}
    </UserDetailsContext.Provider>
  );
}