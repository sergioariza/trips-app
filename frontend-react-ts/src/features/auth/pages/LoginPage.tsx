import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert
} from "@mui/material";
import { loginRequest, registerRequest } from "../api";
import { setAuth } from "../store/authSlice";
import { AppDispatch } from "../../../app/store";
import { SnackbarMessage } from "../../../types";

export default function LoginPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarMessage | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (isRegister) {
        await registerRequest(email, password);
      }
      const res = await loginRequest(email, password);
      dispatch(setAuth(res.data));
      navigate("/dashboard");
    } catch {
      setSnackbar({ severity: "error", text: t("login.errorAuth") });
    }
  };

  return (
    <Container sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Card sx={{ width: 400 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            {isRegister ? t("login.titleRegister") : t("login.title")}
          </Typography>
          <TextField
            label={t("login.email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label={t("login.password")}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button onClick={() => setIsRegister((value) => !value)}>
              {isRegister ? t("login.switchToLogin") : t("login.switchToRegister")}
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {isRegister ? t("login.register") : t("login.submit")}
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Snackbar
        open={!!snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar?.severity} onClose={() => setSnackbar(null)}>
          {snackbar?.text}
        </Alert>
      </Snackbar>
    </Container>
  );
}
