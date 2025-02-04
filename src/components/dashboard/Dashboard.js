import { useNavigate } from "react-router-dom";
import {
  ReservationService,
  UserService,
  CarService,
  RatingService,
} from "../../api/api";
import { useState, useEffect } from "react";
import Header from "../layout/Header";

const ReservationsDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [user, setUser] = useState([]);
  const [cars, setCars] = useState({});
  const [ratedStatus, setRatedStatus] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await UserService.GetProfile();
        setUser(response.data.user);
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await ReservationService.ListUsersReservations(
          user.id
        );
        setReservations(response.data.reservations);

        const carPromises = response.data.reservations.map((reservation) =>
          CarService.GetCar(reservation.car_id).then((carResponse) => ({
            id: reservation.car_id,
            ...carResponse.data.car,
          }))
        );

        const fetchedCars = await Promise.all(carPromises);
        const carsObject = fetchedCars.reduce((acc, car) => {
          acc[car.id] = car;
          return acc;
        }, {});

        setCars(carsObject);
      } catch (error) {
        console.log("Error fetching reservations:", error);
      }
    };

    if (user.id) {
      fetchReservations();
    }
  }, [user.id]);

  useEffect(() => {
    const checkIsRated = async (reservationId, carId) => {
      try {
        const response = await RatingService.CheckIsRated(reservationId, carId);
        setRatedStatus((prevStatus) => ({
          ...prevStatus,
          [reservationId]: response.data.rated,
        }));
      } catch (error) {
        console.log(
          `Error checking if reservation ${reservationId} is rated:`,
          error
        );
      }
    };

    if (reservations.length > 0) {
      reservations.forEach((reservation) => {
        checkIsRated(reservation.id, reservation.car_id);
      });
    }
  }, [reservations]);

  return (
    <>
      <Header />
      <div className="bg-gray-900 min-h-screen py-12 transition-colors duration-300 bg-gray-100">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="mb-8 text-3xl font-extrabold text-gray-900 dark:text-white animate-fade-in">
            Reservations Dashboard
          </h1>

          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {reservations.map((reservation, index) => (
              <div
                key={reservation.id}
                className="overflow-hidden transition duration-300 transform bg-white rounded-lg shadow-md group dark:bg-gray-800 hover:scale-105 hover:shadow-xl animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative aspect-w-2 aspect-h-3">
                  {cars[reservation.car_id] && (
                    <img
                      src={`http://tim1.cortexakademija.com/storage/cars-images/${
                        cars[reservation.car_id].image
                      }`}
                      alt={`${cars[reservation.car_id].make} ${
                        cars[reservation.car_id].model
                      }`}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                      style={{
                        width: "300px",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </div>
                <div className="px-4 py-3 mt-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    {cars[reservation.car_id]
                      ? `${cars[reservation.car_id].make} ${
                          cars[reservation.car_id].model
                        }`
                      : "Loading..."}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Reservation from: {reservation.start_date} to{" "}
                    {reservation.end_date}
                  </p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Status: {reservation.status}
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {reservation.status !== "returned" && (
                      <button
                        onClick={() =>
                          navigate(`/reservation/cancel/${reservation.id}`)
                        }
                        className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition duration-200"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      onClick={() =>
                        navigate(`/reservation/status/${reservation.id}`)
                      }
                      className="px-4 py-2 text-sm font-semibold text-white bg-gray-600 rounded-md hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 transition duration-200"
                    >
                      Check Status
                    </button>
                    {reservation.status === "returned" &&
                      !ratedStatus[reservation.id] && (
                        <button
                          onClick={() =>
                            navigate(`/reservation/rate/${reservation.id}`)
                          }
                          className="px-4 py-2 text-sm font-semibold text-white bg-yellow-600 rounded-md hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 transition duration-200"
                        >
                          Rate
                        </button>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {reservations.length === 0 && (
            <div className="text-center animate-fade-in">
              <p className="text-xl text-gray-600 dark:text-gray-400">
                No reservations available.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ReservationsDashboard;
