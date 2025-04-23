import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/pages/Home';
import Login from './Components/pages/Login';
import Register from './Components/pages/Register';
import SavedQuotes from './Components/pages/SavedQuotes';
function App() {
  return (
    <div className="App">
          <Router>
      <Navbar />
      <div className="p-4 max-w-3xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/saved" element={<SavedQuotes />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
