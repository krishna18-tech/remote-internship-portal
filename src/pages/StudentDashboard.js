import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import API from "../api/api";

function StudentDashboard() {

  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  // store internships from backend
  const [internships, setInternships] = useState([]);

  // fetch internships from Spring Boot
  useEffect(() => {

    API.get("/internships")
      .then(res => {
        console.log(res.data);
        setInternships(res.data);
      })
      .catch(err => console.log(err));

  }, []);

  // apply internship function
  const applyInternship = (internshipId) => {

    API.post("/applications", {
      studentId: 1,
      internshipId: internshipId,
      status: "Applied"
    })
    .then(res => {
      alert("Application submitted successfully");
    })
    .catch(err => {
      console.log(err);
      alert("Error applying internship");
    });

  };

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
        Student Dashboard
      </h2>

      <p style={{ color: "#6b7280", marginBottom: "40px" }}>
        Welcome back! Track your internships, tasks, and feedback here.
      </p>

      {/* Stats Section */}
      <div style={{ display: "flex", gap: "25px", marginBottom: "50px" }}>

        {/* Active internships count from database */}
        <div style={{
          flex: 1,
          background: "white",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0px 10px 25px rgba(0,0,0,0.05)"
        }}>

          <div style={{
            fontSize: "30px",
            fontWeight: "700",
            color: "#5f5cff"
          }}>
            {internships.filter(i => i.title !== null).length}
          </div>

          <div style={{ fontSize: "14px", color: "#6b7280" }}>
            Active Internships
          </div>

        </div>


        {/* pending tasks placeholder */}
        <div style={{
          flex: 1,
          background: "white",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0px 10px 25px rgba(0,0,0,0.05)"
        }}>

          <div style={{
            fontSize: "30px",
            fontWeight: "700",
            color: "#5f5cff"
          }}>
            0
          </div>

          <div style={{ fontSize: "14px", color: "#6b7280" }}>
            Pending Tasks
          </div>

        </div>


        {/* rating placeholder */}
        <div style={{
          flex: 1,
          background: "white",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0px 10px 25px rgba(0,0,0,0.05)"
        }}>

          <div style={{
            fontSize: "30px",
            fontWeight: "700",
            color: "#5f5cff"
          }}>
            4.8★
          </div>

          <div style={{ fontSize: "14px", color: "#6b7280" }}>
            Average Rating
          </div>

        </div>

      </div>



      {/* Internship Cards */}
      <h3 style={{ marginBottom: "20px" }}>
        Available Internships
      </h3>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "20px",
        marginBottom: "50px"
      }}>

        {internships
          .filter(i => i.title !== null)
          .map((item, index) => (

            <div
              key={item.id}
              style={{
                background: "white",
                padding: "25px",
                borderRadius: "14px",
                boxShadow: "0px 8px 20px rgba(0,0,0,0.05)"
              }}
            >

              <h4>{item.title}</h4>

              <p style={{ color: "#6b7280" }}>
                {item.description}
              </p>

              <p>
                Duration: {item.duration}
              </p>

              <p>
                Stipend: ₹ {item.stipend}
              </p>


              <button
                style={{
                  marginTop: "10px",
                  padding: "8px 14px",
                  background: "green",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}

                onClick={() => applyInternship(item.id)}
              >
                Apply
              </button>

            </div>

        ))}

      </div>



      {/* Feature Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "30px"
      }}>

        {[
          {
            title: "Internships",
            desc: "Explore available internship opportunities.",
            path: "/internships"
          },

          {
            title: "My Tasks",
            desc: "Track assigned tasks and progress.",
            path: "/tasks"
          },

          {
            title: "Feedback",
            desc: "View mentor feedback and ratings.",
            path: "/feedback"
          }

        ].map((card, index) => (

          <div
            key={index}
            style={featureCard(index)}

            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
          >

            <h4>{card.title}</h4>

            <p style={{
              color: "#6b7280",
              marginBottom: "20px"
            }}>
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

export default StudentDashboard;