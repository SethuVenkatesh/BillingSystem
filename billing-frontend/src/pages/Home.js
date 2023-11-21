import React, { useState } from 'react'
import PopupComponent from '../components/common/PopupComponent'
import Loader from '../components/common/Loader';
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
      <button onClick={()=>onOpenFn()}>Open</button>
      <PopupComponent isOpen={showPopUp} onCloseFn={()=>onCloseFn()} popUpTitle={'Monthly Report'} isBtnVisible={true} closeBtnFn={()=>onCloseFn()}>
        <p>If you aren't satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except eject will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use eject. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.</p>
<p>If you aren't satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except eject will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use eject. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.</p>
<p>If you aren't satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except eject will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use eject. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.</p>

      </PopupComponent>
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