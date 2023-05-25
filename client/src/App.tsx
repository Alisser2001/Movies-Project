import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import LandingPage from './components/landing';
import Search from './components/search';
import LogIn from './components/login';
import SignUp from './components/signup';
//import axios from 'axios';

//axios.defaults.baseURL = "http://localhost:3000/";

function App() {
  return (
    <Router>
      <div className='app'>
        <Navbar/>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/login" element={<LogIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
