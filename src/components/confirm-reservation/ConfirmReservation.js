import { useState } from "react";
import { useSelector } from "react-redux";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ReservationService } from "../../api/api";
import { format } from "date-fns";
import PopUpError from "../PopUpError";
import PopUpSucces from "../PopUpSucces";

const ConfirmReservation = ({ open, setOpen }) => {
  const [isErrorPopUpOpen, setIsErrorPopUpOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccesPopUpOpen, setIsSuccesPopUpOpen] = useState(false);
  const [succesMessage, setSuccesMessage] = useState("");

  const reservation = useSelector((state) => state.reservation);

  const handleSendReservations = async () => {
    const startDate = new Date(reservation.startDate);
    const endDate = new Date(reservation.endDate);

    const formattedStartDate = format(startDate, "yyyy-MM-dd HH:mm:ss");
    const formattedEndDate = format(endDate, "yyyy-MM-dd HH:mm:ss");

    const reservationData = {
      car_id: reservation.car.id,
      user_id: reservation.user.id,
      start_date: formattedStartDate,
      end_date: formattedEndDate,
    };

    try {
      await ReservationService.StoreReservation(reservationData);
      setSuccesMessage("Reservation is pending!");
      setIsSuccesPopUpOpen(true);
      setOpen(false);
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setIsErrorPopUpOpen(true);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 hidden bg-gray-900 bg-opacity-75 dark:bg-black dark:bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:block"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <DialogPanel
            transition
            className="flex w-full transform text-left text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:my-8 md:max-w-2xl md:px-4 data-[closed]:md:translate-y-0 data-[closed]:md:scale-95 lg:max-w-4xl"
          >
            <div className="relative flex w-full items-center overflow-hidden bg-white dark:bg-gray-900 px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>

              <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900 sm:col-span-4 lg:col-span-5">
                  <img
                    alt={`Car image`}
                    src={`http://tim1.cortexakademija.com/storage/cars-images/${reservation.car.image}`}
                    className="object-cover object-center"
                  />
                </div>
                <div className="sm:col-span-8 lg:col-span-7">
                  <h2 className="text-2xl font-bold text-gray-400 dark:text-gray-400 sm:pr-12">
                    <p>
                      Car: {reservation.car.make} {reservation.car.model}
                    </p>
                  </h2>

                  <section
                    aria-labelledby="information-heading"
                    className="mt-2"
                  >
                    <h3 id="information-heading" className="sr-only">
                      Car information
                    </h3>

                    <p className="text-2xl text-gray-400 dark:text-gray-400">
                      Total price: ${reservation.totalPrice}
                    </p>
                  </section>

                  <section aria-labelledby="options-heading" className="mt-10">
                    <h3 id="options-heading" className="sr-only">
                      Product options
                    </h3>
                    <div className="mb-4">
                      <label
                        htmlFor="start_date"
                        className="block mb-2 text-sm font-medium text-gray-400"
                      >
                        Start date:
                      </label>
                      <DatePicker
                        id="start_date"
                        selected={reservation.startDate}
                        className="block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-400" // Dodata klasa za svetlo sivu boju
                        placeholderText="Start date"
                        showTimeSelect
                        dateFormat="yyyy-MM-dd HH:mm:ss"
                        readOnly
                        disabled
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="end_date"
                        className="block mb-2 text-sm font-medium text-gray-400"
                      >
                        End date:
                      </label>
                      <DatePicker
                        id="end_date"
                        selected={reservation.endDate}
                        className="block w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-400" // Dodata klasa za svetlo sivu boju
                        placeholderText="End date"
                        showTimeSelect
                        dateFormat="yyyy-MM-dd HH:mm:ss"
                        readOnly
                        disabled
                      />
                    </div>

                    <form>
                      <button
                        type="button"
                        onClick={handleSendReservations}
                        className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 dark:bg-indigo-500 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:ring-offset-2"
                      >
                        Reserve a car
                      </button>
                    </form>
                    {isErrorPopUpOpen && (
                      <PopUpError
                        open={isErrorPopUpOpen}
                        onClose={() => setIsErrorPopUpOpen(false)}
                        message={errorMessage}
                      />
                    )}
                    {isSuccesPopUpOpen && (
                      <PopUpError
                        open={isSuccesPopUpOpen}
                        onClose={() => setIsSuccesPopUpOpen(false)}
                        message={succesMessage}
                      />
                    )}
                  </section>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmReservation;
