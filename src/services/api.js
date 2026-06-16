import {
  dashboardStats,
  mockApiReviewResponse,
  pipelineStages,
  processes,
  recentActivity,
  reviewDetails,
  systemStatus,
} from "../data/mockData";
import api from "./apiAxios";
const reviews = [];
const getAllProcesses = () => [...reviews, ...processes];

const delay = (ms = 520) => new Promise((resolve) => setTimeout(resolve, ms));



export const verifySession = async ()=>{
    const response = await api.get("/api/auth/verify")

    if(response.status == 200){
        const data = response.data; 
        return data;
    }else{
        console.log("**********ERROR AUTH");
        
        throw new Error("Unauthirized");
    } 
}


// Centralizar todas las llamadas get
export const getConsultParams = async(uri,options={})=>{
    const response = await api.get(uri,options)

    if(response.status == 200){
        const data = response.data; 
        return data;
    }else{
        console.log(`**********ERROR AL HACER LA CONSULTA A ${uri}`);
        
        throw new Error(`**********ERROR AL HACER LA CONSULTA A ${uri}`);
    } 
}


// Centralizar todas las llamadas post 
export const postConsult = async(uri,body)=>{
    const response = await api.post(uri,body)
    
    if(response.status === 200){
        const data = response.data;
        console.log(data);
        
        return data
    }else{
        console.log(`**********ERROR AL HACER LA CONSULTA A ${uri}`);
        
        throw new Error(`**********ERROR AL HACER LA CONSULTA A ${uri}`);
    } 
}



export async function fetchDashboard() {
  await delay();

  const allProcesses = getAllProcesses();

  const approved = allProcesses.filter(
    (item) => item.statusKey === "approved"
  );

  const correction = allProcesses.filter(
    (item) => item.statusKey === "correction"
  );

  const review = allProcesses.filter(
    (item) => item.statusKey === "review"
  );

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
      title: item.subject,
      description: `${item.professor} - ${item.status}`,
      time: "Reciente",
      semaphore: item.semaphore || "green",
    }));

  return {
    stats,
    pipeline,
    activity,
    system: systemStatus,
  };
}

export async function fetchProcesses(type = "active") {
  await delay(380);

  if (type === "history") {
    return [...reviews, ...processes].filter(
      (process) => process.statusKey === "approved"
    );
  }

  return [...reviews, ...processes].filter(
    (process) => process.statusKey !== "approved"
  );
}

export async function fetchReviewDetail(id) {
  await delay(420);

  const review = reviews.find((item) => item.id === id);

  if (review) {
    return {
      ...review,
      pdfName: review.file?.name || "documento.pdf",
    };
  }

  return null;
}

export async function createReviewProcess(payload) {
  await delay(500);

  const id = `REV-${Date.now()}`;

  const review = {
    id,
    reviewId: id,
    ...payload,
    pdfUrl: payload.pdfUrl,

    score: 94,
    semaphore: "green",

    status: "Revision coordinador",
    statusKey: "review",

    // ESTOS LOS NECESITA NewProcess.jsx
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

    // ESTOS LOS NECESITA ReviewAiPanel.jsx
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
      {
        label: "PDF recibido",
        time: "Ahora",
        state: "complete",
      },
      {
        label: "Validacion IA",
        time: "En proceso",
        state: "active",
      },
      {
        label: "Revision coordinador",
        time: "Pendiente",
        state: "pending",
      },
    ],
  };

  reviews.push(review);

  return review;
}

export async function approveReview(id) {
  await delay(520);

  const review = reviews.find((item) => item.id === id);

  if (review) {
    review.status = "Aprobado";
    review.statusKey = "approved";
  }

  return {
    id,
    status: "Aprobado",
    statusKey: "approved",
    movedToHistory: true,
  };
}

export async function sendObservations(id) {
  await delay(520);

  const review = reviews.find((item) => item.id === id);

  if (review) {
    review.status = "Pendiente correccion";
    review.statusKey = "correction";
  }

  return {
    id,
    status: "Pendiente correccion",
    statusKey: "correction",
    sentToProfessor: true,
  };
}
