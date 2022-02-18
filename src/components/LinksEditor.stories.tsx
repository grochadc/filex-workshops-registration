import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import LinksEditor from "./LinksEditor";

export default {
  title: "Components/LinksEditor",
  component: LinksEditor,
  argTypes: { saveLinkOnServer: { action: "saved" } },
} as ComponentMeta<typeof LinksEditor>;

const Template: ComponentStory<typeof LinksEditor> = (args) => (
  <LinksEditor {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  options: [
    {
      id: "1",
      workshop_name: "Conversation",
      day: "Lunes",
      time: "13:00 - 14:00",
      url: "https://meet.google.com",
    },
  ],
};
