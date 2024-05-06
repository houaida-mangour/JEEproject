import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstname || !lastname || !email || !password) {
      setErrorMessage("Please provide all required information.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        {
          firstname,
          lastname,
          email,
          password,
        }
      );

      const token = response.data.token;
      console.log("Registration successful");
      sessionStorage.setItem("token", token);
      // Redirect the user to the login page or dashboard
      window.location.href = "/login";
    } catch (error) {
      console.error("Registration failed:", error);
      setErrorMessage("Registration failed. Please try again later.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Register
        </button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default Register;
