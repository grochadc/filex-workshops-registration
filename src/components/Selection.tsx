import React from "react";

type Student = {
  name: string;
};

type SelectionProps = { student: Student };

const Selection: React.FC<any> = ({ student }: SelectionProps) => {
  return <div>Hello {student.name}!</div>;
};

export default Selection;
