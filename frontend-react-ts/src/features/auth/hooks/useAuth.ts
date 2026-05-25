import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { AppDispatch } from "../../../app/store";

export const useAuth = () => {
	const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

	const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

	return {
		handleLogout
	};
}
