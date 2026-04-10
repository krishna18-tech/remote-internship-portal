import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import API from "../api/api";

function AdminDashboard() {
  const navigate = useNavigate();
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    API.get("/internships")
      .then((res) => setInternships(res.data))
      .catch((err) => console.log(err));
  }, []);

  const featureCards = [
    { title: "Internships", desc: "Manage internship postings.", path: "/internships" },
    { title: "Tasks", desc: "Assign and monitor tasks.", path: "/tasks" },
    { title: "Feedback", desc: "Review intern performance.", path: "/feedback" }
  ];

  return (
    <Layout>
      <div className="page-shell">
        <div className="page-container">
          <div className="page-head">
            <div>
              <h2 className="page-header">Admin Dashboard</h2>
              <p className="page-subtitle">Manage internships, track student progress, and capture feedback from a centralized admin portal.</p>
            </div>
          </div>

          <div className="grid-3">
            <div className="stat-card">
              <p className="stat-number">0</p>
              <p className="stat-label">Total Interns</p>
            </div>
            <div className="stat-card">
              <p className="stat-number">{internships.filter((i) => i.title !== null).length}</p>
              <p className="stat-label">Active Internships</p>
            </div>
            <div className="stat-card">
              <p className="stat-number">0</p>
              <p className="stat-label">Tasks Assigned</p>
            </div>
          </div>

          <div className="page-section">
            <h3 className="section-title">Quick Admin Tools</h3>
            <div className="grid-3">
              {featureCards.map((card, index) => (
                <div
                  key={index}
                  className="card"
                >
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-text">{card.desc}</p>
                  <button className="btn btn-primary" onClick={() => navigate(card.path)}>Open</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
