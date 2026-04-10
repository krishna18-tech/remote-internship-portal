import { useState } from "react";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`layout-shell ${collapsed ? "sidebar-collapsed" : ""}`}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className="main-content">{children}</main>
    </div>
  );
}

export default Layout;
