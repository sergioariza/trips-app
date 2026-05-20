import { Routes, Route } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import LoginView from "./views/LoginView";
import DashboardView from "./views/DashboardView";
import LocaleSwitcher from "./components/LocaleSwitcher";

export default function App() {
  return (
    <>
      <CssBaseline />
      <Box sx={{ position: "fixed", top: 16, right: 16, zIndex: 1300 }}>
        <LocaleSwitcher />
      </Box>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/dashboard" element={<DashboardView />} />
      </Routes>
    </>
  );
}
