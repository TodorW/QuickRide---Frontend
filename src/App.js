import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/SignUp";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<h1>Welcome to the Home Page</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
