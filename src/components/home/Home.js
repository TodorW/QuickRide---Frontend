import { useEffect, useState } from "react";
import Cars from "../cars/Cars";
import Header from "../layout/Header";
import { AuthService, UserService } from "../../api/api";

const Home = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const response = await UserService.GetProfile();
        setUser(response.data.user);
        if (user.is_blocked === 1) {
          await AuthService.logout();
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    checkUserStatus();
  }, [user.is_blocked]);

  return (
    <div>
      {/* Header */}
      <Header />
      {/* Cars Component */}
      <Cars /> {/* Include Cars component here */}
    </div>
  );
};

export default Home;
