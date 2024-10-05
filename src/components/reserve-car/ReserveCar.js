import { useEffect, useState } from "react";
import { CarService, ReservationService, UserService } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../layout/Header";

const ReserveCar = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [car, setCar] = useState([]);
  const [user, setUser] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

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

  const handleSendReservations = async () => {
    if (!car || !startDate || !endDate) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const reservationData = {
      car_id: car.id,
      user_id: user.id,
      start_date: startDate,
      end_date: endDate,
    };

    try {
      const response = await ReservationService.StoreReservation(
        reservationData
      );
      console.log("API Response", response);
    } catch (error) {
      console.log("Error sending ratings:", error);
    }
  };

  const checkAvailability = async () => {
    const availabilityData = {
      car_id: car.id,
      start_date: startDate,
      end_date: endDate,
    };

    try {
      const response = await CarService.GetAvailability(availabilityData);
      console.log("API Response", response);
    } catch (error) {
      console.log("Error sending ratings:", error);
    }
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

  useEffect(() => {
    calculateTotalPrice();
  }, [startDate, endDate]);

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
            value={car}
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

        {totalPrice !== null && (
          <div className="mt-4 text-lg">
            <p>Total price: ${totalPrice}</p>
          </div>
        )}

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
