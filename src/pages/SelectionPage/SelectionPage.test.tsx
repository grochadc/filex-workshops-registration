import React from "react";
import { renderWithProviders } from "../../testutils";
import { createMemoryHistory } from "history";
import { act, screen } from "@testing-library/react";
import { Switch, Route } from "react-router-dom";
import { getSelectionInfo } from ".";
import apolloMock from "../../testutils/generatedMocks";

import SelectionPage from ".";
import ReservationDetails from "../../components/ReservationDetails";
import { ReservationDetailsType } from "../../App";

const reservationDetails: ReservationDetailsType = {
  workshop_name: "Conversation",
  day: "Lunes",
  time: "13:00 - 14:00",
  teacher_name: "Gonzalo",
  url: "https://meet.google.com",
  zoom_id: null,
};

const withReservationSelectionMock = apolloMock(
  getSelectionInfo,
  { code: "1234567890" },
  {
    data: {
      student: {
        reservation: {},
      },
    },
  }
);

test("Alerts the student when they already have a reservation", async () => {
  renderWithProviders(
    <Switch>
      <Route path="/selection/:code">
        <SelectionPage setReservationDetails={() => {}} />
      </Route>
      <Route path="/details">
        <ReservationDetails reservationDetails={reservationDetails} />
      </Route>
    </Switch>,
    {
      mocks: [withReservationSelectionMock],
      route: "/selection/1234567890",
    }
  );
  await act(async () => await new Promise((resolve) => setTimeout(resolve, 0)));

  expect(screen.queryByText(/detalles de tu/i)).toBeInTheDocument();
});
