import React from "react";
import { LocalizationProvider as MuiLocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface LocalizationProviderProps {
  children: React.ReactNode;
}

export default function LocalizationProvider({ children }: LocalizationProviderProps) {
  return <MuiLocalizationProvider dateAdapter={AdapterDayjs}>{children}</MuiLocalizationProvider>;
}
