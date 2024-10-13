import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthService } from "../../api/api";
import PopUpLogin from "../PopUpError";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const checkIfUserIsLoggedIn = () => {
    const token = localStorage.getItem("BearerToken");
    if (token) {
      navigate("home");
    }
  };

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  const createAccount = async (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      setPopupOpen(true);
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be longer than 8 characters.");
      setPopupOpen(true);
      return;
    }

    const registerUserData = {
      name: firstName,
      email: email,
      password: password,
      password_confirmation: confirmedPassword,
    };

    try {
      const response = await AuthService.register(registerUserData);
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setPopupOpen(true);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-900 px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <img
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Create your account
          </h2>
        </div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          action="#"
          method="POST"
          className="space-y-6"
          onSubmit={createAccount}
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-200"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                required
                onChange={(e) => setFirstName(e.target.value)}
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-100 bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-200"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-100 bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-200"
            >
              Password
            </label>
            <div className="mt-2 relative">
              <input
                id="password"
                name="password"
                autoComplete="current-password"
                type={passwordVisible ? "text" : "password"}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-100 bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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

          <div>
            <label
              htmlFor="confirm_password"
              className="block text-sm font-medium leading-6 text-gray-200"
            >
              Confirm Password
            </label>
            <div className="mt-2 relative">
              <input
                id="confirm_password"
                name="confirm_password"
                type={confirmPasswordVisible ? "text" : "password"}
                required
                autoComplete="current-password"
                onChange={(e) => setConfirmedPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-100 bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
              >
                {confirmPasswordVisible ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>

      <p className="mt-6 text-center text-sm text-gray-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-indigo-400 hover:text-indigo-300"
        >
          Sign in
        </Link>
      </p>

      <PopUpLogin
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        message={errorMessage}
      />
    </div>
  );
};

export default SignUp;
