import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import API from "../api/api";

function FeedbackPage() {

  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  const [feedbackList, setFeedbackList] = useState([]);

  const [newFeedback, setNewFeedback] = useState({
    internName: "",
    rating: "",
    comment: ""
  });



  // load feedback from backend
  useEffect(() => {

    API.get("/feedback")

      .then(res => {

        setFeedbackList(res.data);

      })

      .catch(err => console.log(err));

  }, []);




  // handle input change
  const handleChange = (e) => {

    setNewFeedback({

      ...newFeedback,

      [e.target.name]: e.target.value

    });

  };




  // save feedback
  const addFeedback = () => {

    API.post("/feedback", newFeedback)

      .then(res => {

        alert("Feedback saved");

        setFeedbackList([

          ...feedbackList,

          res.data

        ]);

        setNewFeedback({

          internName: "",

          rating: "",

          comment: ""

        });

      });

  };




  return (

    <div style={{
      backgroundColor: "#f5f7fb",
      minHeight: "100vh"
    }}>

      <Navbar />



      <div style={{ padding: "50px" }}>

        <h2 style={headerStyle}>

          Mentor Feedback

        </h2>



        {/* admin form */}
        {isAdmin && (

          <div style={formBox}>

            <h3>Add Feedback</h3>



            <input

              name="internName"

              placeholder="Student Name"

              value={newFeedback.internName}

              onChange={handleChange}

              style={input}

            />



            <input

              name="rating"

              placeholder="Rating (1-5)"

              value={newFeedback.rating}

              onChange={handleChange}

              style={input}

            />



            <input

              name="comment"

              placeholder="Comment"

              value={newFeedback.comment}

              onChange={handleChange}

              style={input}

            />



            <button

              style={editBtn}

              onClick={addFeedback}

            >
              Save Feedback
            </button>

          </div>

        )}




        {/* feedback list */}
        <div style={gridStyle}>

          {feedbackList.map(f => (

            <div key={f.id} style={cardStyle}>

              <h4>{f.internName}</h4>

              <p style={ratingStyle}>

                Rating: {f.rating} ★

              </p>

              <p style={descStyle}>

                {f.comment}

              </p>

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