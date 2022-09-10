import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Accordion from "react-bootstrap/Accordion";

import AttendanceTable from "./AttendanceTable";

export default {
  title: "Components/AttendanceTable",
  component: AttendanceTable,
  decorators: [
    (Story) => (
      <Accordion>
        <div>
          <Story />
        </div>
      </Accordion>
    ),
  ],
} as ComponentMeta<typeof AttendanceTable>;

const Template: ComponentStory<typeof AttendanceTable> = (args) => (
  <AttendanceTable {...args} />
);

const baseArgs = {
  index: 0,
  day: "Lunes",
  time: "13:00 - 14:00",
  url: "https://meet.google.com",
  workshop_id: "1",
  workshop_name: "Conversation",
  option_id: "1",
  teacher_id: "1",
  teacher_name: "Gonzalo",
  onSaveAttendance: (): Promise<any> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 1000);
    });
  },
};

export const Normal = Template.bind({});
Normal.args = {
  ...baseArgs,
  reservations: [
    {
      id: "1",
      attended: false,
      student: {
        codigo: "1234567890",
        nombre: "Benito Antonio",
        apellido_paterno: "Martinez",
        apellido_materno: "Ocasio",
        email: "bad@bunny.pr",
        telefono: "3411234567",
        nivel: 4,
        grupo: "E4-1",
      },
    },
    {
      id: "2",
      attended: false,
      student: {
        codigo: "0987654321",
        nombre: "Alberto",
        apellido_paterno: "Aguilera",
        apellido_materno: "Valadez",
        email: "juanga@noanoa.com",
        telefono: "3411234567",
        nivel: 4,
        grupo: "E4-1",
      },
    },
    {
      id: "3",
      attended: false,
      student: {
        codigo: "1234509876",
        nombre: "Gerardo",
        apellido_paterno: "Ortiz",
        apellido_materno: "Ortiz",
        email: "gerard@mail.com",
        telefono: "3411234567",
        nivel: 4,
        grupo: "E4-1",
      },
    },
  ],
};

export const Empty = Template.bind({});

Empty.args = {
  ...baseArgs,
  //@ts-ignore
  reservations: null
};
