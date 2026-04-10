import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import InternshipPage from "./pages/InternshipPage";
import TasksPage from "./pages/TaskPage";
import FeedbackPage from "./pages/FeedbackPage";

function App(){

return(

<Router>

<Routes>

<Route path="/" element={<Login/>}/>

<Route path="/student" element={<StudentDashboard/>}/>
<Route path="/admin" element={<AdminDashboard/>}/>

<Route path="/internships" element={<InternshipPage/>}/>
<Route path="/tasks" element={<TasksPage/>}/>
<Route path="/feedback" element={<FeedbackPage/>}/>

</Routes>

</Router>

);

}

export default App;