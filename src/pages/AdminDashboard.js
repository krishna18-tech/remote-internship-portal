import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Layout from "../components/Layout";

function AdminDashboard() {

  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  const featureCard = (index) => ({
    background: "white",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0px 12px 30px rgba(0,0,0,0.06)",
    transition: "all 0.3s ease",
    transform: hovered === index ? "translateY(-8px)" : "translateY(0px)"
  });

  return (
    <Layout>

      <h2 style={{ fontSize: "28px", fontWeight: "700" }}>
        Admin Dashboard
      </h2>

      <p style={{ color: "#6b7280", marginBottom: "40px" }}>
        Manage internships, assign tasks, and evaluate interns.
      </p>

      {/* Stats */}
      <div style={{ display: "flex", gap: "25px", marginBottom: "50px" }}>
        {[
          { number: "18", label: "Total Interns" },
          { number: "7", label: "Active Internships" },
          { number: "32", label: "Tasks Assigned" }
        ].map((item, index) => (
          <div key={index} style={{
            flex: 1,
            background: "white",
            padding: "30px",
            borderRadius: "16px",
            boxShadow: "0px 10px 25px rgba(0,0,0,0.05)"
          }}>
            <div style={{ fontSize: "30px", fontWeight: "700", color: "#5f5cff" }}>
              {item.number}
            </div>
            <div style={{ fontSize: "14px", color: "#6b7280" }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* Feature Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "30px" }}>
        {[
          { title: "Internships", desc: "Manage internship postings.", path: "/internships" },
          { title: "Tasks", desc: "Assign and monitor tasks.", path: "/tasks" },
          { title: "Feedback", desc: "Review intern performance.", path: "/feedback" }
        ].map((card, index) => (
          <div
            key={index}
            style={featureCard(index)}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
          >
            <h4>{card.title}</h4>
            <p style={{ color: "#6b7280", marginBottom: "20px" }}>
              {card.desc}
            </p>

            <button
              style={{
                padding: "10px 18px",
                background: "linear-gradient(90deg, #5f5cff, #7c3aed)",
                border: "none",
                borderRadius: "8px",
                color: "white",
                cursor: "pointer"
              }}
              onClick={() => navigate(card.path)}
            >
              Open
            </button>
          </div>
        ))}
      </div>

    </Layout>
  );
}

export default AdminDashboard;