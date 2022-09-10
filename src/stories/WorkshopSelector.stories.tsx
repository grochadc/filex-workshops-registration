import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withReactContext } from "storybook-react-context";
import { IsWorkshopsOpenContext } from "../pages/SelectionPage";
import WorkshopSelector from "../components/WorkshopSelector";

export default {
  title: "Components/WorkshopSelector",
  component: WorkshopSelector,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof WorkshopSelector>;

const Template: ComponentStory<typeof WorkshopSelector> = (args) => (
  <WorkshopSelector {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  selectWorkshop: (selectionId: string, teacher_id: string) =>
    console.log("selectionId", selectionId, "teacher_id", teacher_id),
  index: 0,
  student: {
    codigo: "1234567890",
    nombre: "Benito Antonio",
    //@ts-ignore
    apellido_paterno: "Martinez",
    apellido_materno: "Ocasio",
    genero: "M",
    telefono: "3412345678",
    email: "bad@bunny.pr",
    carrera: "Abogado",
    ciclo: "2022A",
    externo: false,
    curso: "en",
    nivel: 5,
    grupo: "E5-1",
    reservationCount: 0,
    reservationLimit: 5,
  },
  workshop: {
    name: "Conversation",
    description: "A conversation club",
    options: [
      {
        id: "4",
        day: "Lunes",
        time: "19:00 - 20:00",
        teacher_name: "Sergio",
        workshop_name: "Conversation",
        url: "https://meet.google.com/xtw-czdx-yhr",
        zoom_id: null,
        available: true,
      },
      {
        id: "5",
        day: "Martes",
        time: "19:00 - 20:00",
        teacher_name: "Sergio",
        workshop_name: "Conversation",
        url: "https://meet.google.com/xtw-czdx-yhr",
        zoom_id: null,
        available: true,
      },
    ],
  },
};
