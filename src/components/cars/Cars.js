import { useNavigate } from "react-router-dom";
import { CarService } from "../../api/api";
import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    fuelType: "",
    transmission: "",
    yearRange: [1980, 2024],
    priceRange: [0, 200], // donja granica
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await CarService.ListCars();
        setCars(response.data.cars);
        setFilteredCars(response.data.cars);
      } catch (error) {
        console.log("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  useEffect(() => {
    const filtered = cars.filter((car) => {
      const matchesSearch =
        car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFuel = filters.fuelType
        ? car.fuel_type === filters.fuelType
        : true;
      const matchesTransmission = filters.transmission
        ? car.transmission === filters.transmission
        : true;
      const matchesYear =
        car.year >= filters.yearRange[0] && car.year <= filters.yearRange[1];
      const matchesPrice =
        car.price_per_day >= filters.priceRange[0] &&
        car.price_per_day <= filters.priceRange[1];

      return (
        matchesSearch &&
        matchesFuel &&
        matchesTransmission &&
        matchesYear &&
        matchesPrice
      );
    });
    setFilteredCars(filtered);
    setCurrentPage(1);
  }, [searchTerm, filters, cars]);

  const totalCars = filteredCars.length;
  const totalPages = Math.ceil(totalCars / carsPerPage);

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

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

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSliderChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`mx-1 p-2 text-sm font-medium border border-gray-700 rounded-md ${
            currentPage === i
              ? "bg-indigo-600 text-white"
              : "bg-gray-800 text-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="min-h-screen py-12 transition-colors duration-300 bg-gray-900 text-white">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-extrabold">Discover Cars</h1>

        {/* Search and Filter Section in One Row */}
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search cars..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Fuel Type Filter */}
          <select
            name="fuelType"
            value={filters.fuelType}
            onChange={handleFilterChange}
            className="p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Fuel Types</option>
            <option value="gasoline">Gasoline</option>
            <option value="diesel">Diesel</option>
            <option value="electricity">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>

          {/* Transmission Filter */}
          <select
            name="transmission"
            value={filters.transmission}
            onChange={handleFilterChange}
            className="p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Transmissions</option>
            <option value="manual">Manual</option>
            <option value="automatic">Automatic</option>
          </select>

          {/* Year Range Slider */}
          <div className="flex flex-col w-1/3">
            <label className="block mb-2 text-gray-300">
              Year Range: {filters.yearRange[0]} - {filters.yearRange[1]}
            </label>
            <input
              type="range"
              min="1980"
              max="2024"
              value={filters.yearRange[0]}
              onChange={(e) =>
                handleSliderChange("yearRange", [
                  Number(e.target.value),
                  filters.yearRange[1],
                ])
              }
              className="w-full h-2 bg-gray-700 rounded-lg cursor-pointer"
            />
          </div>

          {/* Price Range Slider */}
          <div className="flex flex-col w-1/3">
            <label className="block mb-2 text-gray-300">
              Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
            </label>
            <input
              type="range"
              min="0"
              max="200"
              value={filters.priceRange[0]}
              onChange={(e) =>
                handleSliderChange("priceRange", [Number(e.target.value), 200])
              }
              className="w-full h-2 bg-gray-700 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {currentCars.map((car, index) => (
            <div
              key={car.id}
              className="overflow-hidden transition duration-300 transform bg-gray-800 rounded-lg shadow-md group hover:scale-105 hover:shadow-xl"
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
                <h3 className="text-lg font-semibold group-hover:text-indigo-600">
                  {car.make} {car.model}
                </h3>
                <p className="mt-1 text-sm text-gray-400">
                  {car.year} - {car.transmission} - {car.fuel_type}
                </p>
                <p className="mt-1 text-sm font-medium text-gray-300">
                  Price per day: ${car.price_per_day}
                </p>
                <p className="mt-2 text-sm text-gray-400">{car.description}</p>
                <button
                  onClick={() => navigate(`/car/${car.id}`)}
                  className="w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  View Details
                </button>
                <button
                  onClick={() => navigate(`/car-reserve/${car.id}`)}
                  className="w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Reserve a car
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center mt-8 space-x-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="p-2 text-white transition-colors duration-300 bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>

          {/* Rendering page numbers */}
          {renderPageNumbers()}

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="p-2 text-white transition-colors duration-300 bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cars;
