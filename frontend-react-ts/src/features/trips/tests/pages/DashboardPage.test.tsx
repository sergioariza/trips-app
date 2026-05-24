import "@testing-library/jest-dom";
import "../mocks";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import DashboardPage from "../../pages/DashboardPage";
import store from "../../../../app/store";
import * as tripsApi from "../../api";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import tripsFixture from "../fixtures/tripsFixture";

describe("DashboardView", () => {
  beforeEach(() => {
    (tripsApi.getTrips as jest.Mock).mockResolvedValue({ data: tripsFixture });
    (tripsApi.deleteTrip as jest.Mock).mockResolvedValue({});
  });

  it("renders trips loaded from API", async () => {
    render(
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DashboardPage />
        </LocalizationProvider>
      </Provider>
    );

    expect(await screen.findByText("Barcelona")).toBeInTheDocument();
    expect(screen.getByText("Malaga")).toBeInTheDocument();
  });

  it("opens create dialog when Create button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DashboardPage />
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
          <DashboardPage />
        </LocalizationProvider>
      </Provider>
    );

    const deleteButton = Array.from(screen.getAllByRole("button")).find((button) =>
      button.textContent?.includes("🗑️")
    );
    expect(deleteButton).toBeDefined();

    await user.click(deleteButton!);
    await waitFor(() => expect(tripsApi.deleteTrip).toHaveBeenCalledWith(1));
    expect(await screen.findByText("dashboard.tripDeleted")).toBeInTheDocument();
  });
});
