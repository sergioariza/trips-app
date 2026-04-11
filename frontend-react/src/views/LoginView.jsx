import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import { loginRequest, registerRequest } from "../api/auth";
import { setAuth } from "../store/authSlice";

export default function LoginView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [snackbar, setSnackbar] = useState(null);

  const dispatch = useDispatch();
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
      setSnackbar({ severity: "error", text: "Error during authentication" });
    }
  };

  return (
    <Container sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Card sx={{ width: 400 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            {isRegister ? "Sign Up" : "Login"}
          </Typography>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button onClick={() => setIsRegister((v) => !v)}>
              {isRegister ? "Login" : "Sign Up"}
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {isRegister ? "Register" : "Login"}
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
