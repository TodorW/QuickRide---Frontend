import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import PopUpLogin from "../PopUpError";
import { AuthService } from "../../api/api";

const Login = () => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const checkIfUserIsLoggedIn = useCallback(() => {
    const token = localStorage.getItem("BearerToken");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, [checkIfUserIsLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      setPopupOpen(true);
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be longer than 8 characters");
      setPopupOpen(true);
      return;
    }

    const loginUserData = {
      email: email,
      password: password,
    };

    try {
      await AuthService.login(loginUserData);
      navigate("/home");
    } catch (error) {
      setErrorMessage(error.response.data.message || "An error occurred");
      setPopupOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center">
          {/* QuickRide Logo */}
          <h1 className="text-2xl font-bold text-indigo-500">QuickRide</h1>
        </div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-100 bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6"
              >
                Password
              </label>
            </div>
            <div className="mt-2 relative">
              <input
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-100 bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>
          </div>

          {/* Submit button */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-200"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>

      <p className="mt-6 text-center text-sm text-gray-400">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="font-semibold text-indigo-400 hover:text-indigo-300 "
        >
          Sign up
        </Link>
      </p>

      {/* Popup Component */}
      <PopUpLogin
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        message={errorMessage}
      />
    </div>
  );
};

export default Login;
