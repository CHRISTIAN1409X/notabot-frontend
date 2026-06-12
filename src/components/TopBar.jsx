import { Bell, CircleGauge, LogOut, ShieldCheck } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Semaphore from "./Semaphore";

const titleMap = {
  "/dashboard": {
    title: "Dashboard",
    description: "Gestion centralizada de planeadores academicos",
  },
  "/nuevo-proceso": {
    title: "Nuevo proceso",
    description: "Recepcion y validacion inteligente de PDF academico",
  },
  "/procesos": {
    title: "Procesos activos",
    description: "Seguimiento operativo de revisiones en curso",
  },
  "/historial": {
    title: "Historial",
    description: "Planeadores aprobados y trazabilidad institucional",
  },
  "/settings": {
    title: "Configuracion",
    description: "Parametros de coordinacion y validacion documental",
  },
};

export default function TopBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const routeMeta = titleMap[pathname] ?? {
    title: "Detalle de revision",
    description: "Analisis IA y decision academica del coordinador",
  };

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <header className="flex flex-col gap-4 border-b border-line/80 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="mb-2 inline-flex items-center gap-2 font-mono text-xs font-bold text-indigo-200">
          <ShieldCheck size={15} />
          COORDINACION ACADEMICA
        </p>
        <h1 className="text-2xl font-extrabold text-copy md:text-3xl">{routeMeta.title}</h1>
        <p className="mt-1 text-sm text-muted">{routeMeta.description}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="hidden border border-line bg-ink/55 px-3 py-2 sm:block" style={{ borderRadius: 8 }}>
          <p className="text-xs font-bold text-copy">{user?.name}</p>
          <p className="font-mono text-[10px] font-bold text-muted">{user?.email}</p>
        </div>
        <button className="secondary-button min-h-10 px-3" type="button" onClick={handleLogout}>
          <LogOut size={17} />
          <span className="hidden sm:inline">Cerrar sesion</span>
        </button>
      </div>
    </header>
  );
}
