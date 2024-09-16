import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseReservations = await fetch('https://api.postman.com/reservations'); // Zamjenit sa stvarnim URL-om
        const responseHistory = await fetch('https://api.postman.com/rental-history'); // Zamjenit sa stvarnim URL-om

        if (!responseReservations.ok || !responseHistory.ok) {
          throw new Error('Failed to fetch data');
        }

        const reservationsData = await responseReservations.json();
        const historyData = await responseHistory.json();

        setReservations(reservationsData);
        setHistory(historyData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCancelReservation = async (reservationId) => {
    try {
      const response = await fetch(`https://api.postman.com/reservations/${reservationId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to cancel reservation');
      }

      setReservations(prevReservations =>
        prevReservations.filter(reservation => reservation.id !== reservationId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gray-900 p-6 rounded-md shadow-md mt-8">
      <h2 className="text-center text-2xl font-bold mb-8">Dashboard</h2>

      {/* Trenutne Rezervacije */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Trenutne Rezervacije</h3>
        <table className="w-full table-auto bg-gray-800 rounded-md text-white">
          <thead>
            <tr className="text-left">
              <th className="px-4 py-2">Rezervacija ID</th>
              <th className="px-4 py-2">Vozilo</th>
              <th className="px-4 py-2">Datum</th>
              <th className="px-4 py-2">Akcije</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length > 0 ? (
              reservations.map(reservation => (
                <tr key={reservation.id} className="border-t border-gray-600">
                  <td className="px-4 py-2">{reservation.id}</td>
                  <td className="px-4 py-2">{reservation.vehicle}</td>
                  <td className="px-4 py-2">{reservation.date}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleCancelReservation(reservation.id)}
                      className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-md"
                    >
                      Otkazi
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-2 text-center">Nema trenutnih rezervacija</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Istorija Iznajmljivanja */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Istorija Iznajmljivanja</h3>
        <table className="w-full table-auto bg-gray-800 rounded-md text-white">
          <thead>
            <tr className="text-left">
              <th className="px-4 py-2">Rezervacija ID</th>
              <th className="px-4 py-2">Vozilo</th>
              <th className="px-4 py-2">Datum</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {history.length > 0 ? (
              history.map(item => (
                <tr key={item.id} className="border-t border-gray-600">
                  <td className="px-4 py-2">{item.id}</td>
                  <td className="px-4 py-2">{item.vehicle}</td>
                  <td className="px-4 py-2">{item.date}</td>
                  <td className="px-4 py-2">{item.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-2 text-center">Nema istorije iznajmljivanja</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;