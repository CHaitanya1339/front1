
import './App.css';
import Navbar from './layout/Navbar';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Register from "./users/Register";
import Login from './users/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Dashboard/>}/>
        <Route exact path='/Login' element={<Login/>}/>
        <Route exact path='/Register' element={<Register/>}/>
        <Route exact path='/Dashboard' element={<Dashboard/>}/>
        
      </Routes>
      </Router> 
    </div>
  );
}

export default App;
