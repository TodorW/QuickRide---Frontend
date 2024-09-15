import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './auth/Login.js';
import Signup from './auth/Signup.js';
import Logout from './auth/Logout.js';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<h1>Welcome to the Home Page</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;