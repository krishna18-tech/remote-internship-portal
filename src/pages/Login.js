import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  return (
    <div className="login-wrapper">
      <div className="login-card">

        <h2 className="login-title">
          Remote Internship Portal
        </h2>

        <p className="login-subtitle">
          Manage internships, tasks & mentor feedback
        </p>

        <input
          type="email"
          placeholder="Enter Email"
          className="login-input"
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="login-input"
        />

        <select
          className="login-input"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        <button
          className="login-btn"
          onClick={() => {
            localStorage.setItem("role", role);

            if (role === "admin") {
              navigate("/admin");
            } else {
              navigate("/student");
            }
          }}
        >
          Login
        </button>

      </div>
    </div>
  );
}

export default Login;