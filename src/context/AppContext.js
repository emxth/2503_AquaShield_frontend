import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [token, setToken] = useState(localStorage.getItem("token") || false);
  const [userData, setUserData] = useState(false);
  const navigate = useNavigate();

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: { token },
      });

      console.log("Profile API response:", data);

      if (data.success) {
        setUserData(data.userData);
      } else {
        // ❌ Account deleted or invalid token
        handleLogout("Your account has been deleted or session expired.");
      }
    } catch (error) {
      console.log("Error:", error);
      handleLogout("Your account has been deleted by admin.");
    }
  };

  const handleLogout = (message) => {
    localStorage.removeItem("token");
    setToken(false);
    setUserData(false);
    if (message) toast.error(message);
    navigate("/register"); // ✅ Redirect to register page
  };

  const value = {
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
    handleLogout,
  };

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
