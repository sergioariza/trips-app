import { Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import LoginView from "./views/LoginView";
import DashboardView from "./views/DashboardView";

export default function App() {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/dashboard" element={<DashboardView />} />
      </Routes>
    </>
  );
}
