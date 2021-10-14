import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import WorkshopSelector from "../components/WorkshopSelector";

export default {
  title: "WorkshopSelector",
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
    id: "1234567890",
    codigo: "1234567890",
    nombre: "Benito Antonio",
    apellido_paterno: "Martinez",
    apellido_materno: "Ocasio",
    telefono: "3412345678",
    email: "bad@bunny.pr",
    nivel: 5,
    grupo: "E5-1",
  },
  workshop: {
    name: "Conversation",
    description: "A conversation club",
    options: [
      {
        id: "gonzalojueves",
        teacher: "gonzalo",
        teacher_id: "gonzalo",
        time: "15:00 - 16:00",
        day: "jueves",
        url: "https://meet.google.com/lookup/gonzaloconversation",
        workshop: "conversation",
        available: true,
      },
    ],
  },
};
