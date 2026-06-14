import { ArrowRight, FileCheck2, KeyRound, LockKeyhole, Mail, ShieldCheck, University } from "lucide-react";
import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const response = await login({ email, password });

    setIsSubmitting(false);

    if (!response.ok) {
      setError(response.message);
      return;
    }

    navigate(location.state?.from?.pathname ?? "/dashboard", { replace: true });
  };

  return (
    <main className="enterprise-shell grid min-h-screen place-items-center px-5 py-10">
      <section className="grid w-full max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="panel p-6 sm:p-8">
          <div className="mb-8 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center bg-accent text-white" style={{ borderRadius: 8 }}>
              <University size={24} />
            </div>
            <div>
              <p className="text-xl font-extrabold text-copy">NotaBot</p>
              <p className="font-mono text-xs font-bold text-muted">VALIDACION ACADEMICA</p>
            </div>
          </div>

          <div>
            <p className="mb-3 inline-flex items-center gap-2 font-mono text-xs font-bold text-indigo-200">
              <ShieldCheck size={15} />
              ACCESO COORDINADOR
            </p>
            <h1 className="text-3xl font-extrabold text-copy sm:text-4xl">Gestion de planeadores academicos</h1>
            <p className="mt-3 max-w-md text-sm leading-6 text-muted">
              Plataforma SaaS para validar, observar y aprobar planeadores PDF con asistencia inteligente.
            </p>
          </div>

          <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
            <label className="grid gap-2">
              <span className="text-sm font-bold text-copy">Correo institucional</span>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                <input
                  className="input-shell pl-10"
                  placeholder="correo institucional"
                  type="email"
                  value={email}
                  autoComplete="email"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-bold text-copy">Contrasena</span>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                <input
                  className="input-shell pl-10"
                  placeholder="contraseña"
                  type="password"
                  value={password}
                  autoComplete="current-password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </label>

            {error && (
              <div className="border border-rose-300/30 bg-rose-300/10 px-4 py-3 text-sm font-bold text-rose-200 transition duration-200" style={{ borderRadius: 8 }}>
                {error}
              </div>
            )}

            <button className="primary-button mt-2" type="submit" disabled={isSubmitting}>
              <LockKeyhole size={18} />
              {isSubmitting ? "Validando acceso..." : "Iniciar sesion"}
              <ArrowRight size={18} />
            </button>
          </form>
        </div>

        <aside className="grid gap-4">
          <div className="panel p-7">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 place-items-center border border-indigo-300/30 bg-indigo-300/10 text-indigo-200" style={{ borderRadius: 8 }}>
                <FileCheck2 size={24} />
              </span>
              <div>
                <p className="font-mono text-xs font-bold text-indigo-200">FLUJO INSTITUCIONAL</p>
                <h2 className="mt-2 text-2xl font-extrabold text-copy">Del PDF del profesor a una decision trazable</h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
                  El coordinador crea un proceso, sube el planeador y recibe un analisis con score, errores,
                  anotaciones, recomendaciones y semaforo academico.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {["Recepcion PDF", "Validacion IA", "Decision academica"].map((item, index) => (
              <div className="soft-panel p-4" key={item}>
                <span className="font-mono text-xs font-bold text-muted">0{index + 1}</span>
                <p className="mt-2 font-bold text-copy">{item}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
