import axios from "axios";
import { LocalStorage } from "../utility/localStorage";

const HTTP_UNAUTHORIZED = 401;
const HTTP_OK = 200;

const client = axios.create({
  baseURL: "http://tim1.cortexakademija.com/api/",
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
      LocalStorage.remove("BearerToken");

      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

client.interceptors.request.use(
  async (config) => {
    const token = LocalStorage.get("BearerToken");

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
      if (response.status === HTTP_OK) {
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
  ListCarsReservedDates(carId) {
    return client.get(`reservations/${carId}/reserved-dates`);
  },
  ListUsersReservations(userId) {
    return client.get(`reservations/users/${userId}`);
  },
  ShowReservation(reservationId) {
    return client.get(`reservations/${reservationId}`);
  },
};

export const RatingService = {
  StoreRating(rateData, reservationId, carId) {
    return client.post(
      `reservations/${reservationId}}/rate/${carId}`,
      rateData
    );
  },
};
