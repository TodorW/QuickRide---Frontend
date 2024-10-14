import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import { ReservationService } from "../../api/api";
import { useParams } from "react-router-dom";
import PopUpSuccess from "../PopUpSucces";
import PopUpError from "../PopUpError";

const EditReservation = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [reservation, setReservation] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { id } = useParams();

  const handleUpdateReservation = async (e) => {
    e.preventDefault();

    const updatedData = {
      start_date: `${startDate} 11:00:00`,
      end_date: `${endDate} 09:00:00`,
    };

    try {
      await ReservationService.UpdateReservation(id, updatedData);
      setShowSuccessPopup(true);
      setSuccessMessage("Reservation updated successfully!");
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error.response?.data?.message || "Error updating reservation"
      );
      setShowErrorPopup(true);
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="max-w-md w-full p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-4">
            Edit Reservation
          </h2>
          <p className="text-gray-400 mb-4">
            Change the reservation dates. Time will remain fixed at 11:00 AM for
            the start and 09:00 AM for the end.
          </p>
          <form>
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="start-date">
                Start Date:
              </label>
              <input
                type="date"
                id="start-date"
                className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="end-date">
                End Date:
              </label>
              <input
                type="date"
                id="end-date"
                className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <button
              type="button"
              onClick={handleUpdateReservation}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
            >
              Update
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

export default EditReservation;
