import { useEffect, useState } from "react";
import { CarService, ReservationService, UserService } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { addYears, format } from "date-fns";
import Header from "../layout/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ConfirmReservation from "../confirm-reservation/ConfirmReservation";
import { useDispatch } from "react-redux";
import { setReservationData } from "../../redux/reservationSlice";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const ReserveCar = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [car, setCar] = useState([]);
  const [user, setUser] = useState([]);
  const [reservedDates, setReservedDates] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await CarService.GetCar(id);
        console.log(response.data);
        setCar(response.data.car);
      } catch (error) {
        console.log("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await UserService.GetProfile();
        setUser(response.data.user);
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleSendReservations = () => {
    dispatch(
      setReservationData({
        car,
        user,
        startDate: startDate ? startDate.toISOString() : null,
        endDate: endDate ? endDate.toISOString() : null,
        totalPrice,
        reservedDates,
      })
    );
    setIsModalOpen(true);
  };

  const calculateTotalPrice = () => {
    if (startDate && endDate) {
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

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [startDate, endDate]);

  useEffect(() => {
    const fetchReservedDates = async () => {
      try {
        const response = await ReservationService.ListCarsReservedDates(car.id);
        setReservedDates(response.data.reserved_dates);
        console.log(reservedDates);
      } catch (error) {
        console.log("Error fetching reserved dates:", error);
      }
    };
    fetchReservedDates();
  }, [car.id]);

  const isDateDisabled = (date) => {
    const selectedDate = new Date(date);

    return !reservedDates.some((reservedDate) => {
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

  const isReserveButtonDisabled = !startDate || !endDate || !car.id;

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      <Header />
      <div className="relative">
        <button
          onClick={handleGoBack}
          className="absolute top-4 left-4 flex items-center text-gray-900 dark:text-white bg-indigo-600 px-4 py-2 rounded-md shadow-md hover:bg-indigo-700 transition-colors duration-300"
        >
          <ArrowLeftIcon className="h-6 w-6" />
          <span className="ml-2">Go Back</span>
        </button>
      </div>
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
            disabled
          >
            <option key={car.id} value={car.id}>
              {car.make} {car.model} - ${car.price_per_day} per day
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
          <DatePicker
            id="start_date"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            minDate={new Date()}
            maxDate={maxDate}
            filterDate={isDateDisabled}
            className="block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md"
            placeholderText="Select start date"
            showTimeSelect
            dateFormat="yyyy-MM-dd HH:mm:ss"
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
            minDate={startDate || new Date()}
            maxDate={maxDate}
            filterDate={isDateDisabled}
            className="block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md"
            placeholderText="Select end date"
            showTimeSelect
            dateFormat="yyyy-MM-dd HH:mm:ss"
          />
        </div>

        {totalPrice !== null && (
          <div className="mt-4 text-lg">
            <p>Total price: ${totalPrice}</p>
          </div>
        )}

        <button
          onClick={handleSendReservations}
          disabled={isReserveButtonDisabled}
          className={`w-full px-4 py-2 rounded-md text-white transition-opacity duration-300 ${
            isReserveButtonDisabled
              ? "bg-gray-600 cursor-not-allowed opacity-50"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          Reserve
        </button>
        {isModalOpen && (
          <>
            <ConfirmReservation open={isModalOpen} setOpen={setIsModalOpen} />
          </>
        )}
      </div>
    </div>
  );
};

export default ReserveCar;
