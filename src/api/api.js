import axios from "axios";
import { LocalStorage } from "../utility/localStorage";

const HTTP_UNAUTHORIZED = 401;
const HTTP_OK = 200;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    if (error.response.status === HTTP_UNAUTHORIZED) {
      console.log(`Received ${HTTP_UNAUTHORIZED} status code`);
      LocalStorage.remove("BearerToken");

      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

client.interceptors.request.use(
  async (config) => {
    const token = LocalStorage.get("BearerToken");

    // console.log("Token is", token);

    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const AuthService = {
  register(userData) {
    return client.post("register", userData);
  },
  async login(userData) {
    try {
      const token = LocalStorage.get("BearerToken");
      const response = await client.post("login", userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      if (response.status === HTTP_OK) {
        // console.log(
        //   `Setting local token ${response.data.success.token}`
        // );
        LocalStorage.set("BearerToken", response.data.token);
        return true;
      }
    } catch (error) {
      console.error("Error while logging in");
      return false;
    }
  },
  async logout() {
    try {
      LocalStorage.remove("BearerToken");

      window.location.href = "/";

      return true; // Uspješno izlogovan
    } catch (error) {
      console.error("Error logout");
      return false;
    }
  },
};

export const UserService = {
  GetProfile() {
    return client.get("user");
  },
};

export const CarService = {
  ListCars() {
    return client.get("cars");
  },
  GetCar(id) {
    return client.get(`cars/${id}`);
  },
  GetAvailability(availabilityData) {
    return client.post("cars/check-availability", availabilityData);
  },
};

export const ReservationService = {
  StoreReservation(reservationData) {
    return client.post("reservations", reservationData);
  },
};
