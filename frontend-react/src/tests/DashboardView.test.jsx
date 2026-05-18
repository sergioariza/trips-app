import React from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import DashboardView from "../views/DashboardView";
import store from "../store";
import * as tripsApi from "../api/trips";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import tripsFixture from "./fixtures/tripsFixture";

// API mocks
jest.mock("../api/trips", () => ({
  getTrips: jest.fn(),
  postTrip: jest.fn(),
  putTrip: jest.fn(),
  deleteTrip: jest.fn()
}));

// Mock DataGrid component from mui library and avoid overengineering test issues
jest.mock("@mui/x-data-grid", () => {
  const React = require("react");
  return {
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
  };
});

// Core mocks
jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k) => k, i18n: { language: "en" } })
}));

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom")),
  useNavigate: () => jest.fn()
}));

// Tests
describe("DashboardView", () => {
  beforeEach(() => {
    tripsApi.getTrips.mockResolvedValue({ data: tripsFixture });
    tripsApi.deleteTrip.mockResolvedValue({});
  });

  it("renders trips loaded from API", async () => {
    render(
			<Provider store={store}>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DashboardView />
				</LocalizationProvider>
			</Provider>
    );

		// wait for initial load in the first check
    expect(await screen.findByText("Barcelona")).toBeInTheDocument();
    expect(screen.getByText("Malaga")).toBeInTheDocument();
  });

  it("opens create dialog when Create button is clicked", async () => {
    const user = userEvent.setup();

    render(
			<Provider store={store}>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DashboardView />
				</LocalizationProvider>
			</Provider>
    );

    const createButton = screen.getByText("dashboard.create");
    await user.click(createButton);

    expect(await screen.findByText("tripDialog.titleCreate")).toBeInTheDocument();
  });

  it("deletes a trip and shows success snackbar", async () => {
    const user = userEvent.setup();

    render(
		<Provider store={store}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DashboardView />
			</LocalizationProvider>
		</Provider>
    );

    const deleteButton = Array.from(screen.getAllByRole("button")).find((button) =>
      button.textContent?.includes("🗑️")
    );
    expect(deleteButton).toBeDefined();

    await user.click(deleteButton);
    await waitFor(() => expect(tripsApi.deleteTrip).toHaveBeenCalledWith(1));
    expect(await screen.findByText("dashboard.tripDeleted")).toBeInTheDocument();
  });
});
