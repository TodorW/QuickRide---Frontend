import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService, UserService } from "../../api/api";
import {
  HomeIcon,
  PencilIcon,
  ArrowLeftOnRectangleIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/solid";

const MyProfile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await UserService.GetProfile();
        setUser(response.data.user);
      } catch (error) {
        setError("Error fetching user profile");
      }
    };

    fetchProfile();
  }, []);

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
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-900 px-6 py-12 lg:px-8 text-white">
      <div className="mb-6">
        <button
          onClick={handleGoBack}
          className="flex items-center text-gray-900 dark:text-white bg-indigo-600 px-4 py-2 rounded-md shadow-md hover:bg-indigo-700 transition-colors duration-300"
        >
          <ArrowLeftIcon className="h-6 w-6" />
          <span className="ml-2">Go Back</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-lg bg-gray-800 p-6 rounded-md shadow-md">
        <h2 className="text-center text-2xl font-bold mb-8">My Profile</h2>

        {/* Basic Information */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Basic Information</h3>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>

        {/* Buttons for Editing and Logging Out */}
        <div className="flex flex-col space-y-4 mt-6">
          <button
            onClick={handleEditProfile}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md flex items-center"
          >
            <PencilIcon className="h-6 w-6 mr-2" />
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md flex items-center"
          >
            <ArrowLeftOnRectangleIcon className="h-6 w-6 mr-2" />
            Logout
          </button>
          <button
            onClick={handleGoHome}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md flex items-center"
          >
            <HomeIcon className="h-6 w-6 mr-2" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
