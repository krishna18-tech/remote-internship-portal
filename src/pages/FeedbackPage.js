import Navbar from "../components/Navbar";

function FeedbackPage() {

  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  const feedbackList = [
    {
      id: 1,
      intern: "Rahul",
      rating: "4.5",
      comment: "Excellent performance and timely submission."
    },
    {
      id: 2,
      intern: "Anjali",
      rating: "4.0",
      comment: "Good understanding of backend concepts."
    }
  ];

  return (
    <div style={{ backgroundColor: "#f5f7fb", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ padding: "50px" }}>
        <h2 style={headerStyle}>Mentor Feedback</h2>

        <div style={gridStyle}>
          {feedbackList.map((feedback) => (
            <div key={feedback.id} style={cardStyle}>

              <h4>{feedback.intern}</h4>
              <p style={ratingStyle}>Rating: {feedback.rating} ★</p>
              <p style={descStyle}>{feedback.comment}</p>

              {isAdmin && (
                <button style={editBtn}>
                  Edit Feedback
                </button>
              )}

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const headerStyle = {
  fontSize: "26px",
  fontWeight: "700",
  marginBottom: "40px"
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "30px"
};

const cardStyle = {
  background: "white",
  padding: "25px",
  borderRadius: "16px",
  boxShadow: "0px 12px 30px rgba(0,0,0,0.06)"
};

const ratingStyle = {
  color: "#5f5cff",
  fontWeight: "600",
  margin: "10px 0"
};

const descStyle = {
  fontSize: "14px",
  color: "#6b7280",
  marginBottom: "15px"
};

const editBtn = {
  padding: "8px 14px",
  backgroundColor: "#3b82f6",
  border: "none",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer"
};

export default FeedbackPage;