import Navbar from "../components/Navbar";

function InternshipPage() {

  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  const internships = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "TechNova Pvt Ltd",
      duration: "3 Months",
      status: "Open"
    },
    {
      id: 2,
      title: "Backend Developer Intern",
      company: "CloudCore Solutions",
      duration: "6 Months",
      status: "Open"
    },
    {
      id: 3,
      title: "UI/UX Designer Intern",
      company: "DesignHub",
      duration: "2 Months",
      status: "Closed"
    }
  ];

  return (
    <div style={{ backgroundColor: "#f5f7fb", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ padding: "50px" }}>
        <h2 style={headerStyle}>Internship Opportunities</h2>

        <div style={gridStyle}>
          {internships.map((internship) => (
            <div key={internship.id} style={cardStyle}>

              <h4>{internship.title}</h4>
              <p style={descStyle}>{internship.company}</p>
              <p style={descStyle}>Duration: {internship.duration}</p>

              <div style={{
                ...statusStyle,
                backgroundColor:
                  internship.status === "Open" ? "#dcfce7" : "#fee2e2",
                color:
                  internship.status === "Open" ? "#166534" : "#991b1b"
              }}>
                {internship.status}
              </div>

              <div style={{ marginTop: "15px" }}>

                {!isAdmin && internship.status === "Open" && (
                  <button style={primaryBtn}>
                    Apply Now
                  </button>
                )}

                {isAdmin && (
                  <>
                    <button style={editBtn}>Edit</button>
                    <button style={deleteBtn}>Delete</button>
                  </>
                )}

              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Styles */
const headerStyle = {
  fontSize: "26px",
  fontWeight: "700",
  marginBottom: "40px"
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "30px"
};

const cardStyle = {
  background: "white",
  padding: "25px",
  borderRadius: "16px",
  boxShadow: "0px 12px 30px rgba(0,0,0,0.06)"
};

const descStyle = {
  fontSize: "14px",
  color: "#6b7280"
};

const statusStyle = {
  marginTop: "10px",
  padding: "5px 10px",
  display: "inline-block",
  borderRadius: "6px",
  fontSize: "12px",
  fontWeight: "600"
};

const primaryBtn = {
  padding: "8px 14px",
  background: "linear-gradient(90deg, #5f5cff, #7c3aed)",
  border: "none",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer"
};

const editBtn = {
  padding: "8px 14px",
  backgroundColor: "#3b82f6",
  border: "none",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer",
  marginRight: "10px"
};

const deleteBtn = {
  padding: "8px 14px",
  backgroundColor: "#ef4444",
  border: "none",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer"
};

export default InternshipPage;