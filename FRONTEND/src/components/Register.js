import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const removeHtmlEntities = (input) => {
    const pattern = /&[^\s]*?;/g;
    return input.replace(pattern, "");
  };

  if (!firstname || !lastname || !email || !password) {
    setErrorMessage("Please provide both email and password.");
    return;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        {
          firstname: removeHtmlEntities(firstname.trim()),
          lastname: removeHtmlEntities(lastname.trim()),
          email,
          password,
        }
      );

      const token = response.data.token;
      console.log("Register successful");
      sessionStorage.setItem("token", token);
      window.location.href = "/register";
      // Registration successful, redirect to login or display a success message
    } catch (error) {
      console.error("Registration failed:", error);
      setErrorMessage("Register failed!!!!!!");
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
