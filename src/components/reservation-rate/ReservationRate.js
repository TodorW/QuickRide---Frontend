import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import { RatingService, ReservationService } from "../../api/api";
import { useParams } from "react-router-dom";
import PopUpSuccess from "../PopUpSucces";
import PopUpError from "../PopUpError";

const ReservationRate = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [reservation, setReservation] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await ReservationService.ShowReservation(id);
        setReservation(response.data.reservation);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReservation();
  }, [id]);

  const handleSendRatings = async (e) => {
    e.preventDefault();

    const ratingData = {
      rating: rating,
      comment: review,
    };

    try {
      await RatingService.StoreRating(ratingData, id, reservation.car_id);
      setShowSuccessPopup(true);
      setSuccessMessage("Rating added successfully!");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.message);
      setShowErrorPopup(true);
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="max-w-md w-full p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-4">
            Rate our service
          </h2>
          <p className="text-gray-400 mb-4">
            Please rate the quality of our service by clicking on the stars.
          </p>
          <form>
            <div className="flex items-center mb-4">
              <span className="text-white mr-2">Quality of Service:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`cursor-pointer text-3xl transition duration-200 ${
                    star <= rating ? "text-indigo-500" : "text-gray-400"
                  } hover:text-indigo-400`}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>{" "}
            <p className="mt-2 text-sm text-gray-400">
              Review is optional, but we appreciate your feedback!
            </p>
            <textarea
              className="w-full p-3 border border-gray-600 rounded-lg mb-4 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              rows="4"
              placeholder="Leave your review..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <button
              type="button"
              onClick={handleSendRatings}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
            >
              Send
            </button>
          </form>
        </div>
      </div>
      <PopUpError
        open={showErrorPopup}
        onClose={() => setShowErrorPopup(false)}
        message={errorMessage}
      />

      <PopUpSuccess
        open={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
        message={successMessage}
      />
    </>
  );
};

export default ReservationRate;
