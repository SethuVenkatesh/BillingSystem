import { BrowserRouter as Router,Routes, Route, Redirect } from 'react-router-dom'; 
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
import BillingHome from './pages/billing/BillingHome';

import Dashboard from './pages/dashboard/Dashboard';
import ProtectiveRoute from './context/ProtectiveRoute';

function App() {
  return (
      <div className=''>
        <Router>
          <Routes>
            <Route 
              path='/dashboard/*' 
              element={
              <ProtectiveRoute>
                <Dashboard/>
              </ProtectiveRoute>}  
            />
            <Route exact path='/' element={<LoginPage/>}></Route>
            <Route exact path='/signup' element={<SignUpPage/>}></Route>
            <Route exact path='/login' element={<LoginPage/>}></Route>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </Router>
      </div>
  );
}




export default App;
