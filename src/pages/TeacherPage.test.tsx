import React from "react";
import { screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Switch, Route } from "react-router-dom";
import { renderWithProviders } from "../testutils";
import Dashboard from "../pages/TeacherPage";

import {
  reservationsListMock,
  saveAttendanceMock,
} from "./TeacherPage.stories";

test("Dashboard unit test", async () => {
  renderWithProviders(
    <Switch>
      <Route path="/teacher/:id">
        <Dashboard />
      </Route>
    </Switch>,
    {
      mocks: [reservationsListMock, saveAttendanceMock],
      route: "/teacher/1",
    }
  );

  await act(async () => await new Promise((resolve) => setTimeout(resolve, 0)));

  expect(screen.getByText(/Reservation-nombre/i)).toBeInTheDocument();
  expect(screen.queryByRole("alert")).toBeNull();

  userEvent.click(screen.getByRole("checkbox"));
  expect(screen.getByRole("checkbox")).toBeChecked();
  userEvent.click(screen.getByText(/save/i));
  await act(async () => await new Promise((resolve) => setTimeout(resolve, 0)));

  expect(screen.getByRole("alert").textContent).toBe(
    "Attendance saved successfuly!"
  );
});
