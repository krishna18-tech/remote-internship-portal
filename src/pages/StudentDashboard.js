import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import API from "../api/api";

function StudentDashboard() {
  const navigate = useNavigate();
  const [internships, setInternships] = useState([]);
  const [applied, setApplied] = useState([]);

  useEffect(() => {
    API.get("/internships")
      .then((res) => setInternships(res.data))
      .catch((err) => console.log(err));

    API.get("/applications")
      .then((res) => setApplied(res.data))
      .catch(() => {});
  }, []);

  const applyInternship = (id) => {
    API.post("/applications", {
      studentId: 1,
      internshipId: id,
      status: "Applied"
    })
      .then(() => alert("Application submitted successfully"))
      .catch(() => alert("Unable to apply for this internship"));
  };

  return (
    <Layout>
      <div className="page-shell">
        <div className="page-container">
          <div className="page-head">
            <div>
              <h2 className="page-header">Student Dashboard</h2>
              <p className="page-subtitle">
                Monitor your internships, applications, and progress in a polished student workspace.
              </p>
            </div>
            <div className="page-head-actions">
              <button className="btn btn-primary" onClick={() => navigate("/internships")}>Browse Internships</button>
              <button className="btn btn-secondary" onClick={() => navigate("/tasks")}>My Tasks</button>
              <button className="btn btn-secondary" onClick={() => navigate("/feedback")}>Feedback</button>
            </div>
          </div>

          <div className="grid-4">
            <StatCard number={internships.length} label="Internships Available" />
            <StatCard number={applied.length} label="Applications" />
            <StatCard number="4.8★" label="Rating" />
            <StatCard number="92%" label="Progress" />
          </div>

          <div className="page-section">
            <h3 className="section-title">Latest Internships</h3>
            {internships.length === 0 ? (
              <div className="card">
                <p className="card-text">No internships available right now. Check back soon.</p>
              </div>
            ) : (
              <div className="grid-3">
                {internships.slice(0, 4).map((item) => (
                  <div key={item.id} className="card">
                    <h3 className="card-title">{item.title}</h3>
                    <p className="card-text">{item.description}</p>
                    <p className="card-text"><strong>Duration:</strong> {item.duration}</p>
                    <p className="card-text"><strong>Stipend:</strong> ₹{item.stipend}</p>
                    <button className="btn btn-primary" onClick={() => applyInternship(item.id)}>Apply</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="page-section">
            <h3 className="section-title">My Progress</h3>
            <div className="card progress-row progress-card">
              <div className="progress-item">
                <div className="progress-label">HTML <span>90%</span></div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: "90%" }} /></div>
              </div>
              <div className="progress-item">
                <div className="progress-label">React <span>75%</span></div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: "75%" }} /></div>
              </div>
              <div className="progress-item">
                <div className="progress-label">Database <span>65%</span></div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: "65%" }} /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function StatCard({ number, label }) {
  return (
    <article className="stat-card">
      <p className="stat-number">{number}</p>
      <p className="stat-label">{label}</p>
    </article>
  );
}

export default StudentDashboard;
