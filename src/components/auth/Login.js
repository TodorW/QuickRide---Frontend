import React, { useState } from 'react';
import PopUpLogin from '../PopUpLogin'; // Ensure this path is correct

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [popupOpen, setPopupOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.status === 422) {
        // Open the popup for incorrect credentials
        setPopupOpen(true);
      } else {
        const contentType = response.headers.get('Content-Type');

        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          console.log(data);
        } else {
          // Handle unexpected response (e.g., HTML)
          console.error('Unexpected response:', await response.text());
          setPopupOpen(true);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setPopupOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-gray-800 p-6 rounded-md shadow-md">
        <img
          alt="Your Company"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
          {/* Input for email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md border-0 py-3 px-4 bg-gray-700 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          {/* Input for password */}
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-3 px-4 bg-gray-700 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Submit button */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>

      {/* Popup Component */}
      <PopUpLogin open={popupOpen} onClose={() => setPopupOpen(false)} />
    </div>
  );
};

export default Login;