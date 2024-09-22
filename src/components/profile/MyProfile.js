import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService, UserService } from "../../api/api";

const MyProfile = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await UserService.GetProfile();
        console.log(response.data);
        setFirstName(response.data.user.name);
        setEmail(response.data.user.email);
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const handleLogout = async () => {
    try {
      const success = await AuthService.logout();
      if (success) {
        console.log("Logout successful");
      }
    } catch (error) {
      console.error("Error logout", error);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-900 px-6 py-12 lg:px-8 text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg bg-gray-800 p-6 rounded-md shadow-md">
        <h2 className="text-center text-2xl font-bold mb-8">My Profile</h2>
        {/* Osnovne Informacije */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Osnovne Informacije</h3>
          <p>Ime: {firstName}</p>
          <p>Email: {email}</p>
        </div>
        {/* Kontakt Informacije */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Kontakt Informacije</h3>
          <p>Telefon:</p>
          <p>Adresa:</p>
        </div>
        {/* Biografija */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Biografija</h3>
          <p></p>
        </div>
        {/* Društvene Mreže */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Društvene Mreže</h3>
          {/* {userData.socialLinks &&
            Object.entries(userData.socialLinks).map(([platform, url]) => (
              <p key={platform}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:underline"
                >
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </a>
              </p>
            ))} */}
        </div>
        {/* Detaljne Informacije */}
        {/* <div className="mb-4">
          <h3 className="text-lg font-semibold">Detaljne Informacije</h3>
          <p>Datum Rođenja: {userData.birthDate}</p>
          <p>Pol: {userData.gender}</p>
          <p>Interesovanja: {userData.interests}</p>
        </div> */}
        {/* Aktivnosti */}
        {/* <div className="mb-4">
          <h3 className="text-lg font-semibold">Aktivnosti</h3>
          <ul className="list-disc pl-5">
            {userData.activities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        </div>

        {/* Status Naloga */}
        {/* <div className="mb-4">
          <h3 className="text-lg font-semibold">Status Naloga</h3>
          <p>{userData.accountStatus}</p>
        </div>{" "}
        */}
        {/* Notifikacije */}
        {/* <div className="mb-4">
          <h3 className="text-lg font-semibold">Notifikacije</h3>
          <ul className="list-disc pl-5">
            {userData.notifications.map((notification, index) => (
              <li key={index}>{notification}</li>
            ))}
          </ul>
        </div> */}
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
