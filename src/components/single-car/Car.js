import { useState, useEffect } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Header from "../layout/Header";
import { CarService, RatingService } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import CarAvailabilityCalendar from "./CarAvailabilityCalendar";

const Car = () => {
  const [car, setCar] = useState({});
  const [reservationIds, setReservationIds] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
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
        setReservationIds(response.data.reservation_ids);
      } catch (error) {
        console.log("Error fetching car:", error);
      }
    };

    fetchCar();
  }, [id]);

  useEffect(() => {
    if (reservationIds.length > 0) {
      const fetchRatingsAndReviews = async () => {
        try {
          const response = await RatingService.GetRatings(reservationIds);
          const ratingsData = response.data.ratings;

          setRatings(ratingsData);

          const average =
            ratingsData.reduce((sum, rating) => sum + rating.rating, 0) /
            ratingsData.length;

          setAverageRating(average);
        } catch (error) {
          console.log("Error fetching ratings:", error);
        }
      };

      fetchRatingsAndReviews();
    }
  }, [reservationIds]);

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
              className="w-full px-4 py-2 mt-8 text-lg font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition duration-200"
            >
              Reserve
            </button>

            {/* Ratings and Reviews */}
            <div className="mt-10 px-4 sm:px-6 lg:px-8 mx-auto max-w-4xl">
              {ratings.length > 0 ? (
                <h3 className="text-2xl font-semibold text-center text-gray-100">
                  Average Rating:{" "}
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`${
                        star <= averageRating
                          ? "text-indigo-500"
                          : "text-indigo-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  ({averageRating.toFixed(1)})
                </h3>
              ) : (
                <p className="text-2xl font-semibold text-center text-gray-100">
                  No ratings yet.
                </p>
              )}

              <div className="space-y-6 review-list mt-8 mx-auto max-w-4xl">
                {ratings.length > 0 ? (
                  ratings.map((rating, index) => (
                    <div
                      key={index}
                      className="p-6 transition-all duration-300 bg-gray-800 rounded-lg shadow dark:bg-gray-700 hover:shadow-lg"
                    >
                      <p className="mb-4 text-lg text-gray-300 dark:text-gray-200">
                        "{rating.comment}"
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        By: {rating.user_name} from {rating.start_date} to{" "}
                        {rating.end_date}
                      </p>
                      <p className="text-sm text-indigo-500 mt-2">
                        {rating.rating} ★
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-100 text-center">No reviews yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Car;
