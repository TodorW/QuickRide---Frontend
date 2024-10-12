import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../api/api"; // API servis
import { FaEye, FaEyeSlash } from "react-icons/fa";

const EditProfile = () => {
  const navigate = useNavigate();

  // Inicijalno stanje za korisničke podatke
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [address, setAddress] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [errors, setErrors] = useState({});
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const fileInputRef = React.createRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required"; // Validacija imena
    if (!email) newErrors.email = "Email is required";
    if (!currentPassword)
      newErrors.currentPassword = "Current password is required";
    if (newPassword && newPassword.length < 8)
      newErrors.newPassword = "New password must be at least 8 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Logika za čuvanje izmjena
      console.log("Changes saved successfully");
      // Preusmjeravanje na profil stranicu
      navigate("/my-profile");
    }
  };

  const handleCancel = () => {
    // Logika za otkazivanje izmjena
    navigate("/my-profile");
  };

  // API poziv za dohvaćanje korisničkih podataka
  const fetchUser = async () => {
    try {
      const response = await UserService.GetProfile();
      const userData = response.data.success;
      setName(`${userData.firstName} ${userData.lastName}`); // Kombinovano ime
      setEmail(userData.email);
      setPhone(userData.phone);
      setAddress(userData.address);
      setBirthDate(userData.birthDate);
      setGender(userData.gender);
      setBio(userData.bio);
      console.log("User data fetched successfully", userData);
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser(); // Fetch korisničkih podataka prilikom mountanja komponente
  }, []);

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-900 px-6 py-12 lg:px-8 text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg bg-gray-800 p-6 rounded-md shadow-md">
        <h2 className="text-center text-2xl font-bold mb-8">Edit Profile</h2>
        <form onSubmit={handleSave} className="space-y-6">
          {/* Profilna slika */}
          <div>
            <label className="block text-sm font-medium leading-6">
              Profile Picture
            </label>
            <div className="mt-2 flex items-center">
              <img
                src={
                  profileImage ||
                  "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                }
                alt="Profile"
                className="h-20 w-20 rounded-full object-cover"
              />
              <input
                type="file"
                accept="image/*"
                className="ml-4"
                onChange={handleImageChange}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
              <button
                type="button"
                className="ml-4 bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-600"
                onClick={() => fileInputRef.current.click()}
              >
                Choose File
              </button>
            </div>
          </div>

          {/* Polje za ime */}
          <div>
            <label className="block text-sm font-medium leading-6">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full rounded-md border-0 py-2 px-3 text-gray-100 bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email adresa */}
          <div>
            <label className="block text-sm font-medium leading-6">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md border-0 py-2 px-3 text-gray-100 bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Broj telefona */}
          <div>
            <label className="block text-sm font-medium leading-6">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="block w-full rounded-md border-0 py-2 px-3 text-gray-100 bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            />
          </div>

          {/* Promjena lozinke */}
          <div>
            <label className="block text-sm font-medium leading-6">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-100 bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.currentPassword}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium leading-6">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-100 bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
            )}
          </div>

          {/* Dugmad */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-500 focus:ring-2 focus:ring-red-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
