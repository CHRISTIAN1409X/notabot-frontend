import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="enterprise-shell min-h-screen md:flex">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)} />
      <div className="min-w-0 flex-1">
        <TopBar />
        <main className="px-5 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
