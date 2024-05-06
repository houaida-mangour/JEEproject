import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const removeHtmlEntities = (input) => {
    const pattern = /&[^\s]*?;/g;
    return input.replace(pattern, "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please provide both email and password.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/authenticate",
        {
          email: removeHtmlEntities(email.trim()),
          password: removeHtmlEntities(password.trim()),
        }
      );

      const token = response.data.token;
      // Store the token in session storage
      sessionStorage.setItem("token", token);
      // Redirect to home page or perform any other action after successful login
      console.log("Login successful");
      window.location.href = "/";
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login failure
      setErrorMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
          Login
        </button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default Login;
