import React from "react";
import { EmailIconButton } from "./index";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "Utilities/EmailIconButton",
  component: EmailIconButton,
} as ComponentMeta<typeof EmailIconButton>;

const Template: ComponentStory<typeof EmailIconButton> = (args) => (
  <EmailIconButton {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  fill: "white",
  emails: ["bad@bunny.pr", "gerard.way@mcr.org"],
  title:"Enviar Correo a Todos"
};
