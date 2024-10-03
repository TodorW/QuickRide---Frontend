import { useNavigate } from "react-router-dom";
import { CarService } from "../../api/api";
import { useState, useEffect } from "react";

const Cars = () => {
  const [cars, setCars] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await CarService.ListCars();
        console.log(response.data);
        setCars(response.data.cars);
      } catch (error) {
        console.log("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  return (
    <div className="min-h-screen py-12 transition-colors duration-300 bg-gray-100 dark:bg-gray-900">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-extrabold text-gray-900 dark:text-white animate-fade-in">
          Discover Cars
        </h1>

        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {cars.map((car, index) => (
            <div
              key={car.id}
              className="overflow-hidden transition duration-300 transform bg-white rounded-lg shadow-md group dark:bg-gray-800 hover:scale-105 hover:shadow-xl animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-w-2 aspect-h-3">
                <img
                  src={`http://127.0.0.1:8000/storage/cars-images/${car.image}`}
                  alt={`${car.make} ${car.model}`}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  style={{
                    width: "300px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="px-4 py-3 mt-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {car.make} {car.model}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {car.year} - {car.transmission} - {car.fuel_type}
                </p>
                <p className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Cena po danu: ${car.price_per_day}
                </p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {car.description}
                </p>
                <button
                  onClick={() => navigate(`/car/${car.id}`)}
                  className="w-full px-4 py-2 mt-4 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                >
                  Details
                </button>
                <button
                  onClick={() => navigate(`/car-reserve/${car.id}`)}
                  className="w-full px-4 py-2 mt-4 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                >
                  Reserve
                </button>
              </div>
            </div>
          ))}
        </div>

        {cars.length === 0 && (
          <div className="text-center animate-fade-in">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No available cars.
            </p>
          </div>
        )}

        <div className="mt-12"></div>
      </div>
    </div>
  );
};

export default Cars;
