import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom'; 
import Home from './pages/Home';
import NewCompany from './pages/company/NewCompany';
import AllCompany from './pages/company/AllCompany';
import UpdateCompany from './pages/company/updateCompany';
import ViewCompany from './pages/company/ViewCompany';

function App() {
  return (
    <Router> 
        <Routes> 
            <Route exact path='/home' element={<Home/>}></Route> 
            <Route exact path='/company/new' element={<NewCompany/>}></Route>
            <Route exact path='/company/all' element={<AllCompany/>}></Route>
            <Route exact path='/company/update/:companyId' element={<UpdateCompany/>}></Route>
            <Route exact path='/company/view/:companyId' element={<ViewCompany/>}></Route>  
        </Routes> 
    </Router> 
  );
}

export default App;
