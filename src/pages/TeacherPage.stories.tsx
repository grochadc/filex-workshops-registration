import { ComponentStory, ComponentMeta } from "@storybook/react";
import apolloMock from "../testutils/generatedMocks";
import React from "react";
import { MemoryRouter as Router, Switch, Route } from "react-router-dom";

import TeacherPage, { GET_RESERVATIONS, SAVE_ATTENDANCE } from "./TeacherPage";

export const reservationsListMock = apolloMock(
  GET_RESERVATIONS,
  { teacher_id: "1" },
  {
    data: {
      teacher: {
        name: "Gonzalo",
        options: [
          {
            workshop_name: "Conversation",
            day: "Lunes",
            time: "13:00 - 14:00",
            url: "https://meet.google.com",
            reservations: [{}],
          },
        ],
      },
    },
  }
);

export const saveAttendanceMock = apolloMock(
  SAVE_ATTENDANCE,
  {
    option_id: "TeacherOption-id",
    teacher_id: "Teacher-id",
    students: [
      {
        workshop: "Conversation",
        teacher: "Gonzalo",
        nombre: "Reservation-nombre",
        nivel: "Reservation-nivel",
        grupo: "Reservation-grupo",
        codigo: "Reservation-codigo",
        attended: true,
        apellido_paterno: "Reservation-apellido_paterno",
        apellido_materno: "Reservation-apellido_materno",
      },
    ],
  },
  {}
);

export default {
  title: "Pages/Teacher",
  component: TeacherPage,
  decorators: [
    (Story) => (
      <Router initialEntries={["/teacher/1"]}>
        <Switch>
          <Route path="/teacher/:id">
            <Story />
          </Route>
        </Switch>
      </Router>
    ),
  ],
  parameters: {
    apolloClient: {
      mocks: [reservationsListMock, saveAttendanceMock],
    },
  },
} as ComponentMeta<typeof TeacherPage>;

const Template: ComponentStory<typeof TeacherPage> = (args) => (
  <TeacherPage {...args} />
);

export const Normal = Template.bind({});
