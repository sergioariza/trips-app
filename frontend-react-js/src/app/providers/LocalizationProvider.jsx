import { LocalizationProvider as LocalizationDatePickersProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const LocalizationProvider = ({ children }) => (
  <LocalizationDatePickersProvider dateAdapter={AdapterDayjs}>{children}</LocalizationDatePickersProvider>
);

export default LocalizationProvider;
