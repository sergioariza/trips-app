import { Routes, Route } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import LoginPage from "../features/auth/pages/LoginPage";
import DashboardPage from "../features/trips/pages/DashboardPage";
import LocaleSwitcher from "./components/LocaleSwitcher";

export default function App() {
  return (
    <>
      <CssBaseline />
      <Box sx={{ position: "fixed", top: 16, right: 16, zIndex: 1300 }}>
        <LocaleSwitcher />
      </Box>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </>
  );
}
