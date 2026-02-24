import { useState } from "react";
import Sidebar from "./Sidebar";

function Layout({ children }) {

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ display: "flex", backgroundColor: "#f5f7fb", minHeight: "100vh" }}>

      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div style={{
        marginLeft: collapsed ? "80px" : "240px",
        padding: "50px",
        width: "100%",
        transition: "margin-left 0.3s ease"
      }}>
        {children}
      </div>

    </div>
  );
}

export default Layout;