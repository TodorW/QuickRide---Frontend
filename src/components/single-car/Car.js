import { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import Header from "../layout/Header";
import { CarService } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedCar } from "../../redux/carSlice";

const Car = () => {
  const [car, setCar] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await CarService.GetCar(id);
        console.log(response.data);
        setCar(response.data.car);
        dispatch(setSelectedCar(response.data.car));
      } catch (error) {
        console.log("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  const availabilityText = car.availability ? "Available" : "Not Available";

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      <Header />
      <div className="pt-6 pb-4">
        {/* Breadcrumb */}
        {/* <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li className="text-sm">
              <a
                href={car.make}
                aria-current="page"
                className="font-medium text-gray-400 hover:text-gray-300"
              >
                {car.make} {car.model}
              </a>
            </li>
          </ol>
        </nav> */}

        {/* Main content: image left, details right */}
        <div className="mx-auto mt-6 max-w-7xl lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Image on the left */}
          <div className="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg">
            <img
              src={`http://127.0.0.1:8000/storage/cars-images/${car.image}`}
              alt={`${car.make} ${car.model}`}
              className="w-full h-auto object-contain"
            />
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

            {/* Reviews
            <div className="mt-6">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(
                        reviews.average > rating
                          ? "text-gray-100"
                          : "text-gray-600",
                        "h-5 w-5 flex-shrink-0"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div> */}

            {/* Product Availability
            <div className="mt-4">
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold text-white ${
                  car.availability ? "bg-green-600" : "bg-red-600"
                }`}
              >
                {availabilityText}
              </span>
            </div> */}

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
            {/*
            <h3 className="text-sm font-medium text-gray-100 mt-10">
              Highlights
            </h3>
             <ul className="list-disc pl-4 text-sm text-gray-300 mt-4">
                {product.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul> */}
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
