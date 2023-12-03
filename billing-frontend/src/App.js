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

function App() {

  const {userDetails,setUserDetails} = useContext(UserDetailsContext);

  return (
    <div>
      {
        userDetails.isLoggedIn && 
        <>
          <Navbar userDetails={userDetails}/>
          <p className='mt-[70px]'></p>
        </>
      }
    <div className=''>
      <Router> 
          <Routes> 
              <Route exact path='/' element={<LoginPage/>}></Route>
              <Route exact path='/login' element={<LoginPage/>}></Route>
              <Route exact path='/signup' element={<SignUpPage/>}></Route>
              <Route
                path="/home"
                element={
                  userDetails.isLoggedIn ? (
                    <Outlet>
                      <Route path="/home" element={<Home />} />
                    </Outlet>
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/company/new"
                element={
                  userDetails.isLoggedIn ? (
                    <Outlet>
                      <Route path="/company/new" element={<NewCompany />} />
                    </Outlet>
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/company/all"
                element={
                  userDetails.isLoggedIn ? (
                    <Outlet>
                      <Route path="/company/all" element={<AllCompany />} />
                    </Outlet>
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/company/new"
                element={
                  userDetails.isLoggedIn ? (
                    <Outlet>
                      <Route path="/company/new" element={<NewCompany />} />
                    </Outlet>
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/company/update/:companyId"
                element={
                  userDetails.isLoggedIn ? (
                    <Outlet>
                      <Route path="/company/update/:companyId" element={<UpdateCompany />} />
                    </Outlet>
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/company/view/:companyId"
                element={
                  userDetails.isLoggedIn ? (
                    <Outlet>
                      <Route path="/company/update/:companyId" element={<ViewCompany />} />
                    </Outlet>
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route path='*' element={<NotFound/>}/>
          </Routes> 
      </Router> 
    </div>
    </div>
  );
}




export default App;
