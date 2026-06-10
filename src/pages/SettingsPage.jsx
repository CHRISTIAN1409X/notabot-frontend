import { Database, GraduationCap, SlidersHorizontal } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="mx-auto grid max-w-5xl gap-5">
      <section className="panel p-5">
        <h2 className="text-xl font-extrabold text-copy">Configuracion institucional</h2>
        <p className="mt-1 text-sm text-muted">Parametros de coordinacion para la futura conexion API.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "API",
            description: "Modo simulacion activo",
            icon: Database,
          },
          {
            title: "Facultades",
            description: "5 programas conectados",
            icon: GraduationCap,
          },
          {
            title: "Reglas IA",
            description: "Rubrica institucional v2",
            icon: SlidersHorizontal,
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <article className="panel p-5" key={item.title}>
              <span className="grid h-11 w-11 place-items-center border border-indigo-300/30 bg-indigo-300/10 text-indigo-200" style={{ borderRadius: 8 }}>
                <Icon size={20} />
              </span>
              <h3 className="mt-5 font-extrabold text-copy">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
            </article>
          );
        })}
      </section>
    </div>
  );
}
