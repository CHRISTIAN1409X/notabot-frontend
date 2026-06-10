export const dashboardStats = [
  {
    label: "Planeadores procesados",
    value: "128",
    delta: "+18 en el periodo",
    tone: "indigo",
  },
  {
    label: "Pendientes",
    value: "14",
    delta: "6 con revision IA",
    tone: "amber",
  },
  {
    label: "Aprobados",
    value: "92",
    delta: "72% de aprobacion",
    tone: "emerald",
  },
  {
    label: "Correcciones enviadas",
    value: "22",
    delta: "promedio 1.8 ciclos",
    tone: "rose",
  },
];

export const pipelineStages = [
  { label: "Recibido", count: 18, color: "bg-sky-400" },
  { label: "Validacion IA", count: 9, color: "bg-accent" },
  { label: "Revision coordinador", count: 7, color: "bg-amber-400" },
  { label: "Pendiente correccion", count: 6, color: "bg-rose-400" },
  { label: "Aprobado", count: 24, color: "bg-emerald-400" },
];

export const systemStatus = {
  label: "Operacion estable",
  semaphore: "green",
  latency: "84ms",
  queue: "3 PDFs",
  model: "NB-Validator 2.1",
};

export const professors = [
  "Dra. Elena Ruiz",
  "Prof. Mateo Salazar",
  "Dra. Laura Pinzon",
  "Prof. Nicolas Rivas",
  "Dra. Paula Medina",
];

export const subjects = [
  "Calculo diferencial",
  "Proyecto integrador I",
  "Investigacion formativa",
  "Bases de datos avanzadas",
  "Etica profesional",
];

export const recentActivity = [
  {
    title: "Planeador aprobado",
    description: "Proyecto integrador I paso a historial academico.",
    time: "Hace 12 min",
    semaphore: "green",
  },
  {
    title: "Observaciones enviadas",
    description: "Bases de datos avanzadas requiere ajuste de rubrica.",
    time: "Hace 28 min",
    semaphore: "yellow",
  },
  {
    title: "Error critico detectado",
    description: "Investigacion formativa no incluye criterios de evaluacion.",
    time: "Hace 41 min",
    semaphore: "red",
  },
  {
    title: "Proceso creado",
    description: "Calculo diferencial ingreso a cola de validacion.",
    time: "Hace 1 h",
    semaphore: "green",
  },
];

export const processes = [
  {
    id: "REV-2026-041",
    professor: "Dra. Elena Ruiz",
    subject: "Calculo diferencial",
    program: "Ingenieria de Sistemas",
    coordinator: "Camila Torres",
    pdfName: "planeador-calculo-diferencial.pdf",
    submittedAt: "2026-06-09 09:18",
    updatedAt: "2026-06-09 10:04",
    status: "Revision coordinador",
    statusKey: "review",
    score: 82,
    semaphore: "yellow",
    errors: 3,
    annotations: 8,
    recommendations: 5,
  },
  {
    id: "REV-2026-040",
    professor: "Prof. Mateo Salazar",
    subject: "Proyecto integrador I",
    program: "Ingenieria Industrial",
    coordinator: "Camila Torres",
    pdfName: "planeador-proyecto-integrador.pdf",
    submittedAt: "2026-06-08 16:40",
    updatedAt: "2026-06-09 08:12",
    status: "Aprobado",
    statusKey: "approved",
    score: 96,
    semaphore: "green",
    errors: 0,
    annotations: 4,
    recommendations: 2,
  },
  {
    id: "REV-2026-039",
    professor: "Dra. Laura Pinzon",
    subject: "Investigacion formativa",
    program: "Psicologia",
    coordinator: "Andres Mejia",
    pdfName: "planeador-investigacion-formativa.pdf",
    submittedAt: "2026-06-08 11:23",
    updatedAt: "2026-06-08 15:55",
    status: "Pendiente correccion",
    statusKey: "correction",
    score: 61,
    semaphore: "red",
    errors: 7,
    annotations: 13,
    recommendations: 9,
  },
  {
    id: "REV-2026-038",
    professor: "Prof. Nicolas Rivas",
    subject: "Bases de datos avanzadas",
    program: "Ingenieria de Software",
    coordinator: "Camila Torres",
    pdfName: "planeador-bases-datos-avanzadas.pdf",
    submittedAt: "2026-06-07 14:12",
    updatedAt: "2026-06-07 17:36",
    status: "Pendiente correccion",
    statusKey: "correction",
    score: 68,
    semaphore: "yellow",
    errors: 5,
    annotations: 11,
    recommendations: 7,
  },
  {
    id: "REV-2026-037",
    professor: "Dra. Paula Medina",
    subject: "Etica profesional",
    program: "Derecho",
    coordinator: "Andres Mejia",
    pdfName: "planeador-etica-profesional.pdf",
    submittedAt: "2026-06-06 10:30",
    updatedAt: "2026-06-06 12:08",
    status: "Aprobado",
    statusKey: "approved",
    score: 91,
    semaphore: "green",
    errors: 0,
    annotations: 5,
    recommendations: 3,
  },
];

export const reviewDetails = {
  "REV-2026-041": {
    ...processes[0],
    summary:
      "El planeador cumple la estructura institucional, pero requiere ajustes en evidencias de aprendizaje, alineacion de competencias y detalle de evaluacion final.",
    errorsList: [
      "Semana 6 no contiene evidencia verificable para el resultado RA-02.",
      "La rubrica final no define niveles de desempeno medibles.",
      "La bibliografia incluye una fuente sin fecha ni editorial.",
    ],
    annotationsList: [
      "La secuencia metodologica es consistente entre semanas 1 y 5.",
      "El componente practico aparece alineado con el microcurriculo.",
      "Las horas de trabajo independiente necesitan mayor granularidad.",
      "El cierre del curso requiere actividad integradora explicita.",
    ],
    recommendationsList: [
      "Agregar criterio de evaluacion cuantificable para RA-02.",
      "Separar evaluacion formativa y sumativa en el cronograma.",
      "Incluir evidencia documental para actividades de laboratorio.",
      "Normalizar la bibliografia con formato institucional.",
    ],
    timeline: [
      { label: "PDF recibido", time: "09:18", state: "complete" },
      { label: "Validacion IA", time: "09:26", state: "complete" },
      { label: "Revision coordinador", time: "10:04", state: "active" },
      { label: "Decision academica", time: "Pendiente", state: "pending" },
    ],
  },
};

export const mockApiReviewResponse = {
  reviewId: "REV-2026-041",
  score: 82,
  status: "Revision coordinador",
  semaphore: "yellow",
  annotations: reviewDetails["REV-2026-041"].annotationsList,
  errors: reviewDetails["REV-2026-041"].errorsList,
  recommendations: reviewDetails["REV-2026-041"].recommendationsList,
};
