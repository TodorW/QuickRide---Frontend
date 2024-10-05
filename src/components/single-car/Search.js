import React, { useState } from "react";
import { CarService } from "../../api/api"; // Uvezi API servis

const Search = ({ setCars }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    try {
      const response = await CarService.SearchCars(searchTerm); // Očekuje se da postoji funkcija SearchCars u CarService
      setCars(response.data.cars); // Postavljanje rezultata pretrage
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a car..."
        className="p-2 border rounded"
      />
      <button
        onClick={handleSearch}
        className="ml-2 p-2 bg-indigo-600 text-white rounded"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
