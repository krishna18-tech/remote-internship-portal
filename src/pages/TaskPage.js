import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import API from "../api/api";

function TasksPage() {

  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    deadline: "",
    status: "Pending"
  });



  /* load tasks from backend */
  useEffect(() => {

    API.get("/tasks")

      .then(res => {

        setTasks(res.data);

      })

      .catch(err => console.log(err));

  }, []);



  /* input change */
  const handleChange = (e) => {

    setNewTask({

      ...newTask,

      [e.target.name]: e.target.value

    });

  };



  /* add task (admin) */
  const addTask = () => {

    API.post("/tasks", newTask)

      .then(res => {

        alert("Task created");

        setTasks([...tasks, res.data]);

        setNewTask({

          title: "",

          description: "",

          deadline: "",

          status: "Pending"

        });

      })

      .catch(err => console.log(err));

  };



  /* update task status */
  const markCompleted = (id) => {

    API.put(`/tasks/${id}`, {

      status: "Completed"

    })

      .then(() => {

        setTasks(

          tasks.map(t =>

            t.id === id

              ? { ...t, status: "Completed" }

              : t

          )

        );

      });

  };



  return (

    <div style={pageStyle}>

      <Navbar />



      <div style={{ padding: "50px" }}>

        <h2 style={headerStyle}>

          Task Management

        </h2>



        {/* ADMIN FORM */}
        {isAdmin && (

          <div style={formBox}>

            <h3>Create Task</h3>



            <input

              name="title"

              placeholder="Task title"

              value={newTask.title}

              onChange={handleChange}

              style={input}

            />



            <input

              name="description"

              placeholder="Description"

              value={newTask.description}

              onChange={handleChange}

              style={input}

            />



            <input

              name="deadline"

              placeholder="Deadline"

              value={newTask.deadline}

              onChange={handleChange}

              style={input}

            />



            <button

              style={primaryBtn}

              onClick={addTask}

            >

              Add Task

            </button>

          </div>

        )}



        {/* TASK LIST */}
        {tasks.length === 0 && (

          <p>No tasks assigned yet</p>

        )}



        <div style={gridStyle}>

          {tasks.map(task => (

            <div key={task.id} style={cardStyle}>



              <h4>{task.title}</h4>



              <p style={descStyle}>

                {task.description}

              </p>



              <p style={descStyle}>

                Deadline: {task.deadline}

              </p>



              <p style={descStyle}>

                Status: {task.status}

              </p>



              {!isAdmin && task.status !== "Completed" && (

                <button

                  style={primaryBtn}

                  onClick={() =>

                    markCompleted(task.id)

                  }

                >

                  Mark Completed

                </button>

              )}



            </div>

          ))}

        </div>

      </div>

    </div>

  );

}



/* styles */

const pageStyle = {

  backgroundColor: "#f5f7fb",

  minHeight: "100vh"

};



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



export default TasksPage;
