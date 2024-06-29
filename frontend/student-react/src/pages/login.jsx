import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Login.css";
import { Form, Button } from "react-bootstrap";
import UserService from "../components/service/UserService";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const isAuthenticated = UserService.isAuthenticated();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app/main");
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const userData = await UserService.login(email, password);
      console.log(userData);
      if (userData.token) {
        localStorage.setItem("name", userData.name);
        localStorage.setItem("token", userData.token);
        localStorage.setItem("role", userData.role);
        navigate("/app/main");
      } else {
        setError(userData.message);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="login-page-body">
      <div className="login-page">
        <div className="form">
          <div className="login">
            <div className="login-header">
              <h1>Welcome!</h1>
              {error && <p className="error-message">{error}</p>}
            </div>
          </div>
          <Form className="login-form" onSubmit={submitHandler}>
            <Form.Control
              type="text"
              placeholder="User ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">login</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
