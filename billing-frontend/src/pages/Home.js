import React, { useState } from 'react'
import PopupComponent from '../components/common/PopupComponent'
import Loader from '../components/common/Loader';
import { Navbar } from '../components/Navbar';
const Home = () => {

  const [showPopUp,setShowPopUp]=useState(false);
  const onCloseFn=()=>{
    setShowPopUp(false);
    console.log("close")
  }

  const onOpenFn=()=>{
    setShowPopUp(true);
    console.log("open")

  }
  console.log(showPopUp)
  return (
    <div>
      <p>Home</p>
      <p>Home</p>
      <p>Home</p>
      <p>Home</p>
      <p>Home</p>
      <p>Home</p>
      
      {/* <Loader/> */}
      <p>Home</p>
      <p>Home</p>
      <p>Home</p>
      <p>Home</p>
      <p>Home</p>
      <p>Home</p>
      <p>Home</p>
      <p>Home</p>
      <p>Home</p>

    </div>
  )
}

export default Home