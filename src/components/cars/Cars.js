import { useNavigate } from "react-router-dom";
import { CarService } from "../../api/api";
import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(10);

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

  const totalCars = cars.length;
  const totalPages = Math.ceil(totalCars / carsPerPage);

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
                  src={`http://tim1.cortexakademija.com/storage/cars-images/${car.image}`}
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
                  Price per day: ${car.price_per_day}
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

        {/* Pagination Section */}
        <div className="mt-8 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing{" "}
                <span className="font-medium">{indexOfFirstCar + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastCar, totalCars)}
                </span>{" "}
                of <span className="font-medium">{totalCars}</span> results
              </p>
            </div>
            <div>
              <nav
                aria-label="Pagination"
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              >
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                      currentPage === index + 1
                        ? "bg-indigo-600 text-white"
                        : "text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                    currentPage === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-12"></div>
      </div>
    </div>
  );
};

export default Cars;
