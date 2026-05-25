import { useTranslation } from "react-i18next";
import { Container, Box, Button, Snackbar, Alert } from "@mui/material";
import { DataGrid, esES, enUS } from "@mui/x-data-grid";
import { dashboardColumns } from "../utils";
import TripDialog from "../components/TripDialog";
import { useAuth } from "../../auth/hooks/useAuth";
import { useTrips } from "../hooks/useTrips";

export default function DashboardPage() {
  const { t, i18n } = useTranslation();
  const dataGridLocale = i18n.language === "es"
    ? esES.components.MuiDataGrid.defaultProps.localeText
    : enUS.components.MuiDataGrid.defaultProps.localeText;
  const { handleLogout } = useAuth();
  const {
    trips,
    dialog,
    selectedTrip,
    snackbar,
    openDialog,
    closeDialog,
    editTrip,
    saveTrip,
    removeTrip,
    closeSnackbar
  } = useTrips();

  return (
    <Container>
      <Box display="flex" justifyContent="flex-end" gap={2} my={2}>
        <Button variant="contained" color="primary" onClick={openDialog}>{t("dashboard.create")}</Button>
        <Button onClick={handleLogout}>{t("dashboard.logout")}</Button>
      </Box>
      <DataGrid
        rows={trips}
        columns={dashboardColumns(editTrip, removeTrip, t)}
        autoHeight
        disableRowSelectionOnClick
        localeText={dataGridLocale}
      />
      <TripDialog
        open={dialog}
        trip={selectedTrip}
        onClose={closeDialog}
        onSave={saveTrip}
      />
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
