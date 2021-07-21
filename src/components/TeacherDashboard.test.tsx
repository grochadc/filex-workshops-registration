import React from "react";
import { screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Switch, Route } from "react-router-dom";
import { renderWithProviders } from "../testutils";
import Dashboard, {
  GET_RESERVATIONS,
  SAVE_ATTENDANCE,
} from "./TeacherDashboard";

test("Dashboard unit test", async () => {
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

  expect(screen.getByText(/benito antonio/i)).toBeInTheDocument();
  expect(screen.queryByRole("alert")).toBeNull();

  userEvent.click(screen.getByRole("checkbox"));
  expect(screen.getByRole("checkbox")).toBeChecked();
  userEvent.click(screen.getByText(/save Attendance/i));
  await act(async () => await new Promise((resolve) => setTimeout(resolve, 0)));

  expect(screen.getByRole("alert").textContent).toBe(
    "Attendance saved successfuly!"
  );
});

const getReservationsMock: Mock = {
  request: {
    query: GET_RESERVATIONS,
    variables: { teacher: "gonzalo" },
  },
  result: {
    data: {
      teacher: {
        name: "Gonzalo",
        options: [
          {
            id: "gonzalojueves",
            teacher_id: "gonzalo",
            time: "15:00 - 16:00",
            day: "jueves",
            workshop: "conversation",
            url: "https://meet.google.com/lookup/gonzaloconversation",
          },
        ],
        reservations: [
          {
            codigo: "1234567890",
            nombre: "BENITO ANTONIO",
            apellido_paterno: "MARTINEZ",
            apellido_materno: "OCASIO",
            grupo: "E5-6",
            nivel: 5,
            timestamp: "2021-07-13T19:23:28.623Z",
            option: { day: "jueves" },
          },
        ],
      },
    },
  },
};

const saveAttendanceMock: Mock = {
  request: {
    query: SAVE_ATTENDANCE,
    variables: {
      students: [
        {
          codigo: "1234567890",
          nombre: "BENITO ANTONIO",
          apellido_paterno: "MARTINEZ",
          apellido_materno: "OCASIO",
          grupo: "E5-6",
          nivel: 5,
          workshop: "conversation",
          teacher: "Gonzalo",
          attended: true,
        },
      ],
      workshopInfo: { teacher: "gonzalo", option_id: "gonzalojueves" },
    },
  },
  result: { data: { saveWorkshopsAttendance: { success: true } } },
};
