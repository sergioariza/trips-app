import { useState, useEffect } from "react";
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
      <DialogTitle>{form.id ? "Edit Trip" : "Create Trip"}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField label="Origin" value={form.origin} onChange={set("origin")} fullWidth />
          <TextField label="Destination" value={form.destination} onChange={set("destination")} fullWidth />
          <DatePicker
            label="Departure Date"
            value={form.departure}
            onChange={(v) => setForm((f) => ({ ...f, departure: v }))}
            slotProps={{ textField: { fullWidth: true } }}
          />
          <DatePicker
            label="Return Date"
            value={form.returnDate}
            onChange={(v) => setForm((f) => ({ ...f, returnDate: v }))}
            slotProps={{ textField: { fullWidth: true } }}
          />
          <TextField label="Price" type="number" value={form.price} onChange={set("price")} fullWidth />
          <FormControlLabel
            control={
              <Checkbox
                checked={form.isWorkTrip}
                onChange={(e) => setForm((f) => ({ ...f, isWorkTrip: e.target.checked }))}
              />
            }
            label="Work Trip"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
