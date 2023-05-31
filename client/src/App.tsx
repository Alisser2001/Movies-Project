import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import LandingPage from './components/landing';
import Search from './components/search';
import Results from './components/results';
import LogIn from './components/login';
import SignUp from './components/signup';
import Rating from './components/rating';
import UserRating from './components/userRatings';
//import axios from 'axios';

//axios.defaults.baseURL = "http://localhost:3000/";

function App() {
  return (
    <Router>
      <div className='app'>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search/:imdbid" element={<Search />} />
          <Route path="/results" element={<Results />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/rating/:imdbid" element={<Rating />} />
          <Route path="/userRatings" element={<UserRating />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
