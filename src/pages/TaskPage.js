import { useEffect, useState } from "react";
import Layout from "../components/Layout";
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

  useEffect(() => {
    API.get("/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const addTask = () => {
    API.post("/tasks", newTask)
      .then((res) => {
        alert("Task created successfully");
        setTasks([...tasks, res.data]);
        setNewTask({ title: "", description: "", deadline: "", status: "Pending" });
      })
      .catch((err) => console.log(err));
  };

  const markCompleted = (id) => {
    API.put(`/tasks/${id}`, { status: "Completed" })
      .then(() => setTasks(tasks.map((task) => (task.id === id ? { ...task, status: "Completed" } : task))));
  };

  return (
    <Layout>
      <div className="page-shell">
        <div className="page-container">
          <div className="page-head">
            <div>
              <h2 className="page-header">Task Management</h2>
              <p className="page-subtitle">Track your assigned work and update progress easily.</p>
            </div>
          </div>

          {isAdmin && (
            <section className="form-panel">
              <h3 className="section-title">Create New Task</h3>
              <div className="form-group">
                <input className="form-input" name="title" placeholder="Task title" value={newTask.title} onChange={handleChange} />
                <input className="form-input" name="description" placeholder="Description" value={newTask.description} onChange={handleChange} />
                <input className="form-input" name="deadline" placeholder="Deadline" value={newTask.deadline} onChange={handleChange} />
              </div>
              <button className="btn btn-primary" onClick={addTask}>Add Task</button>
            </section>
          )}

          <section className="page-section">
            <h3 className="section-title">Current Tasks</h3>
            {tasks.length === 0 ? (
              <div className="card"><p className="card-text">No tasks assigned yet.</p></div>
            ) : (
              <div className="grid-3">
                {tasks.map((task) => (
                  <div key={task.id} className="card task-card">
                    <h3 className="card-title">{task.title}</h3>
                    <p className="card-text">{task.description}</p>
                    <p className="card-text"><strong>Deadline:</strong> {task.deadline}</p>
                    <p className="card-text"><strong>Status:</strong> {task.status}</p>
                    {!isAdmin && task.status !== "Completed" && (
                      <button className="btn btn-accent" onClick={() => markCompleted(task.id)}>Mark Completed</button>
                    )}
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

export default TasksPage;
