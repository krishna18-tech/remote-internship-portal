import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import API from "../api/api";

function AdminDashboard() {

  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  // store internships from backend
  const [internships, setInternships] = useState([]);

  // fetch internships count
  useEffect(() => {

    API.get("/internships")
      .then(res => {
        setInternships(res.data);
      })
      .catch(err => console.log(err));

  }, []);


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

        {/* interns placeholder */}
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
            Total Interns
          </div>

        </div>



        {/* dynamic internship count */}
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



        {/* tasks placeholder */}
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
            Tasks Assigned
          </div>

        </div>

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
            desc: "Manage internship postings.",
            path: "/internships"
          },

          {
            title: "Tasks",
            desc: "Assign and monitor tasks.",
            path: "/tasks"
          },

          {
            title: "Feedback",
            desc: "Review intern performance.",
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

export default AdminDashboard;