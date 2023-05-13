import './App.css';
import Header from './layout/Header';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./users/Register";
import Login from './users/Login';
import Dashboard from './pages/Dashboard';
import Userdash from './pages/Userdash';
import History from './pages/History';
import Tracking from './pages/Tracking';
import Setting from './pages/Setting';
import Creator from './pages/Creator';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' element={<Dashboard />} />
          <Route exact path='/Login' element={<Login />} />
          <Route exact path='/Register' element={<Register />} />
          <Route exact path='/Dashboard' element={<Dashboard />} />
          <Route exact path='/Userdash' element={<Userdash />} />
          <Route exact path='/workout-history' element={<History />} />
          <Route exact path='/exercise-tracking' element={<Tracking />} />
          <Route exact path='/goal-setting' element={<Setting />} />
          <Route exact path='/workout-plan-creator' element={<Creator />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
