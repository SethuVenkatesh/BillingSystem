import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom'; 
import Home from './pages/Home';
import NewCompany from './pages/NewCompany';
function App() {
  return (
    <Router> 
        <Routes> 
            <Route exact path='/home' element={<Home/>}></Route> 
            <Route exact path='/company/new' element={<NewCompany/>}></Route> 
        </Routes> 
    </Router> 
  );
}

export default App;
