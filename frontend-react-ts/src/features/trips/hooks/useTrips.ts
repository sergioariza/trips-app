import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { AppDispatch, RootState } from "../../../app/store";
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
import {
  Trip,
  TripPayload,
  SnackbarMessage
} from "../../../types";

export const useTrips = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const trips = useSelector((state: RootState) => state.trips.trips);
  const [dialog, setDialog] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [snackbar, setSnackbar] = useState<SnackbarMessage | null>(null);

  // =========================
  // LOAD TRIPS
  // =========================
  const loadTrips = async (): Promise<void> => {
    const res = await getTrips();
    dispatch(setTrips(res.data));
  };

  useEffect(() => {
    loadTrips();
  }, []);

  // =========================
  // DIALOG ACTIONS
  // =========================
  const openDialog = (): void => {
    setSelectedTrip(null);
    setDialog(true);
  };

  const closeDialog = (): void => {
    setDialog(false);
  };

  const editTrip = (trip: Trip): void => {
    setSelectedTrip(trip);
    setDialog(true);
  };

  // =========================
  // SAVE TRIP
  // =========================
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

  // =========================
  // DELETE TRIP
  // =========================
  const removeTrip = async (id?: number) => {
    if (id === undefined) return;
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
  const closeSnackbar = (): void => {
    setSnackbar(null);
  };

  // =========================
  // EXPOSE PUBLIC API
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