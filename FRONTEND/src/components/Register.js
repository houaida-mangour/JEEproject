import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import "./css/Register.css";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        {
          firstname: removeHtmlEntities(firstname.trim()),
          lastname: removeHtmlEntities(lastname.trim()),
          email: removeHtmlEntities(email.trim()),
          password: password,
        }
      );

      const token = response.data.token;
      console.log("Registration successful");
      sessionStorage.setItem("token", token);
      window.location.href = "/login";
    } catch (error) {
      console.error("Registration failed:", error);
      setErrorMessage("Registration failed. Please try again later.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          handleSubmit={handleSubmit}
          onFinishFailed={onFinishFailed}
        >
          <p className="form-title">Register</p>
          <Form.Item
            name="firstname"
            value="firstname"
            onChange={(e) => setFirstname(e.target.value)}
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input placeholder="First Name" />
          </Form.Item>

          <Form.Item
            name="lastname"
            value="lastname"
            onChange={(e) => setLastname(e.target.value)}
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>

          <Form.Item
            name="email"
            value="email"
            onChange={(e) => setEmail(e.target.value)}
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            value="password"
            onChange={(e) => setPassword(e.target.value)}
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={(e) => handleSubmit(e)}
            >
              REGISTER
            </Button>
          </Form.Item>
          <p>
            Already have an account? Click here to{" "}
            <Link to="/login">Login</Link>
          </p>
        </Form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Register;
