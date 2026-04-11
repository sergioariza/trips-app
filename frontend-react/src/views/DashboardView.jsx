import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Box, Button, Snackbar, Alert } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import TripDialog from "../components/TripDialog";
import { getTrips, postTrip, putTrip, deleteTrip } from "../api/trips";
import { setTrips, removeTrip } from "../store/tripsSlice";
import { logout } from "../store/authSlice";

export default function DashboardView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const trips = useSelector((state) => state.trips.trips);

  const [dialog, setDialog] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [snackbar, setSnackbar] = useState(null);

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

  const edit = (trip) => {
    setSelectedTrip(trip);
    setDialog(true);
  };

  const saveTrip = async (data) => {
    try {
      if (data.id) {
        await putTrip(data.id, data);
        setSnackbar({ severity: "success", text: "Trip updated successfully" });
      } else {
        await postTrip(data);
        setSnackbar({ severity: "success", text: "Trip created successfully" });
      }
      await loadTrips();
    } catch {
      setSnackbar({ severity: "error", text: data.id ? "Error updating trip" : "Error creating trip" });
    } finally {
      setDialog(false);
    }
  };

  const remove = async (id) => {
    try {
      await deleteTrip(id);
      dispatch(removeTrip(id));
      setSnackbar({ severity: "success", text: "Trip deleted successfully" });
    } catch {
      setSnackbar({ severity: "error", text: "Error deleting trip" });
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const columns = [
    { field: "origin", headerName: "Origin", flex: 1 },
    { field: "destination", headerName: "Destination", flex: 1 },
    {
      field: "departure",
      headerName: "Departure",
      flex: 1,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString()
    },
    {
      field: "returnDate",
      headerName: "Return",
      flex: 1,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString()
    },
    { field: "price", headerName: "Price", flex: 1 },
    {
      field: "isWorkTrip",
      headerName: "Work Trip",
      flex: 1,
      valueFormatter: (params) => (params.value ? "Yes" : "No")
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Button size="small" onClick={() => edit(params.row)}>✏️</Button>
          <Button size="small" onClick={() => remove(params.row.id)}>🗑️</Button>
        </Box>
      )
    }
  ];

  return (
    <Container>
      <Box display="flex" justifyContent="flex-end" gap={2} my={2}>
        <Button variant="contained" color="primary" onClick={openDialog}>Create</Button>
        <Button onClick={handleLogout}>Logout</Button>
      </Box>
      <DataGrid
        rows={trips}
        columns={columns}
        autoHeight
        disableRowSelectionOnClick
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
