import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [state, setState] = useState("Sign Up");

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [contactNo, setContactNo] = useState("");
  const [address, setAddress] = useState("");

  const clearFields = () => {
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setContactNo("");
    setAddress("");
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateContactNo = (contact) => {
    const regex = /^[0-9]{10,15}$/; // 10-15 digits
    return regex.test(contact);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === "Sign Up") {
      // Front-end validations
      if (!firstname.trim()) {
        toast.error("First name is required");
        return;
      }
      if (!lastname.trim()) {
        toast.error("Last name is required");
        return;
      }
      if (!contactNo.trim()) {
        toast.error("Contact number is required");
        return;
      }
      if (!validateContactNo(contactNo)) {
        toast.error("Contact number must be 10-15 digits");
        return;
      }
      if (!address.trim()) {
        toast.error("Address is required");
        return;
      }
      if (!email.trim()) {
        toast.error("Email is required");
        return;
      }
      if (!validateEmail(email)) {
        toast.error("Invalid email format");
        return;
      }
      if (!password) {
        toast.error("Password is required");
        return;
      }
      if (password.length < 8) {
        toast.error("Password must be at least 8 characters long");
        return;
      }
    } else {
      // Login validations
      if (!email.trim()) {
        toast.error("Email is required");
        return;
      }
      if (!validateEmail(email)) {
        toast.error("Invalid email format");
        return;
      }
      if (!password) {
        toast.error("Password is required");
        return;
      }
    }

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          firstname,
          lastname,
          email,
          password,
          contactNo,
          address,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Account created successfully");
          clearFields();
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Login successful");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  return (
    <div className="min-h-screen flex items-start justify-center bg-white transition-all duration-700 pt-12 pb-12">
      <form
        onSubmit={onSubmitHandler}
        className="bg-blue-50 flex flex-col gap-4 m-auto items-center p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-2xl"
        autoComplete="off"
      >
        <p className="text-2xl font-semibold text-center w-full text-gray-800">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p className="text-center text-gray-500">
          Please {state === "Sign Up" ? "create an account" : "login"} to report
          illegal fishing
        </p>

        {state === "Sign Up" && (
          <>
            <div className="w-full">
              <p>First Name</p>
              <input
                type="text"
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </div>

            <div className="w-full">
              <p>Last Name</p>
              <input
                type="text"
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </div>

            <div className="w-full">
              <p>Contact No</p>
              <input
                type="text"
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
                required
              />
            </div>

            <div className="w-full">
              <p>Address</p>
              <input
                type="text"
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
          </>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            name="email"
            autoComplete="new-email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="w-full relative">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type={showPassword ? "text" : "password"}
            name="password"
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <span
            className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="w-full flex flex-col items-center mt-3">
          <button
            type="submit"
            className="bg-primary text-white w-full py-2 rounded-md text-base font-medium hover:bg-primary/90 transition"
          >
            {state === "Sign Up" ? "Create Account" : "Login"}
          </button>

          <div className="mt-4 text-center">
            {state === "Sign Up" ? (
              <p>
                Already have an account?{" "}
                <span
                  onClick={() => {
                    setState("Login");
                    clearFields();
                  }}
                  className="text-primary underline cursor-pointer"
                >
                  Login here
                </span>
              </p>
            ) : (
              <p>
                Create a new account?{" "}
                <span
                  onClick={() => {
                    setState("Sign Up");
                    clearFields();
                  }}
                  className="text-primary underline cursor-pointer"
                >
                  Click here
                </span>
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
