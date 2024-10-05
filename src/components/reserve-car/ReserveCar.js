import { useState, useEffect } from "react";
import { ReservationService } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../layout/Header";

const ReserveCar = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const selectedCar = useSelector((state) => state.car.selectedCar);
  const selectedUser = useSelector((state) => state.profile.selectedUser);
  const userId = useSelector((state) => state.profile.id);

  const handleSendReservations = async () => {
    if (!selectedCar || !startDate || !endDate) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const reservationData = { carId: selectedCar.id };

    try {
      const response = await ReservationService.StoreReservation(
        reservationData
      );
      console.log("API Response", response);
    } catch (error) {
      console.log("Error sending ratings:", error);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Reserve a Car</h1>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <div className="mb-4">
          <label htmlFor="car" className="block mb-2 text-sm font-medium">
            Choose a car:
          </label>
          <select
            id="car"
            className="block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md"
            value={selectedCar}
          >
            <option key={selectedCar?.id} value={selectedCar?.id}>
              {selectedCar?.make} {selectedCar?.model} - $
              {selectedCar?.price_per_day} per day
            </option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="start_date"
            className="block mb-2 text-sm font-medium"
          >
            Start date:
          </label>
          <input
            type="date"
            id="start_date"
            className="block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="end_date" className="block mb-2 text-sm font-medium">
            End date:
          </label>
          <input
            type="date"
            id="end_date"
            className="block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <button
          onClick={handleSendReservations}
          className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white"
        >
          Reserve
        </button>
      </div>
    </div>
  );
};

export default ReserveCar;
