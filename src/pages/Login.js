import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getLocalUsers = () => {
    try {
      return JSON.parse(localStorage.getItem("users") || "[]");
    } catch {
      return [];
    }
  };

  const saveLocalUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  const localRegister = async ({ name, email, password, role }) => {
    const users = getLocalUsers();
    const existing = users.find((user) => user.email === email);
    if (existing) {
      throw new Error("Email already registered");
    }
    const newUser = { name, email, password, role };
    users.push(newUser);
    saveLocalUsers(users);
    return { token: `local-${Date.now()}`, role };
  };

  const localLogin = async ({ email, password, role }) => {
    const users = getLocalUsers();
    const user = users.find((user) => user.email === email);
    if (!user) {
      throw new Error("No account found for this email");
    }
    if (user.password !== password) {
      throw new Error("Incorrect password");
    }
    if (user.role !== role) {
      throw new Error(`Please sign in as ${user.role}`);
    }
    return { token: `local-${Date.now()}`, role };
  };

  const getErrorMessage = (err, fallback) => {
    return (
      err.response?.data?.message ||
      err.message ||
      err.response?.statusText ||
      fallback
    );
  };

  const isBackendUnavailable = (err) => {
    return !err.response || err.response.status === 404 || err.code === "ECONNABORTED";
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }
      try {
        const response = await API.post("/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role
        });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role || formData.role);
        if (formData.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/student");
        }
      } catch (err) {
        if (isBackendUnavailable(err)) {
          try {
            const localResult = await localRegister({
              name: formData.name,
              email: formData.email,
              password: formData.password,
              role: formData.role
            });
            localStorage.setItem("token", localResult.token);
            localStorage.setItem("role", localResult.role);
            if (formData.role === "admin") {
              navigate("/admin");
            } else {
              navigate("/student");
            }
          } catch (localErr) {
            setError(getErrorMessage(localErr, "Registration failed"));
          }
        } else {
          setError(getErrorMessage(err, "Registration failed"));
        }
      }
    } else {
      try {
        const response = await API.post("/login", {
          email: formData.email,
          password: formData.password,
          role: formData.role
        });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role || formData.role);
        if (formData.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/student");
        }
      } catch (err) {
        if (isBackendUnavailable(err)) {
          try {
            const localResult = await localLogin({
              email: formData.email,
              password: formData.password,
              role: formData.role
            });
            localStorage.setItem("token", localResult.token);
            localStorage.setItem("role", localResult.role);
            if (formData.role === "admin") {
              navigate("/admin");
            } else {
              navigate("/student");
            }
          } catch (localErr) {
            setError(getErrorMessage(localErr, "Login failed"));
          }
        } else {
          setError(getErrorMessage(err, "Login failed"));
        }
      }
    }

    setLoading(false);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">
          {isSignUp ? "Sign Up" : "Sign In"} - Remote Internship Portal
        </h2>

        <p className="login-subtitle">
          Manage internships, tasks & mentor feedback
        </p>

        {error && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              type="text"
              name="name"
              placeholder="Enter Full Name"
              className="login-input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="login-input"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="login-input"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {isSignUp && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="login-input"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          )}

          <select
            name="role"
            className="login-input"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Processing..." : (isSignUp ? "Sign Up" : "Sign In")}
          </button>
        </form>

        <button
          type="button"
          className="toggle-btn"
          onClick={() => setIsSignUp(!isSignUp)}
          style={{marginTop: '10px', background: 'none', border: 'none', color: 'blue', cursor: 'pointer'}}
        >
          {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
}

export default Login;
