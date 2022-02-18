import { ComponentMeta, ComponentStory } from "@storybook/react";
import apolloMock from "./testutils/generatedMocks";
import { getSelectionInfo, MAKE_RESERVATION } from "./pages/SelectionPage";
import { getStudentProfile } from "./pages/StudentProfilePage";

import React from "react";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

export default {
  title: "App",
  component: App,
  decorators: [
    (Story) => (
      <Router>
        <Story />
      </Router>
    ),
  ],
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App />;

const baseStudent = {
  nombre: "Benito Antonio",
  apellido_paterno: "Martinez",
  apellido_materno: "Ocasio",
  codigo: "1234567890",
  email: "bad@bunny.pr",
  telefono: "3411234567",
  nivel: "4",
};

const baseWorkshops = [
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
];

export const withoutResMock = apolloMock(
  getStudentProfile,
  { code: "1234567890" },
  {
    data: {
      student: {
        ...baseStudent,
        reservationCount: 4,
        reservationLimit: 6,
      },
    },
  }
);

export const selectionInfoOpenMock = apolloMock(
  getSelectionInfo,
  { code: "1234567890" },
  {
    data: {
      isWorkshopsOpen: true,
      student: {
        ...baseStudent,
        nivel: "4",
      },
      workshops: [...baseWorkshops],
    },
  }
);

export const setReservationMock = apolloMock(
  MAKE_RESERVATION,
  {
    option_id: "option_id1",
    student_id: "Student-id",
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

export const Normal = Template.bind({});
Normal.parameters = {
  apolloClient: {
    mocks: [withoutResMock, selectionInfoOpenMock, setReservationMock],
  },
};

const withReservationMock = apolloMock(
  getStudentProfile,
  { code: "1234567890" },
  {
    data: {
      student: {
        ...baseStudent,
        reservationCount: 4,
        reservationLimit: 6,
        reservation: {
          workshop_name: "Conversation",
          teacher_name: "Gonzalo",
          day: "Martes",
          time: "13:00 - 14:00",
        },
      },
    },
  }
);

export const Reserved = Template.bind({});
Reserved.parameters = {
  apolloClient: {
    mocks: [withReservationMock],
  },
};

const selectionInfoClosedMock = apolloMock(
  getSelectionInfo,
  { code: "1234567890" },
  {
    data: {
      isWorkshopsOpen: false,
      student: {
        nivel: "4",
      },
      workshops: [...baseWorkshops],
    },
  }
);

export const Closed = Template.bind({});
Closed.parameters = {
  apolloClient: {
    mocks: [withoutResMock, selectionInfoClosedMock],
  },
};
