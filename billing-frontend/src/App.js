import { BrowserRouter as Router,Routes, Route, Navigate,Outlet } from 'react-router-dom'; 
import Home from './pages/Home';


import NewCompany from './pages/company/NewCompany';
import AllCompany from './pages/company/AllCompany';
import UpdateCompany from './pages/company/updateCompany';
import ViewCompany from './pages/company/ViewCompany';

import LoginPage from './pages/authentication/LoginPage';
import SignUpPage from './pages/authentication/SignUpPage';
import { Navbar } from './components/Navbar';
import NotFound from './pages/NotFound';

import { useContext } from 'react';
import { UserDetailsContext } from './context/userContext';
import NewEmployee from './pages/employee/NewEmployee';
import AllEmployee from './pages/employee/AllEmployee';

function App() {

  const {userDetails,setUserDetails} = useContext(UserDetailsContext);
  console.log(userDetails)
  

  return (

    <div>
      {userDetails &&
    <div className=''>
      <Router> 
          {
            userDetails.userData && 
              <Navbar userDetails={userDetails}/>
          }
          <Routes> 
                {
                userDetails.isLoggedIn ?
                  <>
                   <Route exact path='/home' element={<Home/>}></Route>
                   <Route exact path="/company/new" element={<NewCompany/>} /> 
                   <Route exact path="/company/all" element={<AllCompany/>} /> 
                   <Route exact path="/company/view/:companyId" element={<ViewCompany/>} /> 
                   <Route exact path="/company/update/:companyId" element={<UpdateCompany/>} /> 
                   <Route exact path="/employee/all" element={<AllEmployee/>} /> 
                   <Route exact path="/employee/new" element={<NewEmployee/>} /> 
                   <Route exact path='/' element={<LoginPage/>}></Route>
                   <Route exact path='/signup' element={<SignUpPage/>}></Route>
                   <Route exact path='/login' element={<LoginPage/>}></Route>
                   <Route path='*' element={<NotFound/>}/>
                  </>
                : 
                <>  

                  <Route exact path='/' element={<LoginPage/>}></Route>
                  <Route exact path='/signup' element={<SignUpPage/>}></Route>
                  <Route exact path='/login' element={<LoginPage/>}></Route>
                  <Route exact path='*' element={<LoginPage/>}></Route>
                  </>
                }
              {/* <Route
                exact
                path="/home"
                element={
                  userDetails.isLoggedIn ? (
                      <Home/>
                  ) : (
                    // <Navigate to="/login" replace />
                    <></>
                  )
                }
              /> */}
              {/* <Route
                exact
                path="/company/new"
                element={
                  userDetails.isLoggedIn ? (
                      <NewCompany />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/company/all"
                element={
                  userDetails.isLoggedIn ? (
                      <AllCompany />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/company/update/:companyId"
                element={
                  userDetails.isLoggedIn ? (
                    <UpdateCompany />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/company/view/:companyId"
                element={
                  userDetails.isLoggedIn ? (
                      <ViewCompany/>
                    ) : (
                    <Navigate to="/login" replace />
                  )
                }
              /> */}
          </Routes> 
      </Router> 
    </div>
    }
    </div>
  );
}




export default App;
