// API mocks
jest.mock("../api", () => ({
  getTrips: jest.fn(),
  postTrip: jest.fn(),
  putTrip: jest.fn(),
  deleteTrip: jest.fn()
}));

// Mock DataGrid component from mui library and avoid overengineering test issues
jest.mock("@mui/x-data-grid", () => ({
  DataGrid: ({ rows, columns }) => (
    <div>
      {rows.map((row) => (
        <div key={row.id} role="row">
          {columns.map((col) => (
            <div key={col.field}>
              {col.field === "actions"
                ? col.renderCell({ row })
                : row[col.field]}
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
  esES: { components: { MuiDataGrid: { defaultProps: { localeText: {} } } } },
  enUS: { components: { MuiDataGrid: { defaultProps: { localeText: {} } } } }
}));

// Core mocks
jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k) => k, i18n: { language: "en" } })
}));

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom")),
  useNavigate: () => jest.fn()
}));
