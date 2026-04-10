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
    <div className={`sidebar-wrapper ${collapsed ? "sidebar-collapsed" : ""}`}>
      <button className="sidebar-toggle" onClick={() => setCollapsed(!collapsed)}>
        <FaBars />
      </button>

      {!collapsed && <div className="sidebar-brand">Internship Portal</div>}

      <div className="sidebar-menu">
        {menuItems.map((item, index) => (
          <button key={index} onClick={item.action} className="sidebar-link">
            <span style={{ fontSize: "18px" }}>{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </div>

      <div className="sidebar-divider" />

      <div className="sidebar-footer">
        <button
          className="sidebar-link"
          onClick={() => {
            localStorage.removeItem("role");
            navigate("/");
          }}
        >
          <FaSignOutAlt />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
