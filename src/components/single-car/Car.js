import { useState, useEffect } from "react";
//import { StarIcon } from "@heroicons/react/20/solid";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Header from "../layout/Header";
import { CarService } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CarAvailabilityCalendar from "./CarAvailabilityCalendar";

const Car = () => {
  const [car, setCar] = useState([]);
  const [startDate, setStartDate] = useState(null); // Početni datum rezervacije
  const [endDate, setEndDate] = useState(null); // Krajnji datum rezervacije
  const [reservedDates, setReservedDates] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await CarService.GetCar(id);
        setCar(response.data.car);
      } catch (error) {
        console.log("Error fetching cars:", error);
      }
    };

    const fetchReservedDates = async () => {
      try {
        const response = await CarService.GetReservedDates(id);
        setReservedDates(response.data.reserved_dates);
      } catch (error) {
        console.log("Error fetching reserved dates:", error);
      }
    };

    fetchCar();
    fetchReservedDates();
  }, [id]);

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      <Header />
      <div className="pt-4 pl-4">
        <button onClick={handleGoBack} className="flex items-center text-white">
          <ArrowLeftIcon className="h-6 w-6" />
          <span className="ml-2">Go Back</span>
        </button>
      </div>
      <div className="pt-6 pb-4">
        {/* Main content: image left, details right */}
        <div className="mx-auto mt-6 max-w-7xl lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Image on the left */}
          <div className="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg">
            <img
              src={`http://tim1.cortexakademija.com/storage/cars-images/${car.image}`}
              alt={`${car.make} ${car.model}`}
              className="w-full h-auto object-contain"
            />

            <CarAvailabilityCalendar carId={car.id} />
          </div>

          {/* Product info on the right */}
          <div className="mt-4 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">
              {car.make} {car.model}
            </h1>
            <p className="text-2xl tracking-tight text-indigo-500 mt-2">
              {car.year}
            </p>
            <p className="text-3xl tracking-tight text-gray-100 mt-4">
              ${car.price_per_day} / day
            </p>

            {/* Reviews */}
            {/* ... existing review code ... */}

            {/* Product Specifications */}
            <div className="mt-8 grid grid-cols-2 gap-6 text-gray-300">
              <div>
                <h3 className="text-sm font-medium text-gray-100">Make</h3>
                <p className="mt-1">{car.make}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-100">Model</h3>
                <p className="mt-1">{car.model}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-100">Year</h3>
                <p className="mt-1">{car.year}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-100">
                  Transmission
                </h3>
                <p className="mt-1">{car.transmission}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-100">Fuel Type</h3>
                <p className="mt-1">{car.fuel_type}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-100">Doors</h3>
                <p className="mt-1">{car.doors}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-100">
                  Price per Day
                </h3>
                <p className="mt-1">${car.price_per_day}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-100">Status</h3>
                <p className="mt-1">
                  {car.status ? car.status : "No status available"}
                </p>
              </div>
            </div>

            {/* Product description */}
            <div className="mt-10">
              <h3 className="text-lg font-medium text-gray-100">Description</h3>
              <p className="mt-4 text-base text-gray-300">{car.description}</p>
            </div>

            {/* Reserve button */}
            <button
              onClick={() => navigate(`/car-reserve/${car.id}`)}
              className="w-full px-4 py-2 mt-8 text-lg font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Reserve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Car;
