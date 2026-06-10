import {
  dashboardStats,
  mockApiReviewResponse,
  pipelineStages,
  processes,
  recentActivity,
  reviewDetails,
  systemStatus,
} from "../data/mockData";

const delay = (ms = 520) => new Promise((resolve) => setTimeout(resolve, ms));

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
