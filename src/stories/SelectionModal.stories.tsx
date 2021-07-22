import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SelectionModal } from "../components/Selection";

export default {
  title: "SelectionModal",
  component: SelectionModal,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof SelectionModal>;

const Template: ComponentStory<typeof SelectionModal> = (args) => (
  <SelectionModal {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  show: true,
  selectionForModal: {
    workshop: "Conversation",
    teacher: "Gonzalo",
    day: "gonzalolunes",
    time: "14:00 - 15:00",
  },
  workshopSelection: { codigo: "1234567890", option_id: "gonzalolunes" },
};

export const Empty = Template.bind({});
Empty.args = {
  show: true,
  selectionForModal: undefined,
  workshopSelection: { codigo: "1234567890", option_id: "gonzalolunes" },
};

/*
handleCloseModal: () => void;
handleSubmit: (selection: any) => void;
show: boolean;
selectionForModal: SelectionForModal | undefined;
workshopSelection: any;
*/
