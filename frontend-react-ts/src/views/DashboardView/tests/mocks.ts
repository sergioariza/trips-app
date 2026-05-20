jest.mock("../../../api/trips", () => ({
  getTrips: jest.fn(),
  postTrip: jest.fn(),
  putTrip: jest.fn(),
  deleteTrip: jest.fn()
}));

jest.mock("@mui/x-data-grid", () => {
  const React = require("react");

  return {
    DataGrid: ({ rows, columns }: any) =>
      React.createElement(
        "div",
        null,
        rows.map((row: any) =>
          React.createElement(
            "div",
            { key: row.id, role: "row" },
            columns.map((col: any) =>
              React.createElement(
                "div",
                { key: col.field },
                col.field === "actions" ? col.renderCell({ row }) : row[col.field]
              )
            )
          )
        )
      ),
    esES: { components: { MuiDataGrid: { defaultProps: { localeText: {} } } } },
    enUS: { components: { MuiDataGrid: { defaultProps: { localeText: {} } } } }
  };
});

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k: string) => k, i18n: { language: "en" } })
}));

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom")),
  useNavigate: () => jest.fn()
}));
