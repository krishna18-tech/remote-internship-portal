import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import API from "../api/api";

function StudentDashboard(){

const navigate = useNavigate();

const [internships,setInternships] = useState([]);
const [applied,setApplied] = useState([]);

useEffect(()=>{

API.get("/internships")
.then(res=>{
setInternships(res.data);
})
.catch(err=>console.log(err));

API.get("/applications")
.then(res=>{
setApplied(res.data);
})
.catch(()=>{});

},[]);



const applyInternship = (id)=>{

API.post("/applications",{
studentId:1,
internshipId:id,
status:"Applied"
})
.then(()=>{
alert("Applied Successfully");
})
.catch(()=>{
alert("error");
});

};



return(

<Layout>

<h2 style={title}>Student Dashboard</h2>

<p style={subtitle}>
Monitor your internships, applications and performance
</p>


{/* STATISTICS */}
<div style={statsGrid}>

<StatCard
number={internships.length}
label="Internships Available"
/>

<StatCard
number={applied.length}
label="Applications"
/>

<StatCard
number="4.8★"
label="Rating"
/>

<StatCard
number="92%"
label="Progress"
/>

</div>



{/* QUICK ACTION */}
<h3 style={sectionTitle}>
Quick Actions
</h3>

<div style={quickGrid}>

<ActionCard
title="Browse Internships"
desc="View available opportunities"
onClick={()=>navigate("/internships")}
/>

<ActionCard
title="My Tasks"
desc="Track assigned tasks"
onClick={()=>navigate("/tasks")}
/>

<ActionCard
title="Feedback"
desc="View mentor feedback"
onClick={()=>navigate("/feedback")}
/>

</div>



{/* INTERNSHIPS */}
<h3 style={sectionTitle}>
Latest Internships
</h3>


<div style={internGrid}>

{internships.slice(0,4).map(item=>(

<div key={item.id} style={internCard}>

<h4>{item.title}</h4>

<p style={gray}>
{item.description}
</p>

<p>
Duration: {item.duration}
</p>

<p>
₹ {item.stipend}
</p>


<button
style={applyBtn}
onClick={()=>applyInternship(item.id)}
>

Apply

</button>


</div>

))}

</div>



{/* PROGRESS SECTION */}
<h3 style={sectionTitle}>
My Progress
</h3>


<div style={progressBox}>

<div style={progressItem}>
HTML
<div style={bar}>
<div style={{...fill,width:"90%"}}></div>
</div>
</div>


<div style={progressItem}>
React
<div style={bar}>
<div style={{...fill,width:"75%"}}></div>
</div>
</div>


<div style={progressItem}>
Database
<div style={bar}>
<div style={{...fill,width:"65%"}}></div>
</div>
</div>

</div>



</Layout>

);

}



function StatCard({number,label}){

return(

<div style={statCard}>

<h2>{number}</h2>

<p>{label}</p>

</div>

);

}



function ActionCard({title,desc,onClick}){

return(

<div
style={actionCard}
onClick={onClick}
>

<h4>{title}</h4>

<p style={gray}>
{desc}
</p>

<button style={btn}>
Open
</button>

</div>

);

}



/* styles */

const title={
fontSize:"28px",
fontWeight:"700"
};

const subtitle={
color:"#6b7280",
marginBottom:"35px"
};



const statsGrid={
display:"grid",
gridTemplateColumns:"repeat(4,1fr)",
gap:"20px",
marginBottom:"40px"
};



const statCard={

background:"linear-gradient(135deg,#5f5cff,#7c3aed)",
color:"white",
padding:"20px",
borderRadius:"12px"

};



const quickGrid={

display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:"20px",
marginBottom:"40px"

};



const actionCard={

background:"white",
padding:"20px",
borderRadius:"12px",
boxShadow:"0 8px 20px rgba(0,0,0,0.05)",
cursor:"pointer"

};



const internGrid={

display:"grid",
gridTemplateColumns:"repeat(2,1fr)",
gap:"20px",
marginBottom:"40px"

};



const internCard={

background:"white",
padding:"20px",
borderRadius:"12px",
boxShadow:"0 8px 20px rgba(0,0,0,0.05)"

};



const progressBox={

background:"white",
padding:"25px",
borderRadius:"12px",
boxShadow:"0 8px 20px rgba(0,0,0,0.05)"

};



const progressItem={
marginBottom:"15px"
};



const bar={

background:"#eee",
height:"8px",
borderRadius:"10px"

};



const fill={

background:"#5f5cff",
height:"8px",
borderRadius:"10px"

};



const sectionTitle={
marginBottom:"15px"
};



const btn={

marginTop:"10px",
padding:"6px 12px",
background:"#5f5cff",
color:"white",
border:"none",
borderRadius:"6px"

};



const applyBtn={

marginTop:"10px",
padding:"6px 12px",
background:"green",
color:"white",
border:"none",
borderRadius:"6px"

};



const gray={
color:"#6b7280"
};



export default StudentDashboard;
