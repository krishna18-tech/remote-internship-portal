import { useNavigate } from "react-router-dom";
import { 
  FaTachometerAlt, 
  FaBriefcase, 
  FaTasks, 
  FaCommentDots, 
  FaSignOutAlt,
  FaBars
} from "react-icons/fa";

function Sidebar({ collapsed, setCollapsed }) {

  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const menuItems = [
    {
      label: "Dashboard",
      icon: <FaTachometerAlt />,
      action: () => navigate(role === "admin" ? "/admin" : "/student")
    },
    {
      label: "Internships",
      icon: <FaBriefcase />,
      action: () => navigate("/internships")
    },
    {
      label: "Tasks",
      icon: <FaTasks />,
      action: () => navigate("/tasks")
    },
    {
      label: "Feedback",
      icon: <FaCommentDots />,
      action: () => navigate("/feedback")
    }
  ];

  return (
    <div style={{
      width: collapsed ? "80px" : "240px",
      height: "100vh",
      background: "linear-gradient(180deg, #5f5cff, #7c3aed)",
      color: "white",
      padding: "20px",
      position: "fixed",
      top: 0,
      left: 0,
      transition: "width 0.3s ease",
      display: "flex",
      flexDirection: "column"
    }}>

      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          background: "transparent",
          border: "none",
          color: "white",
          fontSize: "20px",
          marginBottom: "30px",
          cursor: "pointer",
          textAlign: collapsed ? "center" : "left"
        }}
      >
        <FaBars />
      </button>

      {!collapsed && (
        <h3 style={{ marginBottom: "40px" }}>
          Internship Portal
        </h3>
      )}

      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={item.action}
          style={menuButtonStyle(collapsed)}
        >
          <span style={{ fontSize: "18px" }}>
            {item.icon}
          </span>

          {!collapsed && (
            <span style={{ marginLeft: "12px" }}>
              {item.label}
            </span>
          )}
        </button>
      ))}

      <div style={{ flex: 1 }} />

      {/* Logout */}
      <button
        onClick={() => {
          localStorage.removeItem("role");
          navigate("/");
        }}
        style={menuButtonStyle(collapsed)}
      >
        <FaSignOutAlt />

        {!collapsed && (
          <span style={{ marginLeft: "12px" }}>
            Logout
          </span>
        )}
      </button>

    </div>
  );
}

const menuButtonStyle = (collapsed) => ({
  background: "transparent",
  border: "none",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: collapsed ? "center" : "flex-start",
  padding: "12px 0",
  fontSize: "14px",
  cursor: "pointer",
  transition: "0.2s"
});

export default Sidebar;