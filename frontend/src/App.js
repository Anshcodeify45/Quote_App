import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/pages/Home';
import Login from './Components/pages/Login';
import Register from './Components/pages/Register';
import SavedQuotes from './Components/pages/SubmitQuote';
import { useState } from 'react';
function App() {
  const [user, setUser] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log("user data>>>",user);
 
  return (
    <div className="App">
          <Router>
      <Navbar  user={user}/>
      <div className="p-4 max-w-3xl mx-auto">
        <Routes>
          <Route path="/" element={<Home  isLoggedIn={isLoggedIn} />} />
          <Route path="/login" element={<Login  setUser={setUser} setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/saved" element={<SavedQuotes />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
