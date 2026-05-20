import { Box, Button } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import { Trip } from "../../types";

type TranslateFunction = (key: string) => string;

export function dashboardColumns(
  edit: (trip: Trip) => void,
  remove: (id?: number) => void,
  t: TranslateFunction
): GridColDef<Trip>[] {
  return [
    { field: "origin", headerName: t("dashboard.columns.origin"), flex: 1 },
    { field: "destination", headerName: t("dashboard.columns.destination"), flex: 1 },
    {
      field: "departure",
      headerName: t("dashboard.columns.departure"),
      flex: 1,
      valueFormatter: (params) =>
        params.value ? new Date(params.value as string | Date).toLocaleDateString() : ""
    },
    {
      field: "returnDate",
      headerName: t("dashboard.columns.return"),
      flex: 1,
      valueFormatter: (params) =>
        params.value ? new Date(params.value as string | Date).toLocaleDateString() : ""
    },
    { field: "price", headerName: t("dashboard.columns.price"), flex: 1 },
    {
      field: "isWorkTrip",
      headerName: t("dashboard.columns.workTrip"),
      flex: 1,
      valueFormatter: (params) =>
        params.value ? t("dashboard.columns.yes") : t("dashboard.columns.no")
    },
    {
      field: "actions",
      headerName: t("dashboard.columns.actions"),
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Button size="small" onClick={() => edit(params.row)}>
            ✏️
          </Button>
          <Button size="small" onClick={() => remove(params.row.id)}>
            🗑️
          </Button>
        </Box>
      )
    }
  ];
}
