import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Dialog } from "@headlessui/react";

export default function CarReservationCalendar({ selectedCar }) {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleReservation = () => {
    if (startDate && endDate) {
      alert(
        `Car reserved from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`
      );
      closeModal();
    } else {
      alert("Please select both start and end dates!");
    }
  };

  return (
    <div>
      {}
      <button
        onClick={openModal}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md"
      >
        Reserve {selectedCar ? selectedCar.name : "Car"}
      </button>

      {}
      <Dialog
        open={isOpen}
        onClose={closeModal}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />

          <div className="relative bg-white rounded-lg max-w-md mx-auto p-6 shadow-lg">
            <Dialog.Title className="text-lg font-semibold">
              Select Reservation Dates
            </Dialog.Title>

            {}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
            </div>

            {}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
            </div>

            {}
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleReservation}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md"
              >
                Confirm Reservation
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
