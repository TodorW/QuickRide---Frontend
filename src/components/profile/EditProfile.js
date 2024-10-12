import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure axios is installed
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const EditProfile = () => {
  const navigate = useNavigate();

  // Initial state for form inputs
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = "1|jz6Ppzv0RF2Rku9R7KQVzIhQ8M5letNhGKSsdxAP296d2314"; // Your token
        const response = await axios.get("http://127.0.0.1:8000/api/user", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const { name, email } = response.data;
        setUser((prevUser) => ({ ...prevUser, name, email }));
      } catch (error) {
        console.error(
          "Error fetching user profile:",
          error.response?.data || error.message
        );
        setError("Error fetching user profile");
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.password_confirmation) {
      setError("Passwords do not match");
      return;
    }

    try {
      const token = "1|jz6Ppzv0RF2Rku9R7KQVzIhQ8M5letNhGKSsdxAP296d2314"; // Your token
      console.log("Sending update request with data:", user);

      const response = await axios.put(
        "http://127.0.0.1:8000/api/user",
        {
          name: user.name,
          email: user.email,
          password: user.password,
          password_confirmation: user.password_confirmation,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Profile updated successfully");
      console.log("Profile updated:", response.data);
      navigate("/my-profile"); // Redirect after successful update
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data || error.message
      );
      setError("Error updating profile");
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-900 px-6 py-12 lg:px-8 text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg bg-gray-800 p-6 rounded-md shadow-md">
        <button
          onClick={handleGoBack}
          className="absolute top-4 left-4 flex items-center text-gray-900 dark:text-white bg-indigo-600 px-4 py-2 rounded-md shadow-md hover:bg-indigo-700 transition-colors duration-300"
        >
          <ArrowLeftIcon className="h-6 w-6" />
          <span className="ml-2">Go Back</span>
        </button>

        <h2 className="text-center text-2xl font-bold mb-8">Edit Profile</h2>

        {error && <div className="mb-4 text-red-500">{error}</div>}
        {success && <div className="mb-4 text-green-500">{success}</div>}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
            />
          </div>

          {/* Password Confirmation */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Confirm Password
            </label>
            <input
              type="password"
              name="password_confirmation"
              value={user.password_confirmation}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
