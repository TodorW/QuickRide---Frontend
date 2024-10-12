import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import MyProfile from "./components/profile/MyProfile"; // Import MyProfile component
import EditProfile from "./components/profile/EditProfile";
import Home from "./components/home/Home";
import ReviewForm from "./components/reviews/ReviewForm";
import Car from "./components/single-car/Car";
import ReserveCar from "./components/reserve-car/ReserveCar";
import Dashboard from "./components/dashboard/Dashboard";
import ReservationStatus from "./components/status/ReservationStatus";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/car/:id" element={<Car />} />
        <Route path="/car-reserve/:id" element={<ReserveCar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-review" element={<ReviewForm />} />
        <Route path="/reservation/status/:id" element={<ReservationStatus />} />
      </Routes>
    </Router>
  );
}

export default App;
