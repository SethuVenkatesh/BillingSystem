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

function App() {

  const isLoggedIn = false;

  return (
    <div>
      {
        isLoggedIn && 
        <>
          <Navbar/>
          <p className='mt-[70px]'></p>
        </>
      }
    <div className='h-screen'>
      <Router> 
          <Routes> 
              <Route exact path='/' element={<LoginPage/>}></Route>
              <Route exact path='/login' element={<LoginPage/>}></Route>
              <Route exact path='/signup' element={<SignUpPage/>}></Route>
              <Route
                path="/home"
                element={
                  isLoggedIn ? (
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
                  isLoggedIn ? (
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
                  isLoggedIn ? (
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
                  isLoggedIn ? (
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
                  isLoggedIn ? (
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
                  isLoggedIn ? (
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
