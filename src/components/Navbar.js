import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const isAdmin = role === "admin";

  return (
    <div style={{
      background: "linear-gradient(90deg, #5f5cff, #7c3aed)",
      padding: "15px 40px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "white"
    }}>
      <div style={{ fontWeight: "600", fontSize: "18px" }}>
        Internship Portal
      </div>

      <div style={{ display: "flex", gap: "15px" }}>
        <button
          style={navBtn}
          onClick={() => navigate(isAdmin ? "/admin" : "/student")}
        >
          Dashboard
        </button>

        <button
          style={navBtn}
          onClick={() => navigate("/internships")}
        >
          Internships
        </button>

        <button
          style={navBtn}
          onClick={() => navigate("/tasks")}
        >
          Tasks
        </button>

        <button
          style={navBtn}
          onClick={() => navigate("/feedback")}
        >
          Feedback
        </button>

        <button
          style={{ ...navBtn, backgroundColor: "#ef4444", color: "white" }}
          onClick={() => navigate("/")}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

const navBtn = {
  padding: "8px 14px",
  backgroundColor: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "500"
};

export default Navbar;