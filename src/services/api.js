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

  return {
    stats: dashboardStats,
    pipeline: pipelineStages,
    activity: recentActivity,
    system: systemStatus,
  };
}

export async function fetchProcesses(type = "active") {
  await delay(380);

  if (type === "history") {
    return processes.filter((process) => process.statusKey === "approved");
  }

  return processes.filter((process) => process.statusKey !== "approved");
}

export async function fetchReviewDetail(id) {
  await delay(420);

  return reviewDetails[id] ?? {
    ...processes[0],
    ...reviewDetails["REV-2026-041"],
    id,
  };
}

export async function createReviewProcess(payload) {
  await delay(1100);

  return {
    ...mockApiReviewResponse,
    uploadedFileName: payload.file?.name ?? "planeador-academico.pdf",
    professor: payload.professor,
    subject: payload.subject,
    coordinator: payload.coordinator,
    receivedAt: new Date().toISOString(),
  };
}

export async function approveReview(id) {
  await delay(520);

  return {
    id,
    status: "Aprobado",
    statusKey: "approved",
    movedToHistory: true,
  };
}

export async function sendObservations(id) {
  await delay(520);

  return {
    id,
    status: "Pendiente correccion",
    statusKey: "correction",
    sentToProfessor: true,
  };
}
