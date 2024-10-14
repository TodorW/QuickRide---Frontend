import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ReservationService } from "../../api/api";
import PopupSuccess from "../PopUpSucces";

const ReservationCancel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [message, setMessage] = useState("");

  const handleCancelReservation = async () => {
    try {
      await ReservationService.CancelReservation(id);
      setMessage("Reservation canceled successfully!");
      setShowSuccessPopup(true);

      setTimeout(() => {
        setShowSuccessPopup(false);
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      setMessage("Failed to cancel reservation. Please try again.");
      setShowSuccessPopup(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-center">
          Cancel Reservation
        </h2>
        <p className="mb-4 text-center">
          Are you sure you want to cancel reservation ID: {id}?
        </p>
        <div className="flex justify-between">
          <button
            onClick={handleCancelReservation}
            className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition duration-200"
          >
            Cancel Reservation
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 text-sm font-semibold text-white bg-gray-600 rounded-md hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 transition duration-200"
          >
            Back
          </button>
        </div>
      </div>
      {showSuccessPopup && (
        <PopupSuccess
          open={showSuccessPopup}
          message={message}
          onClose={() => setShowSuccessPopup(false)}
        />
      )}
    </div>
  );
};

export default ReservationCancel;
