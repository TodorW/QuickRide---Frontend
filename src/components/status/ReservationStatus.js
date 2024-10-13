import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CheckCircleIcon,
  ClockIcon,
  TruckIcon,
  ArrowPathIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/solid";
import { ReservationService } from "../../api/api";

const statusSteps = [
  { label: "Pending", value: "pending", icon: ClockIcon },
  { label: "Reserved", value: "reserved", icon: CheckCircleIcon },
  { label: "In Use", value: "in use", icon: TruckIcon },
  { label: "Returned", value: "returned", icon: ArrowPathIcon },
];

const getStatusIndex = (status) => {
  return statusSteps.findIndex((step) => step.value === status) || 0;
};

const ReservationStatus = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);

  const handleGoBack = () => {
    navigate(-1);
  };

  const fetchReservation = async () => {
    try {
      const response = await ReservationService.ShowReservation(id);
      setReservation(response.data.reservation);
    } catch (error) {
      console.error("Error fetching reservation:", error);
    }
  };

  useEffect(() => {
    fetchReservation();

    // Api recalling every 5 seconds
    const intervalId = setInterval(() => {
      fetchReservation();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [id]);

  if (!reservation) {
    return <div>Loading...</div>;
  }

  const currentStatusIndex = getStatusIndex(reservation.status);

  return (
    <div className="min-h-screen py-12 bg-gray-900 flex items-center justify-center">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h2 className="mb-8 text-5xl font-extrabold text-white text-center">
          Reservation Status
        </h2>
        <div className="flex items-center justify-center space-x-8 flex-wrap">
          {statusSteps.map((step, index) => {
            const isActive = index <= currentStatusIndex;
            const lineColor = isActive ? "bg-indigo-500" : "bg-gray-400";
            return (
              <React.Fragment key={step.value}>
                <div className="flex flex-col items-center">
                  <step.icon
                    className={`transition-colors duration-300 ${
                      isActive ? "text-indigo-500" : "text-gray-400"
                    }`}
                    style={{ width: "120px", height: "120px" }}
                  />
                  <p
                    className={`text-sm font-medium mt-2 transition-colors duration-300 ${
                      isActive ? "text-indigo-500" : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
                {index < statusSteps.length - 1 && (
                  <div className={`h-0.5 w-12 ${lineColor}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
        <button
          onClick={handleGoBack}
          className="absolute top-4 left-4 flex items-center text-gray-900 dark:text-white bg-indigo-600 px-4 py-2 rounded-md shadow-md hover:bg-indigo-700 transition-colors duration-300"
        >
          <ArrowLeftIcon className="h-6 w-6" />
          <span className="ml-2">Go Back</span>
        </button>
      </div>
    </div>
  );
};

export default ReservationStatus;
