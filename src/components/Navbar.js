import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  return (
    <header className="navbar">
      <div className="navbar-brand">Remote Internship Portal</div>

      <div className="navbar-links">
        <button className="navbar-button" onClick={() => navigate(isAdmin ? "/admin" : "/student")}>Dashboard</button>
        <button className="navbar-button" onClick={() => navigate("/internships")}>Internships</button>
        <button className="navbar-button" onClick={() => navigate("/tasks")}>Tasks</button>
        <button className="navbar-button" onClick={() => navigate("/feedback")}>Feedback</button>
        <button className="navbar-button logout" onClick={() => { localStorage.removeItem("role"); navigate("/"); }}>Logout</button>
      </div>
    </header>
  );
}

export default Navbar;
