import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AuthService, UserService } from "../../api/api";
import { FaEdit, FaSignOutAlt } from "react-icons/fa";
import { setProfile } from "../../redux/profileSlice";

const MyProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state) => state.profile);

  // const [email, setEmail] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [phone, setPhone] = useState("");
  // const [address, setAddress] = useState("");
  // const [birthDate, setBirthDate] = useState("");
  // const [gender, setGender] = useState("");
  // const [bio, setBio] = useState("");
  // const [privacy, setPrivacy] = useState("");
  // const [profileImage, setProfileImage] = useState(""); // State for profile image
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await UserService.GetProfile();
        dispatch(
          setProfile({
            name: response.data.user.name,
            email: response.data.user.email,
            phone: response.data.user.phone || "No phone number",
            address: response.data.user.address || "No address",
            birthDate: response.data.user.birthDate || "No birth date",
            gender: response.data.user.gender || "No gender",
            bio: response.data.user.bio || "No bio available",
            privacy: response.data.user.privacy || "No privacy settings",
            profileImage:
              response.data.user.profileImage ||
              "https://cdn-icons-png.flaticon.com/512/847/847969.png", // Default image
          })
        );
      } catch (error) {
        console.log("Error fetching user:", error);
        setError("Error fetching user profile");
      }
    };

    fetchProfile();
  }, [dispatch]);

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const handleLogout = async () => {
    try {
      const success = await AuthService.logout();
      if (success) {
        console.log("Logout successful");
        navigate("/login"); // Redirect to login on successful logout
      }
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-900 px-6 py-12 lg:px-8 text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg bg-gray-800 p-6 rounded-md shadow-md">
        <h2 className="text-center text-2xl font-bold mb-8">My Profile</h2>

        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <img
            src={profile.profileImage}
            alt="Profile"
            className="h-24 w-24 rounded-full object-cover border-2 border-gray-600"
          />
        </div>

        {/* Basic Information */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Basic Information</h3>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
        </div>
        {/* Contact Information */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Contact Information</h3>
          <p>Phone: {profile.phone}</p>
          <p>Address: {profile.address}</p>
        </div>
        {/* Bio */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Bio</h3>
          <p>{profile.bio}</p>
        </div>
        {/* Additional Information */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Additional Information</h3>
          <p>Birth Date: {profile.birthDate}</p>
          <p>Gender: {profile.gender}</p>
          <p>Privacy Settings: {profile.privacy}</p>
        </div>

        {/* Buttons for Editing and Logging Out */}
        <div className="flex flex-col space-y-4 mt-6">
          <button
            onClick={handleEditProfile}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md flex items-center"
          >
            <FaEdit className="mr-2" />
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md flex items-center"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
