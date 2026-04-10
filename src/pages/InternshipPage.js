import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../api/api";

function InternshipPage() {
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";
  const [internships, setInternships] = useState([]);
  const [newInternship, setNewInternship] = useState({ title: "", description: "", duration: "", stipend: "" });

  useEffect(() => {
    API.get("/internships")
      .then((res) => setInternships(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => setNewInternship({ ...newInternship, [e.target.name]: e.target.value });

  const addInternship = () => {
    API.post("/internships", newInternship)
      .then((res) => {
        alert("Internship added successfully");
        setInternships([...internships, res.data]);
        setNewInternship({ title: "", description: "", duration: "", stipend: "" });
      })
      .catch((err) => console.log(err));
  };

  const deleteInternship = (id) => {
    API.delete(`/internships/${id}`)
      .then(() => setInternships(internships.filter((item) => item.id !== id)))
      .catch((err) => console.log(err));
  };

  const applyInternship = () => {
    alert("Your application has been submitted.");
  };

  return (
    <Layout>
      <div className="page-shell">
        <div className="page-container">
          <div className="page-head">
            <div>
              <h2 className="page-header">Internship Opportunities</h2>
              <p className="page-subtitle">Browse current roles, apply for positions, and manage internship listings from one dashboard.</p>
            </div>
          </div>

          {isAdmin && (
            <section className="form-panel">
              <h3 className="section-title">Add Internship</h3>
              <div className="form-group">
                <input className="form-input" name="title" placeholder="Title" value={newInternship.title} onChange={handleChange} />
                <input className="form-input" name="description" placeholder="Description" value={newInternship.description} onChange={handleChange} />
                <input className="form-input" name="duration" placeholder="Duration" value={newInternship.duration} onChange={handleChange} />
                <input className="form-input" name="stipend" placeholder="Stipend" value={newInternship.stipend} onChange={handleChange} />
              </div>
              <button className="btn btn-primary" onClick={addInternship}>Add Internship</button>
            </section>
          )}

          <section className="page-section">
            <h3 className="section-title">Open Internships</h3>
            {internships.length === 0 ? (
              <div className="card"><p className="card-text">No internships are currently listed.</p></div>
            ) : (
              <div className="grid-3">
                {internships.map((internship) => (
                  <div key={internship.id} className="card">
                    <h3 className="card-title">{internship.title}</h3>
                    <p className="card-text">{internship.description}</p>
                    <p className="card-text"><strong>Duration:</strong> {internship.duration}</p>
                    <p className="card-text"><strong>Stipend:</strong> ₹{internship.stipend}</p>
                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "18px" }}>
                      {!isAdmin ? (
                        <button className="btn btn-primary" onClick={() => applyInternship(internship.id)}>Apply</button>
                      ) : (
                        <button className="btn btn-danger" onClick={() => deleteInternship(internship.id)}>Delete</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </Layout>
  );
}

export default InternshipPage;
