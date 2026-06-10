import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import ActiveProcesses from "../pages/ActiveProcesses";
import Dashboard from "../pages/Dashboard";
import HistoryPage from "../pages/HistoryPage";
import Login from "../pages/Login";
import NewProcess from "../pages/NewProcess";
import ReviewDetail from "../pages/ReviewDetail";
import SettingsPage from "../pages/SettingsPage";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/nuevo-proceso" element={<NewProcess />} />
        <Route path="/procesos" element={<ActiveProcesses />} />
        <Route path="/historial" element={<HistoryPage />} />
        <Route path="/reviews/:id" element={<ReviewDetail />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/new-process" element={<Navigate to="/nuevo-proceso" replace />} />
        <Route path="/active-processes" element={<Navigate to="/procesos" replace />} />
        <Route path="/history" element={<Navigate to="/historial" replace />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
