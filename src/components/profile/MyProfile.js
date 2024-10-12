import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux"; // Uklonjeno Redux
import { AuthService, UserService } from "../../api/api";
import { FaEdit, FaSignOutAlt, FaHome } from "react-icons/fa";
// import { setSelectedUser } from "../../redux/profileSlice"; // Uklonjeno Redux

const MyProfile = () => {
  // const dispatch = useDispatch(); // Uklonjeno Redux
  const navigate = useNavigate();
  // const profile = useSelector((state) => state.profile); // Uklonjeno Redux

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bio, setBio] = useState(""); // Lokalni state za bio

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await UserService.GetProfile();
        setUser(response.data.user);
        setBio(response.data.user.bio); // Postavljanje biografije
        // dispatch(setSelectedUser(response.data.user)); // Uklonjeno Redux
      } catch (error) {
        console.log("Error fetching user:", error);
        setError("Error fetching user profile");
      }
      setLoading(false);
    };

    fetchProfile();
  }, []); // Prazan niz znači da se useEffect pokreće samo jednom, pri mountanju komponente

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const handleLogout = async () => {
    try {
      const success = await AuthService.logout();
      if (success) {
        console.log("Logout successful");
        navigate("/login"); // Redirect to login on successful logout
      }
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  const handleGoHome = () => {
    navigate("/"); // Navigate to home page
  };

  if (loading) {
    return <div>Loading...</div>; // Prikazuje se dok se podaci učitavaju
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-900 px-6 py-12 lg:px-8 text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg bg-gray-800 p-6 rounded-md shadow-md">
        <h2 className="text-center text-2xl font-bold mb-8">My Profile</h2>

        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <img
            src={user.profileImage || "https://cdn-icons-png.flaticon.com/512/847/847969.png"} // Dodana fallback slika
            alt="Profile"
            className="h-24 w-24 rounded-full object-cover border-2 border-gray-600"
          />
        </div>

        {/* Basic Information */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Basic Information</h3>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
        {/* Contact Information */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Contact Information</h3>
          <p>Phone: {user.phone}</p>
          <p>Address: {user.address}</p>
        </div>
        {/* Bio */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Bio</h3>
          <p>{bio}</p>
        </div>
        {/* Additional Information */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Additional Information</h3>
          <p>Birth Date: {user.birthDate}</p>
          <p>Gender: {user.gender}</p>
          <p>Privacy Settings: {user.privacy}</p>
        </div>

        {/* Buttons for Editing and Logging Out */}
        <div className="flex flex-col space-y-4 mt-6">
          <button
            onClick={handleEditProfile}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md flex items-center"
          >
            <FaEdit className="mr-2" />
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md flex items-center"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
          <button
            onClick={handleGoHome}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md flex items-center"
          >
            <FaHome className="mr-2" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;