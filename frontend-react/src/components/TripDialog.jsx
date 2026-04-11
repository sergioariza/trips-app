import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Stack
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const empty = {
  origin: "",
  destination: "",
  departure: null,
  returnDate: null,
  price: 0,
  isWorkTrip: false
};

export default function TripDialog({ open, trip, onClose, onSave }) {
  const { t } = useTranslation();
  const [form, setForm] = useState(empty);

  useEffect(() => {
    setForm(
      trip
        ? {
            ...trip,
            departure: trip.departure ? dayjs(trip.departure) : null,
            returnDate: trip.returnDate ? dayjs(trip.returnDate) : null
          }
        : empty
    );
  }, [trip, open]);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSave = () => {
    onSave({
      ...form,
      departure: form.departure ? form.departure.toDate() : null,
      returnDate: form.returnDate ? form.returnDate.toDate() : null
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{form.id ? t("tripDialog.titleEdit") : t("tripDialog.titleCreate")}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField label={t("tripDialog.origin")} value={form.origin} onChange={set("origin")} fullWidth />
          <TextField label={t("tripDialog.destination")} value={form.destination} onChange={set("destination")} fullWidth />
          <DatePicker
            label={t("tripDialog.departureDate")}
            value={form.departure}
            onChange={(v) => setForm((f) => ({ ...f, departure: v }))}
            slotProps={{ textField: { fullWidth: true } }}
          />
          <DatePicker
            label={t("tripDialog.returnDate")}
            value={form.returnDate}
            onChange={(v) => setForm((f) => ({ ...f, returnDate: v }))}
            slotProps={{ textField: { fullWidth: true } }}
          />
          <TextField label={t("tripDialog.price")} type="number" value={form.price} onChange={set("price")} fullWidth />
          <FormControlLabel
            control={
              <Checkbox
                checked={form.isWorkTrip}
                onChange={(e) => setForm((f) => ({ ...f, isWorkTrip: e.target.checked }))}
              />
            }
            label={t("tripDialog.workTrip")}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("tripDialog.cancel")}</Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          {t("tripDialog.save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
