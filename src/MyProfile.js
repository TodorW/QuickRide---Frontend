import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Funkcija za dohvatanje podataka sa API-ja
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://api.postman.com/profile'); 
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  const handleLogout = () => {
    // Logika za odjavu korisnika
    console.log("User logged out");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-900 px-6 py-12 lg:px-8 text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg bg-gray-800 p-6 rounded-md shadow-md">
        <h2 className="text-center text-2xl font-bold mb-8">My Profile</h2>

        {/* Profilna Slika */}
        <div className="flex justify-center mb-6">
          <img
            src={userData.profileImage}
            alt="Profile"
            className="h-32 w-32 rounded-full object-cover"
          />
        </div>

        {/* Osnovne Informacije */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Osnovne Informacije</h3>
          <p>Ime: {userData.firstName} {userData.lastName}</p>
          <p>Email: {userData.email}</p>
        </div>

        {/* Kontakt Informacije */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Kontakt Informacije</h3>
          <p>Telefon: {userData.phone}</p>
          <p>Adresa: {userData.address}</p>
        </div>

        {/* Biografija */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Biografija</h3>
          <p>{userData.bio}</p>
        </div>

        {/* Društvene Mreže */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Društvene Mreže</h3>
          {userData.socialLinks && Object.entries(userData.socialLinks).map(([platform, url]) => (
            <p key={platform}>
              <a href={url} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </a>
            </p>
          ))}
        </div>

        {/* Detaljne Informacije */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Detaljne Informacije</h3>
          <p>Datum Rođenja: {userData.birthDate}</p>
          <p>Pol: {userData.gender}</p>
          <p>Interesovanja: {userData.interests}</p>
        </div>

        {/* Aktivnosti */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Aktivnosti</h3>
          <ul className="list-disc pl-5">
            {userData.activities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        </div>

        {/* Status Naloga */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Status Naloga</h3>
          <p>{userData.accountStatus}</p>
        </div>

        {/* Notifikacije */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Notifikacije</h3>
          <ul className="list-disc pl-5">
            {userData.notifications.map((notification, index) => (
              <li key={index}>{notification}</li>
            ))}
          </ul>
        </div>

        {/* Dugmad za Izmenu i Odjavu */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleEditProfile}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
          >
            Izmeni Profil
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
          >
            Odjavi se
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;