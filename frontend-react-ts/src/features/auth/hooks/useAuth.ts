import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { setAuth, logout } from "../store/authSlice";
import { loginRequest, registerRequest } from "../api";
import { AppDispatch } from "../../../app/store";
import { SnackbarMessage } from "../../../types";

export const useAuth = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
	const [snackbar, setSnackbar] = useState<SnackbarMessage | null>(null);

	// =========================
  // REGISTER/LOGIN/LOGOUT
  // =========================
	const handleSubmit = async (isRegister: boolean, email: string, password: string) => {
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

	const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

	// =========================
  // SNACKBAR
  // =========================
	const closeSnackbar = () => {
    setSnackbar(null);
  };

	return {
		handleSubmit,
		handleLogout,
		snackbar,
		closeSnackbar
	};
}
