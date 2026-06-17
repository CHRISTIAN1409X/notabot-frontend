import api from "./apiAxios";

function getSemaphore(score) {
  if (score == null) return "green";
  if (score >= 8) return "green";
  if (score >= 6) return "yellow";
  return "red";
}

function normalizeProcess(item) {
  return {
    id: item.uuid,
    pdfName: item.pdfName,
    professor: item.professor,
    subject: item.subjectName,
    program: "",
    coordinator: "",
    score: Math.round(item.score),
    semaphore: getSemaphore(item.score),
    status: item.status,
    statusKey: item.statusKey,
    submittedAt: item.submittedAt,
    updatedAt: item.updatedAt,
  };
}

export const verifySession = async () => {
  const response = await api.get("/api/auth/verify");

  if (response.status == 200) {
    return response.data;
  }
  throw new Error("Unauthirized");
};

export const getConsultParams = async (uri, options = {}) => {
  const response = await api.get(uri, options);

  if (response.status == 200) {
    return response.data;
  }
  throw new Error(`**********ERROR AL HACER LA CONSULTA A ${uri}`);
};

export const postConsult = async (uri, body) => {
  const response = await api.post(uri, body);

  if (response.status === 200 || response.status === 204) {
    return response.data;
  }
  throw new Error(`**********ERROR AL HACER LA CONSULTA A ${uri}`);
};

export async function fetchIaAnalysis(uuid) {
  return getConsultParams(`/ia/${uuid}`);
}

export async function fetchDashboard() {
  const allProcesses = await fetchProcesses("all");

  const approved = allProcesses.filter((item) => item.statusKey === "approved");
  const correction = allProcesses.filter(
    (item) => item.statusKey === "correction"
  );
  const review = allProcesses.filter((item) => item.statusKey === "review");

  const stats = [
    {
      label: "Planeadores procesados",
      value: String(allProcesses.length),
      delta: "Procesos registrados",
      tone: "indigo",
    },
    {
      label: "Pendientes",
      value: String(review.length + correction.length),
      delta: "En revision o correccion",
      tone: "amber",
    },
    {
      label: "Aprobados",
      value: String(approved.length),
      delta: "Procesos finalizados",
      tone: "emerald",
    },
    {
      label: "Correcciones enviadas",
      value: String(correction.length),
      delta: "Pendientes del profesor",
      tone: "rose",
    },
  ];

  const pipeline = [
    {
      label: "Revision coordinador",
      count: review.length,
      color: "bg-accent",
    },
    {
      label: "Pendiente correccion",
      count: correction.length,
      color: "bg-rose-400",
    },
    {
      label: "Aprobado",
      count: approved.length,
      color: "bg-emerald-400",
    },
  ];

  const activity = allProcesses
    .slice(-5)
    .reverse()
    .map((item) => ({
      title: item.subject || item.pdfName,
      description: `${item.professor} - ${item.status}`,
      time: "Reciente",
      semaphore: item.semaphore || "green",
    }));

  return {
    stats,
    pipeline,
    activity,
    system: {
      label: "Operación estable",
      semaphore: "green",
      latency: "84ms",
      queue: "3 PDFs",
      model: "NB-Validator 2.1",
    },
  };
}

export async function fetchProcesses(type = "active") {
  const data = await getConsultParams("/ia");
  const items = data.map(normalizeProcess);

  if (type === "history") {
    return items.filter((p) => p.statusKey === "approved");
  }

  if (type === "all") {
    return items;
  }

  return items.filter((p) => p.statusKey !== "approved");
}

export async function fetchReviewDetail(id) {
  return null;
}

export async function createReviewProcess(payload) {
  const review = {
    id: `REV-${Date.now()}`,
    reviewId: `REV-${Date.now()}`,
    ...payload,
    pdfUrl: payload.pdfUrl,
    score: 94,
    semaphore: "green",
    status: "Revision coordinador",
    statusKey: "review",
    errors: [
      "No se detectaron errores criticos en la validacion inicial.",
    ],
    annotations: [
      "El PDF fue cargado exitosamente.",
      "Pendiente analisis IA detallado.",
    ],
    recommendations: [
      "Verificar resultados de aprendizaje.",
      "Validar rubricas de evaluacion.",
    ],
    summary:
      "El documento fue cargado correctamente y se encuentra pendiente de revision academica.",
    errorsList: [
      "No se detectaron errores criticos en la validacion inicial.",
    ],
    annotationsList: [
      "El PDF fue cargado exitosamente.",
      "Pendiente analisis IA detallado.",
    ],
    recommendationsList: [
      "Verificar resultados de aprendizaje.",
      "Validar rubricas de evaluacion.",
    ],
    timeline: [
      { label: "PDF recibido", time: "Ahora", state: "complete" },
      { label: "Validacion IA", time: "En proceso", state: "active" },
      {
        label: "Revision coordinador",
        time: "Pendiente",
        state: "pending",
      },
    ],
  };

  return review;
}

export async function approveReview(id) {
  await postConsult(`/ia/${id}/approve`);
  return {
    id,
    status: "Aprobado",
    statusKey: "approved",
    movedToHistory: true,
  };
}

export async function sendObservations(id) {
  const message = await postConsult(`/ia/${id}/observations`);
  return {
    id,
    status: "Pendiente correccion",
    statusKey: "correction",
    sentToProfessor: true,
    message,
  };
}
