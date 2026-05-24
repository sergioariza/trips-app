import React from "react";
import { LocalizationProvider as MuiLocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "../i18n";

interface LocalizationProviderProps {
  children: React.ReactNode;
}

export default function LocalizationProvider({ children }: LocalizationProviderProps) {
  return <MuiLocalizationProvider dateAdapter={AdapterDayjs}>{children}</MuiLocalizationProvider>;
}
