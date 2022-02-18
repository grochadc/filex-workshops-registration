import React from "react";
import apolloMock from "../testutils/generatedMocks";
import Jumbotron from "react-bootstrap/Jumbotron";
import { MemoryRouter, Route } from "react-router-dom";
import SelectionPage, {
  getSelectionInfo,
  MAKE_RESERVATION,
} from "../pages/SelectionPage";
import { selectionInfoOpenMock } from "../App.stories";
const selectionInfoMock = apolloMock(
  getSelectionInfo,
  { code: "1234567890" },
  {
    data: {
      isWorkshopsOpen: true,
      student: {
        nivel: "4",
      },
      workshops: [
        {
          name: "Conversation",
          levels: ["1", "2", "3", "4", "5", "6"],
          options: [
            {
              id: "option_id1",
              teacher_id: "teacher_id1",
              teacher_name: "Gonzalo",
              available: true,
            },
          ],
        },
      ],
    },
  }
);
const makeReservationMock = apolloMock(
  MAKE_RESERVATION,
  {
    codigo: "1234567890",
    option_id: "option_id1",
    student_id: "Student-id",
    teacher_id: "teacher_id1",
  },
  {
    data: {
      makeWorkshopReservation: {
        workshop_name: "Conversation",
        teacher_name: "Fulanito",
        day: "Lunes",
        time: "14:00 - 15:00",
        url: "https://meet.google.com",
      },
    },
  }
);
export default {
  title: "Pages/Selection",
  component: SelectionPage,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/selection/1234567890"]}>
        <Jumbotron>
          <h1>FILEX WORKSHOPS</h1>
        </Jumbotron>
        <Route path="/selection/:code">
          <Story />
        </Route>
      </MemoryRouter>
    ),
  ],
};

export const Example = () => (
  <SelectionPage setReservationDetails={console.log} />
);

Example.parameters = {
  apolloClient: {
    mocks: [selectionInfoOpenMock, makeReservationMock],
  },
};
