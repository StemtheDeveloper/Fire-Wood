import logo from './assets/logos/Fire Wood Logo.svg';
import './App.css';
import React from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // Import the Home component
import Admin from './pages/Admin'; // Import the Admin component
import Contact from './pages/Contact'; // Import the Contact component
import Deck from './pages/Deck'; // Import the Deck component
import Login from './pages/Login'; // Import the Login component
import Play from './pages/Play'; // Import the Play component
import Profile from './pages/Profile'; // Import the Profile component
import Shop from './pages/Shop'; // Import the Shop component
import Signup from './pages/Signup'; // Import the Signup component
import Stats from './pages/Stats'; // Import the Stats component
import BG from './assets/backgrounds/Designer (12).png';

function App() {
  return (
    <Router>
      <div className='appBackground'><img src={BG} className="backgroundImage" alt="A medieval battle scene" /></div>
      
      <div className="gradientOverlay"></div>
      <div className="App">
        <header className="App-header">
          <Nav />
        </header>
        
        <Routes>
          <Route path="/" element={<Home />} /> {/* Add Home route */}
          <Route path="/admin" element={<Admin />} /> {/* Add Admin route */}
          <Route path="/contact" element={<Contact />} /> {/* Add Contact route */}
          <Route path="/deck" element={<Deck />} /> {/* Add Deck route */}
          <Route path="/login" element={<Login />} /> {/* Add Login route */}
          <Route path="/play" element={<Play />} /> {/* Add Play route */}
          <Route path="/profile" element={<Profile />} /> {/* Add Profile route */}
          <Route path="/shop" element={<Shop />} /> {/* Add Shop route */}
          <Route path="/signup" element={<Signup />} /> {/* Add Signup route */}
          <Route path="/stats" element={<Stats />} /> {/* Add Stats route */}
        </Routes>
        <Footer />
      </div>
      
    </Router>
  );
}

export default App;
