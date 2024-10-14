import React, { useState, useEffect } from "react";
import { ReservationService } from "../../api/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CarAvailabilityCalendar = ({ carId }) => {
  const [reservedDates, setReservedDates] = useState([]);

  useEffect(() => {
    const fetchReservedDates = async () => {
      try {
        const response = await ReservationService.ListCarsReservedDates(carId);
        setReservedDates(response.data.reserved_dates);
      } catch (error) {
        console.log("Error fetching reserved dates:", error);
      }
    };
    fetchReservedDates();
  }, [carId]);

  const isDateDisabled = (date) => {
    const selectedDate = new Date(date);

    return reservedDates.some((reservedDate) => {
      const formattedReservedDate = new Date(reservedDate);

      return (
        selectedDate.getFullYear() === formattedReservedDate.getFullYear() &&
        selectedDate.getMonth() === formattedReservedDate.getMonth() &&
        selectedDate.getDate() === formattedReservedDate.getDate()
      );
    });
  };
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-100">Available Dates</h3>
      <DatePicker
        selected={null}
        onChange={() => {}}
        minDate={new Date()}
        inline
        filterDate={(date) => !isDateDisabled(date)}
      />
    </div>
  );
};

export default CarAvailabilityCalendar;
