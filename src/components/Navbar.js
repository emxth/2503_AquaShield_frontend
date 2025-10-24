import React, { useContext, useState, useRef, useEffect } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    setDropdownOpen(false);
    navigate("/"); // 👈 redirect to home after logout
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="logo"
        onClick={() => navigate("/")}
      />

      {/* Navigation Links */}
      <ul className="hidden md:flex items-center gap-5 font-medium">
        <NavLink to="/">
          <li className="py-5 cursor-pointer">HOME</li>
        </NavLink>
        <li className="py-5 cursor-pointer">REPORT</li>
        <li className="py-5 cursor-pointer">ABOUT</li>
        <li className="py-5 cursor-pointer">CONTACT</li>
      </ul>

      {/* Profile / Login */}
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div
            className="flex items-center gap-2 relative cursor-pointer"
            ref={dropdownRef}
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={userData.image}
              alt="Profile"
            />
            <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute top-full right-0 mt-2 text-base font-medium text-gray-600 z-20">
                <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                  <p
                    onClick={() => {
                      navigate("my-profile");
                      setDropdownOpen(false);
                    }}
                    className="hover:text-black cursor-pointer"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => setDropdownOpen(false)}
                    className="hover:text-black cursor-pointer"
                  >
                    My Reports
                  </p>
                  <p
                    onClick={logout}
                    className="hover:text-black cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
