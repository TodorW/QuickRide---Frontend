import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Dialog } from '@headlessui/react'

export default function CarReservationCalendar({ selectedCar }) {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const handleReservation = () => {
    if (startDate && endDate) {
      alert(`Reserved ${selectedCar.name} from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`)
      closeModal()
    } else {
      alert('Please select both start and end dates!')
    }
  }

  return (
    <div className="w-full max-w-md">
      {/* Button to trigger calendar popup */}
      <button
        onClick={openModal}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md"
      >
        Reserve {selectedCar.name}
      </button>

      {/* Popup for datepicker */}
      <Dialog open={isOpen} onClose={closeModal} className="relative z-10">
        <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
            <Dialog.Title className="text-lg font-semibold">
              Reserve {selectedCar.name}
            </Dialog.Title>

            {/* Datepicker for start date */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
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

            {/* Datepicker for end date */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">End Date</label>
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

            {/* Action buttons */}
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
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}
