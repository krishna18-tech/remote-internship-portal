import Navbar from "../components/Navbar";

function TasksPage() {

  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  const tasks = [
    { id: 1, title: "Build Landing Page", intern: "Rahul", status: "Completed" },
    { id: 2, title: "API Integration", intern: "Anjali", status: "Pending" },
    { id: 3, title: "Database Design", intern: "Kiran", status: "In Progress" }
  ];

  return (
    <div style={{ backgroundColor: "#f5f7fb", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ padding: "50px" }}>
        <h2 style={headerStyle}>Task Management</h2>

        <div style={gridStyle}>
          {tasks.map((task) => (
            <div key={task.id} style={cardStyle}>

              <h4>{task.title}</h4>

              {isAdmin && (
                <p style={descStyle}>Assigned to: {task.intern}</p>
              )}

              <p style={descStyle}>Status: {task.status}</p>

              {!isAdmin && (
                <button style={primaryBtn}>
                  Mark as Completed
                </button>
              )}

              {isAdmin && (
                <button style={editBtn}>
                  Update Status
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
  color: "#6b7280",
  marginBottom: "15px"
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
  cursor: "pointer"
};

export default TasksPage;