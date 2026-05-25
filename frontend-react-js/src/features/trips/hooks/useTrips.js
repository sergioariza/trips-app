import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  getTrips,
  postTrip,
  putTrip,
  deleteTrip
} from "../api";
import {
  setTrips,
  removeTrip as removeTripAction
} from "../store/tripsSlice";

export const useTrips = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const trips = useSelector(
    (state) => state.trips.trips
  );

  const [dialog, setDialog] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [snackbar, setSnackbar] = useState(null);

  // =========================
  // LOAD
  // =========================
  const loadTrips = async () => {
    const res = await getTrips();
    dispatch(setTrips(res.data));
  };

  useEffect(() => {
    loadTrips();
  }, []);

  // =========================
  // DIALOG
  // =========================
  const openDialog = () => {
    setSelectedTrip(null);
    setDialog(true);
  };

  const closeDialog = () => {
    setDialog(false);
  };

  const editTrip = (trip) => {
    setSelectedTrip(trip);
    setDialog(true);
  };

  // =========================
  // SAVE
  // =========================
	const saveTrip = async (data) => {
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

  // =========================
  // DELETE
  // =========================
	const removeTrip = async (id) => {
    try {
      await deleteTrip(id);
      dispatch(removeTripAction(id));
      setSnackbar({ severity: "success", text: t("dashboard.tripDeleted") });
    } catch {
      setSnackbar({ severity: "error", text: t("dashboard.errorDeleting") });
    }
  };

  // =========================
  // SNACKBAR
  // =========================
  const closeSnackbar = () => {
    setSnackbar(null);
  };

  // =========================
  // EXPOSE API
  // =========================
  return {
    trips,
    dialog,
    selectedTrip,
    snackbar,
    loadTrips,
    openDialog,
    closeDialog,
    editTrip,
    saveTrip,
    removeTrip,
    closeSnackbar
  };
};
