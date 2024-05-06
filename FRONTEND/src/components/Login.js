import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import "./css/Login.css";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const removeHtmlEntities = (input) => {
    const pattern = /&[^\s]*?;/g;
    return input.replace(pattern, "");
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/authenticate",
        {
          email: removeHtmlEntities(email.trim()),
          password: password,
        }
      );

      const token = response.data.token;
      sessionStorage.setItem("token", token);
      console.log("Login successful");
      window.location.href = "/";
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Login failed. Please check your credentials.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img
            src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
            alt="Login"
          />
        </div>
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          handleSubmit={handleSubmit}
          onFinishFailed={onFinishFailed}
        >
          <p className="form-title">Welcome back</p>
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
              LOGIN
            </Button>
          </Form.Item>
          <p>
            Don't have an account? Click here to{" "}
            <Link to="/register">Register</Link>
          </p>
        </Form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Login;
