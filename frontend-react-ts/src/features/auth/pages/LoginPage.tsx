import { useState } from "react";
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
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const {
    handleSubmit,
		snackbar,
		closeSnackbar
  } = useAuth();

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
            <Button onClick={() => setIsRegister((v) => !v)}>
              {isRegister ? t("login.switchToLogin") : t("login.switchToRegister")}
            </Button>
            <Button variant="contained" color="primary" onClick={() => handleSubmit(isRegister, email, password)}>
              {isRegister ? t("login.register") : t("login.submit")}
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Snackbar
        open={!!snackbar}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar?.severity} onClose={closeSnackbar}>
          {snackbar?.text}
        </Alert>
      </Snackbar>
    </Container>
  );
}
