import { CheckCircle2, Clock3, Files, MessageSquareWarning, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ActivityFeed from "../components/ActivityFeed";
import Pipeline from "../components/Pipeline";
import Semaphore from "../components/Semaphore";
import StatCard from "../components/StatCard";
import { fetchDashboard } from "../services/api";

const statIcons = [Files, Clock3, CheckCircle2, MessageSquareWarning];

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchDashboard().then(setDashboard);
  }, []);

  if (!dashboard) {
    return <div className="panel p-6 text-muted">Cargando dashboard...</div>;
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboard.stats.map((stat, index) => (
          <StatCard icon={statIcons[index]} key={stat.label} {...stat} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <Pipeline stages={dashboard.pipeline} />

        <section className="panel p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-extrabold text-copy">Estado global del sistema</h2>
              <p className="mt-1 text-sm text-muted">Validacion documental y cola de procesos</p>
            </div>
            <Semaphore value={dashboard.system.semaphore} />
          </div>

          <div className="mt-6 grid gap-3">
            {[
              ["Latencia IA", dashboard.system.latency],
              ["Cola actual", dashboard.system.queue],
              ["Modelo", dashboard.system.model],
            ].map(([label, value]) => (
              <div className="soft-panel flex items-center justify-between gap-4 p-3" key={label}>
                <span className="text-sm text-muted">{label}</span>
                <span className="font-mono text-xs font-bold text-copy">{value}</span>
              </div>
            ))}
          </div>

          <Link className="primary-button mt-5 w-full" to="/nuevo-proceso">
            <Plus size={18} />
            Crear nuevo proceso
          </Link>
        </section>
      </section>

      <ActivityFeed items={dashboard.activity} />
    </div>
  );
}
