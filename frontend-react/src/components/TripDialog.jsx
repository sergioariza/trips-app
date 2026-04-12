import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
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
  price: undefined,
  isWorkTrip: false
};

export default function TripDialog({ open, trip, onClose, onSave }) {
  const { t } = useTranslation();
  const { control, handleSubmit, reset } = useForm({ defaultValues: empty });

  useEffect(() => {
    reset(
      trip
        ? {
            ...trip,
            departure: trip.departure ? dayjs(trip.departure) : null,
            returnDate: trip.returnDate ? dayjs(trip.returnDate) : null
          }
        : empty
    );
  }, [trip, open, reset]);

  const onSubmit = (data) => {
    onSave({
      ...data,
      departure: data.departure ? data.departure.toDate() : null,
      returnDate: data.returnDate ? data.returnDate.toDate() : null
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{trip?.id ? t("tripDialog.titleEdit") : t("tripDialog.titleCreate")}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Controller
              name="origin"
              control={control}
              rules={{ required: t("validation.required") }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label={t("tripDialog.origin")}
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="destination"
              control={control}
              rules={{ required: t("validation.required") }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label={t("tripDialog.destination")}
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="departure"
              control={control}
              rules={{ required: t("validation.required") }}
              render={({ field, fieldState }) => (
                <DatePicker
                  label={t("tripDialog.departureDate")}
                  value={field.value}
                  onChange={field.onChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!fieldState.error,
                      helperText: fieldState.error?.message
                    }
                  }}
                />
              )}
            />
            <Controller
              name="returnDate"
              control={control}
              rules={{ required: t("validation.required") }}
              render={({ field, fieldState }) => (
                <DatePicker
                  label={t("tripDialog.returnDate")}
                  value={field.value}
                  onChange={field.onChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!fieldState.error,
                      helperText: fieldState.error?.message
                    }
                  }}
                />
              )}
            />
            <Controller
              name="price"
              control={control}
              rules={{
                required: t("validation.required"),
                min: { value: 0, message: t("validation.minPrice") }
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label={t("tripDialog.price")}
                  type="number"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="isWorkTrip"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox checked={field.value} onChange={field.onChange} />
                  }
                  label={t("tripDialog.workTrip")}
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{t("tripDialog.cancel")}</Button>
          <Button type="submit" variant="contained" color="primary">
            {t("tripDialog.save")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
