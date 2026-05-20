import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, Box, Button, Snackbar, Alert } from "@mui/material";
import { DataGrid, esES, enUS } from "@mui/x-data-grid";
import { dashboardColumns } from "./DashboardView.utils";
import TripDialog from "../../components/TripDialog";
import { getTrips, postTrip, putTrip, deleteTrip } from "../../api/trips";
import { setTrips, removeTrip } from "../../store/tripsSlice";
import { logout } from "../../store/authSlice";
import { AppDispatch, RootState } from "../../store";
import { Trip, TripPayload, SnackbarMessage } from "../../types";

export default function DashboardView() {
  const { t, i18n } = useTranslation();
  const dataGridLocale = i18n.language === "es"
    ? esES.components.MuiDataGrid.defaultProps.localeText
    : enUS.components.MuiDataGrid.defaultProps.localeText;

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const trips = useSelector((state: RootState) => state.trips.trips);
  const [dialog, setDialog] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [snackbar, setSnackbar] = useState<SnackbarMessage | null>(null);

  const loadTrips = async () => {
    const res = await getTrips();
    dispatch(setTrips(res.data));
  };

  useEffect(() => {
    loadTrips();
  }, []);

  const openDialog = () => {
    setSelectedTrip(null);
    setDialog(true);
  };

  const edit = (trip: Trip) => {
    setSelectedTrip(trip);
    setDialog(true);
  };

  const saveTrip = async (data: TripPayload) => {
    try {
      if (data.id) {
        await putTrip(data.id, data);
        setSnackbar({ severity: "success", text: t("dashboard.tripUpdated") });
      } else {
        await postTrip(data);
        setSnackbar({ severity: "success", text: t("dashboard.tripCreated") });
      }
      await loadTrips();
    } catch {
      setSnackbar({ severity: "error", text: data.id ? t("dashboard.errorUpdating") : t("dashboard.errorCreating") });
    } finally {
      setDialog(false);
    }
  };

  const remove = async (id?: number) => {
    if (id === undefined) return;
    try {
      await deleteTrip(id);
      dispatch(removeTrip(id));
      setSnackbar({ severity: "success", text: t("dashboard.tripDeleted") });
    } catch {
      setSnackbar({ severity: "error", text: t("dashboard.errorDeleting") });
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Container>
      <Box display="flex" justifyContent="flex-end" gap={2} my={2}>
        <Button variant="contained" color="primary" onClick={openDialog}>{t("dashboard.create")}</Button>
        <Button onClick={handleLogout}>{t("dashboard.logout")}</Button>
      </Box>
      <DataGrid
        rows={trips}
        columns={dashboardColumns(edit, remove, t)}
        autoHeight
        disableRowSelectionOnClick
        localeText={dataGridLocale}
      />
      <TripDialog
        open={dialog}
        trip={selectedTrip}
        onClose={() => setDialog(false)}
        onSave={saveTrip}
      />
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
