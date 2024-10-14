import { useEffect, useState } from "react";
import { ReservationService, UserService, CarService } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { addYears } from "date-fns";
import Header from "../layout/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import PopUpSuccess from "../PopUpSucces";
import PopUpError from "../PopUpError";

const EditReservation = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [reservedDates, setReservedDates] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [reservation, setReservation] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [car, setCar] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await ReservationService.ShowReservation(id);
        setReservation(response.data.reservation);
        setCar(response.data.reservation.car); // Set car from the reservation
        setStartDate(new Date(response.data.reservation.start_date)); // Set start date
        setEndDate(new Date(response.data.reservation.end_date)); // Set end date
      } catch (error) {
        console.error("Error fetching reservation:", error);
        setErrorMessage("Failed to fetch reservation details.");
        setShowErrorPopup(true);
      }
    };
    fetchReservation();
  }, [id]);

  const handleSendReservations = async () => {
    if (!startDate || !endDate || !car) return;

    const formattedStartDate = startDate.toISOString().split("T")[0];
    const formattedEndDate = endDate.toISOString().split("T")[0];

    const reservationData = {
      start_date: formattedStartDate,
      end_date: formattedEndDate,
    };

    try {
      await ReservationService.UpdateReservation(id, reservationData);
      setSuccessMessage("Reservation is pending!");
      setShowSuccessPopup(true);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Error updating reservation."
      );
      setShowErrorPopup(true);
    }
  };

  const calculateTotalPrice = () => {
    if (startDate && endDate && car) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const total = diffDays * car.price_per_day;
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [startDate, endDate, car]);

  useEffect(() => {
    const fetchReservedDates = async () => {
      if (car) {
        try {
          const response = await ReservationService.ListCarsReservedDates(
            car.id
          );
          setReservedDates(response.data.reserved_dates);
        } catch (error) {
          console.error("Error fetching reserved dates:", error);
        }
      }
    };
    fetchReservedDates();
  }, [car]);

  const isDateDisabled = (date) => {
    const selectedDate = new Date(date);
    return reservedDates.some((reservedDate) => {
      const formattedReservedDate = new Date(reservedDate);
      return (
        selectedDate.getFullYear() === formattedReservedDate.getFullYear() &&
        selectedDate.getMonth() === formattedReservedDate.getMonth() &&
        selectedDate.getDate() === formattedReservedDate.getDate()
      );
    });
  };

  const today = new Date();
  const maxDate = addYears(today, 1);
  const isReserveButtonDisabled = !startDate || !endDate || !car;

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      <Header />
      <div className="pt-4 pl-4 mb-6">
        <button
          onClick={handleGoBack}
          className="flex items-center text-gray-900 dark:text-white bg-indigo-600 px-4 py-2 rounded-md shadow-md hover:bg-indigo-700 transition-colors duration-300"
        >
          <ArrowLeftIcon className="h-6 w-6" />
          <span className="ml-2">Go Back</span>
        </button>
      </div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Edit Reservation</h1>

        <div className="mb-4">
          <label
            htmlFor="start_date"
            className="block mb-2 text-sm font-medium"
          >
            Start date:
          </label>
          <DatePicker
            id="start_date"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            minDate={today}
            maxDate={maxDate}
            filterDate={isDateDisabled}
            className="block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md"
            placeholderText="Select start date"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="end_date" className="block mb-2 text-sm font-medium">
            End date:
          </label>
          <DatePicker
            id="end_date"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={startDate || today}
            maxDate={maxDate}
            filterDate={isDateDisabled}
            className="block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md"
            placeholderText="Select end date"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        {totalPrice > 0 && (
          <div className="mt-4 text-lg">
            <p>Total price: ${totalPrice}</p>
            <p className="mt-2 text-sm text-gray-400">
              Note: Each reservation starts on the day at 11 AM, and the vehicle
              must be returned by 9 AM on the return day.
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={handleSendReservations}
          className={`w-full px-4 py-2 rounded-md text-white transition-opacity duration-300 
              bg-indigo-600 hover:bg-indigo-700 transition duration-200
          `}
        >
          Reserve
        </button>

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
      </div>
    </div>
  );
};

export default EditReservation;
