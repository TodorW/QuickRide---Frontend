import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const ReviewForm = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Rating:", rating);
    console.log("Message:", message);
    setRating(0);
    setMessage("");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-6 flex flex-col justify-center sm:py-12">
      <button
        onClick={handleGoBack}
        className="absolute top-4 left-4 flex items-center text-white"
      >
        <ArrowLeftIcon className="h-6 w-6" />
        <span className="ml-2">Go Back</span>
      </button>
      <div className="py-3 sm:max-w-xl sm:mx-auto">
        <div className="bg-gray-800 min-w-1xl flex flex-col rounded-xl shadow-lg">
          <div className="px-12 py-5">
            <h2 className="text-white text-3xl font-semibold">
              Your opinion matters to us!
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-gray-700 w-full flex flex-col items-center"
          >
            <div className="flex flex-col items-center py-6 space-y-3">
              <span className="text-lg text-gray-300">
                How was the quality of the car?
              </span>
              <div className="flex space-x-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-12 h-12 ${
                      rating >= star ? "text-yellow-400" : "text-gray-500"
                    }`}
                    onClick={() => handleRatingClick(star)}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className="w-3/4 flex flex-col">
              <textarea
                rows="3"
                className="p-4 text-gray-200 bg-gray-600 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Leave a message, if you want"
                value={message}
                onChange={handleMessageChange}
              ></textarea>
              <button
                type="submit"
                className="py-3 my-8 text-lg bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white hover:bg-indigo-500 transition duration-200"
              >
                Rate now
              </button>
            </div>
          </form>
          <div className="h-20 flex items-center justify-center">
            <a href="/home" className="text-gray-400 hover:text-gray-300">
              Maybe later
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
