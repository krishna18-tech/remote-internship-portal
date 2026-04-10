import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../api/api";

function FeedbackPage() {
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";
  const [feedbackList, setFeedbackList] = useState([]);
  const [newFeedback, setNewFeedback] = useState({ internName: "", rating: "", comment: "" });

  useEffect(() => {
    API.get("/feedback")
      .then((res) => setFeedbackList(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => setNewFeedback({ ...newFeedback, [e.target.name]: e.target.value });

  const addFeedback = () => {
    API.post("/feedback", newFeedback)
      .then((res) => {
        alert("Feedback saved successfully");
        setFeedbackList([res.data, ...feedbackList]);
        setNewFeedback({ internName: "", rating: "", comment: "" });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Layout>
      <div className="page-shell">
        <div className="page-container">
          <div className="page-head">
            <div>
              <h2 className="page-header">Mentor Feedback</h2>
              <p className="page-subtitle">Capture feedback from mentors and keep student performance visible.</p>
            </div>
          </div>

          {isAdmin && (
            <section className="form-panel">
              <h3 className="section-title">Add Feedback</h3>
              <div className="form-group">
                <input className="form-input" name="internName" placeholder="Student Name" value={newFeedback.internName} onChange={handleChange} />
                <input className="form-input" name="rating" placeholder="Rating (1-5)" value={newFeedback.rating} onChange={handleChange} />
                <input className="form-input" name="comment" placeholder="Comment" value={newFeedback.comment} onChange={handleChange} />
              </div>
              <button className="btn btn-accent" onClick={addFeedback}>Save Feedback</button>
            </section>
          )}

          <section className="page-section">
            <h3 className="section-title">Recent Feedback</h3>
            {feedbackList.length === 0 ? (
              <div className="card"><p className="card-text">No feedback entries yet.</p></div>
            ) : (
              <div className="grid-2">
                {feedbackList.map((feedback) => (
                  <div key={feedback.id} className="card">
                    <h3 className="card-title">{feedback.internName}</h3>
                    <p className="card-text"><strong>Rating:</strong> {feedback.rating} ★</p>
                    <p className="card-text">{feedback.comment}</p>
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

export default FeedbackPage;
