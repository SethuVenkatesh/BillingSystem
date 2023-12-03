import React, { createContext, useEffect, useState } from 'react';
import api from '../axios';


export const UserDetailsContext = createContext();

export function UserDetailsProvider({ children }) {
  const [userDetails, setUserDetails] = useState({
    isLoggedIn:false
  });
  
  useEffect(()=>{
    setUserDetails({isLoggedIn:false})
  },[])

  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails}}>
      {children}
    </UserDetailsContext.Provider>
  );
}