import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../api/api";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const EditProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    gender: "",
    birthDate: "",
    privacy: "",
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await UserService.GetProfile();
        setUser(response.data.user);
      } catch (error) {
        console.log("Error fetching user profile:", error);
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
    try {
      const response = await UserService.UpdateProfile(user);
      console.log("Profile updated successfully:", response.data);
      navigate("/my-profile"); // Redirect to the profile page after update
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Error updating profile");
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-900 px-6 py-12 lg:px-8 text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg bg-gray-800 p-6 rounded-md shadow-md">
        <button
          onClick={handleGoBack}
          className="absolute top-4 left-4 flex items-center text-white"
        >
          <ArrowLeftIcon className="h-6 w-6" />
          <span className="ml-2">Go Back</span>
        </button>

        <h2 className="text-center text-2xl font-bold mb-8">Edit Profile</h2>
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

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
            />
          </div>

          {/* Bio */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Bio</label>
            <textarea
              name="bio"
              value={user.bio}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
            />
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Gender
            </label>
            <select
              name="gender"
              value={user.gender}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Birth Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Birth Date
            </label>
            <input
              type="date"
              name="birthDate"
              value={user.birthDate}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
            />
          </div>

          {/* Privacy Settings */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Privacy Settings
            </label>
            <select
              name="privacy"
              value={user.privacy}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
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
