import React from 'react'
import { useState } from 'react'
import SideBar from '../../components/SideBar'
import AllRoutes from './AllRoutes'
import { useContext } from 'react'
import { UserDetailsContext } from '../../context/userContext'
import Loader from '../../components/common/Loader'

const Dashboard = () => {
  
 
  const { firmDetails } = useContext(UserDetailsContext) 
  return (
    <div className='flex '>
        {
          firmDetails ? 
          <>
            <SideBar/>
            <AllRoutes/>
          </>:
          <Loader/>
        }
    </div>
  )
}

export default Dashboard