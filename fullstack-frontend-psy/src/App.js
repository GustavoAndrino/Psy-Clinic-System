import React, { useState } from 'react';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Navabar } from './layout/Navabar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ViewPacients } from './requests/ViewPacients';
import { SessionsList } from './requests/SessionsList';
import { AddNewPacients } from './requests/AddNewPacients';
import Login from './pages/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <Router>
        {isLoggedIn && <Navabar />}
        <Routes>
          <Route exact path="/" element={isLoggedIn ? <Home /> : <Login onLogin={handleLogin} />} />
          <Route exact path="/viewPacient/:id" element={isLoggedIn ? <ViewPacients /> : <Login onLogin={handleLogin} />} />
          <Route exact path="/sessionsList" element={isLoggedIn ? <SessionsList /> : <Login onLogin={handleLogin} />} />
          <Route exact path="/AddNewPacients" element={isLoggedIn ? <AddNewPacients /> : <Login onLogin={handleLogin} />} />
          <Route exact path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
