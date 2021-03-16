import React from "react";
import { screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Switch, Route } from "react-router-dom";
import { renderWithProviders } from "../testutils";
import { getReservationsMock, saveAttendanceMock } from "../testutils/mocks";
import Dashboard from "./Dashboard";

test("Dashboard", async () => {
  renderWithProviders(
    <Switch>
      <Route path="/dashboard/:teacher">
        <Dashboard />
      </Route>
    </Switch>,
    {
      mocks: [getReservationsMock, saveAttendanceMock],
      route: "/dashboard/gonzalo",
    }
  );

  await act(async () => await new Promise((resolve) => setTimeout(resolve, 0)));

  expect(await screen.findByText(/benito antonio/i)).toBeInTheDocument();

  userEvent.click(screen.getByRole("checkbox"));
  userEvent.click(screen.getByRole("button", { name: /send/i }));
});
