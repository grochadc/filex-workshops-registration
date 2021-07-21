import React from "react";
import { screen, act } from "@testing-library/react";
import { Switch, Route } from "react-router-dom";
import Selection from "./Selection";
import { makeReservationMock } from "../testutils/mocks";
import { GET_STUDENT } from "../queries";
import { renderWithProviders } from "../testutils";

const voidProps = {
  setReservation: () => true,
  setReservationDetails: () => true,
};

test("Alerts the student when they already have a reservation", async () => {
  renderWithProviders(
    <Switch>
      <Route path="/selection/:code">
        <Selection {...voidProps} />
      </Route>
    </Switch>,
    {
      mocks: [getStudentWithReservationMock, makeReservationMock],
      route: "/selection/1234567890",
    }
  );
  await act(async () => await new Promise((resolve) => setTimeout(resolve, 0)));

  expect(screen.queryByText(/ya cuentas con una/i)).toBeInTheDocument();
});

const getStudentWithReservationMock: Mock = {
  request: { query: GET_STUDENT, variables: { code: "1234567890" } },
  result: {
    data: {
      student: {
        codigo: "1234567890",
        nombre: "BENITO ANTONIO",
        nivel: "4",
      },
      studentReservation: {
        workshopName: "conversation",
        day: "jueves",
        time: "15:00 - 16:00",
        teacher: "gonzalo",
        url: "http://meet.google.com/lookup/gonzaloconversation",
        zoom_id: null,
      },
      workshops: [
        {
          name: "Conversation",
          description:
            "El alumno se expresa oralmente utilizando las funciones comunicativas y vocabulario adquirido, mejorar la fluidez, y perder el temor a hablar.",
          levels: ["1", "2", "3", "4", "5", "6"],
          options: [
            {
              id: "brendalunes",
              day: "lunes",
              time: "12:00 - 13:00",
              teacher: "Brenda",
              workshop: "Conversation",
              url:
                "https://us04web.zoom.us/j/77370162343?pwd=VFpCS2xqejF1blJvY2t4OWk1c3RtQT09",
              zoom_id: null,
              available: true,
            },
          ],
        },
      ],
    },
  },
};
