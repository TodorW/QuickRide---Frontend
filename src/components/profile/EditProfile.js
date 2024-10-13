import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import PopUpError from "../PopUpError";
import PopUpSuccess from "../PopUpSucces";
import { UserService } from "../../api/api";

const EditProfile = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isPopUpOpenError, setIsPopUpOpenError] = useState(false);
  const [isPopUpOpenSuccess, setIsPopUpOpenSuccess] = useState(false);

  const handleEditProfile = async () => {
    if (!name || !email || !password || !passwordConfirmation) {
      setErrorMessage("All fields are required.");
      setIsPopUpOpenError(true);
      return;
    }

    if (password !== passwordConfirmation) {
      setErrorMessage("Passwords do not match.");
      setIsPopUpOpenError(true);
      return;
    }

    const userData = {
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    };

    try {
      await UserService.EditProfile(userData);
      setSuccessMessage("Profile updated successfully!");
      setIsPopUpOpenSuccess(true);
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setIsPopUpOpenError(true);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-900 px-6 py-12 lg:px-8 text-white">
      <div className="mb-2">
        <button
          onClick={handleGoBack}
          className="flex items-center text-gray-900 dark:text-white bg-indigo-600 px-4 py-2 rounded-md shadow-md hover:bg-indigo-700 transition-colors duration-300 mt-2"
        >
          <ArrowLeftIcon className="h-6 w-6" />
          <span className="ml-2">Go Back</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-lg bg-gray-800 p-6 rounded-md shadow-md">
        <h2 className="text-center text-2xl font-bold mb-8">Edit Profile</h2>

        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Confirm Password
            </label>
            <input
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 rounded-md"
            />
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={handleEditProfile}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <PopUpError
        open={isPopUpOpenError}
        onClose={() => setIsPopUpOpenError(false)}
        message={errorMessage}
      />

      <PopUpSuccess
        open={isPopUpOpenSuccess}
        onClose={() => setIsPopUpOpenSuccess(false)}
        message={successMessage}
      />
    </div>
  );
};

export default EditProfile;
