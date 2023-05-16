import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import LandingPage from './components/landing';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3000/";

function App() {

  return (
    <Router>
      <div className='app'>
        <Navbar/>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
