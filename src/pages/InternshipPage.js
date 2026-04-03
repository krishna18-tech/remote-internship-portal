import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import API from "../api/api";

function InternshipPage() {

  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  const [internships, setInternships] = useState([]);

  const [newInternship, setNewInternship] = useState({
    title: "",
    description: "",
    duration: "",
    stipend: ""
  });



  /* load internships from backend */
  useEffect(() => {

    API.get("/internships")
      .then(res => {
        setInternships(res.data);
      })
      .catch(err => console.log(err));

  }, []);



  /* handle input change */
  const handleChange = (e) => {

    setNewInternship({
      ...newInternship,
      [e.target.name]: e.target.value
    });

  };



  /* create internship (admin) */
  const addInternship = () => {

    API.post("/internships", newInternship)

      .then(res => {

        alert("Internship added");

        setInternships([...internships, res.data]);

        setNewInternship({
          title: "",
          description: "",
          duration: "",
          stipend: ""
        });

      })

      .catch(err => console.log(err));

  };



  /* delete internship */
  const deleteInternship = (id) => {

    API.delete(`/internships/${id}`)

      .then(() => {

        setInternships(
          internships.filter(i => i.id !== id)
        );

      })

      .catch(err => console.log(err));

  };



  /* apply internship */
  const applyInternship = (id) => {

    alert("Application submitted successfully");

  };



  return (

    <div style={{
      backgroundColor: "#f5f7fb",
      minHeight: "100vh"
    }}>

      <Navbar />



      <div style={{ padding: "50px" }}>

        <h2 style={headerStyle}>
          Internship Opportunities
        </h2>



        {/* ADMIN FORM */}
        {isAdmin && (

          <div style={formBox}>

            <h3>Add Internship</h3>

            <input
              name="title"
              placeholder="Title"
              value={newInternship.title}
              onChange={handleChange}
              style={input}
            />

            <input
              name="description"
              placeholder="Description"
              value={newInternship.description}
              onChange={handleChange}
              style={input}
            />

            <input
              name="duration"
              placeholder="Duration"
              value={newInternship.duration}
              onChange={handleChange}
              style={input}
            />

            <input
              name="stipend"
              placeholder="Stipend"
              value={newInternship.stipend}
              onChange={handleChange}
              style={input}
            />


            <button
              style={primaryBtn}
              onClick={addInternship}
            >
              Add Internship
            </button>

          </div>

        )}



        {/* INTERNSHIP LIST */}
        <div style={gridStyle}>

          {internships.map((internship) => (

            <div
              key={internship.id}
              style={cardStyle}
            >

              <h4>{internship.title}</h4>

              <p style={descStyle}>
                {internship.description}
              </p>

              <p style={descStyle}>
                Duration: {internship.duration}
              </p>

              <p style={descStyle}>
                Stipend: ₹ {internship.stipend}
              </p>



              <div style={{ marginTop: "15px" }}>

                {!isAdmin && (

                  <button
                    style={primaryBtn}
                    onClick={() =>
                      applyInternship(internship.id)
                    }
                  >
                    Apply
                  </button>

                )}



                {isAdmin && (

                  <button
                    style={deleteBtn}
                    onClick={() =>
                      deleteInternship(internship.id)
                    }
                  >
                    Delete
                  </button>

                )}

              </div>


            </div>

          ))}

        </div>

      </div>

    </div>

  );

}



/* styles */

const formBox = {

  background: "white",

  padding: "25px",

  borderRadius: "12px",

  marginBottom: "40px",

  display: "flex",

  flexDirection: "column",

  gap: "10px",

  width: "350px"

};



const input = {

  padding: "8px",

  borderRadius: "6px",

  border: "1px solid #ccc"

};



const headerStyle = {

  fontSize: "26px",

  fontWeight: "700",

  marginBottom: "30px"

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



const primaryBtn = {

  padding: "8px 14px",

  background: "linear-gradient(90deg, #5f5cff, #7c3aed)",

  border: "none",

  borderRadius: "6px",

  color: "white",

  cursor: "pointer"

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