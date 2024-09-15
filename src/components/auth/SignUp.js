import React, { useState } from "react";
import { AuthService } from "../../api/api";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const navigate = useNavigate(); // Dodajemo useNavigate

  const showAccount = async (e) => {
    e.preventDefault();

    const registerUserData = {
      name: firstName,
      email: email,
      password: password,
      password_confirmation: confirmedPassword,
    };

    const loginUserData = {
      email: email,
      password: password,
    };

    try {
      const response = await AuthService.register(registerUserData);
      console.log("API Response", response);

      // Nakon uspešne registracije, automatski preusmeravamo korisnika na login stranicu
      navigate('/login');
    } catch (error) {
      console.error("Error calling registration API", error);
    }

    try {
      const response = await AuthService.login(loginUserData);
      console.log("API Response", response);
    } catch (error) {
      console.error("Error calling login API", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900 text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-gray-800 p-6 rounded-md shadow-md">
        <img
          alt="Your Company"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          action="#"
          method="POST"
          className="space-y-6 bg-gray-800 p-6 rounded-md shadow-md"
          onSubmit={showAccount}
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                required
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                className="block w-full rounded-md border-0 py-3 px-4 bg-gray-700 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
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
                autoComplete="email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="block w-full rounded-md border-0 py-3 px-4 bg-gray-700 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                autoComplete="current-password"
                type="password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="block w-full rounded-md border-0 py-3 px-4 bg-gray-700 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="confirm_password"
                className="block text-sm font-medium leading-6"
              >
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                required
                autoComplete="current-password"
                onChange={(e) => {
                  setConfirmedPassword(e.target.value);
                }}
                className="block w-full rounded-md border-0 py-3 px-4 bg-gray-700 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;