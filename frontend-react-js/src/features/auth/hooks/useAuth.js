import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { setAuth, logout } from "../store/authSlice";
import { loginRequest, registerRequest } from "../api";

export const useAuth = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
  const navigate = useNavigate();
	const [snackbar, setSnackbar] = useState(null);

	// =========================
  // REGISTER/LOGIN/LOGOUT
  // =========================
	const handleSubmit = async (isRegister, email, password) => {
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
