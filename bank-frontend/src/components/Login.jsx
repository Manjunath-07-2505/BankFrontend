import React, { useState } from "react";
import { loginUser } from "../services/AuthService";
import "./Auth.css";

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(user);
      alert(res.data);

      localStorage.setItem("username", user.username);

      window.location.href = "/dashboard";
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
<p style={{ marginTop: "15px" }}>
  Don't have an account?{" "}
  <a href="/register" style={{ color: "#2a5298" }}>
    Register here
  </a>
</p>