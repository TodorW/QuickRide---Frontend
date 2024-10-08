// U CarService.js
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/cars"; // Primer API URL

export const CarService = {
  GetAllCars: async () => {
    return await axios.get(API_URL);
  },
  SearchCars: async (term) => {
    return await axios.get(`${API_URL}?search=${term}`); // Pretpostavka da API podržava pretragu
  },
  // ... ostale API funkcije
};
