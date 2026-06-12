import {
  FileClock,
  FilePlus2,
  History,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  University,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Procesos activos", to: "/procesos", icon: FileClock },
  { label: "Historial", to: "/historial", icon: History },
  { label: "Nuevo proceso", to: "/nuevo-proceso", icon: FilePlus2 },
  { label: "Configuracion", to: "/settings", icon: Settings },
];

export default function Sidebar({ collapsed, onToggle }) {
  return (
    <aside
      className={`flex shrink-0 flex-col border-line bg-ink/88 p-3 backdrop-blur transition-all duration-300 md:min-h-screen md:border-r ${
        collapsed ? "md:w-[84px]" : "md:w-64"
      }`}
    >
      <div className="flex items-center gap-3 px-2 py-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center bg-accent text-white" style={{ borderRadius: 8 }}>
          <University size={22} />
        </div>
        <div className={`${collapsed ? "md:hidden" : ""}`}>
          <p className="font-extrabold text-copy">NotaBot</p>
          <p className="font-mono text-xs font-bold text-muted">ACADEMIC SaaS</p>
        </div>
      </div>

      <nav className="mt-6 flex gap-2 overflow-x-auto md:grid md:overflow-visible" aria-label="Navegacion principal">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              className={({ isActive }) =>
                `flex min-h-11 shrink-0 items-center gap-3 px-3 text-sm font-bold transition duration-200 ${
                  isActive
                    ? "border border-accent/40 bg-accent/15 text-copy"
                    : "border border-transparent text-muted hover:border-line hover:bg-panel/65 hover:text-copy"
                } ${collapsed ? "md:justify-center" : ""}`
              }
              key={item.to}
              style={{ borderRadius: 8 }}
              to={item.to}
            >
              <Icon size={18} />
              <span className={`${collapsed ? "md:hidden" : ""}`}>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto hidden pt-6 md:block">
        <button className="icon-button" onClick={onToggle} type="button" aria-label="Colapsar sidebar">
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>
    </aside>
  );
}
