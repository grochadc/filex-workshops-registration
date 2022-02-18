import React from "react";
import Card from "react-bootstrap/Card";
import tw from "tailwind-styled-components";

type ButtonProps = {
  primary: boolean;
  secondary: boolean;
};
export const Button = tw.button<ButtonProps>`
${(props) => (props.secondary ? "bg-grey-500" : "bg-blue-500")}
rounded
text-white
p-2
m-1
`;

export const Alert = tw.div`
  bg-yellow-100
  border-t-4
  border-yellow-500
  text-yellow-900
  px-4
  py-3
  shadow-md
  my-2
  sm:my-2
  md:my-5
`;

export const Loading = () => <div>Loading...</div>;
type ErrorProps = { e: any };
export const Error = (props: ErrorProps) => (
  <pre className="w-screen" id="error">
    {JSON.stringify(props.e, undefined, 2)}
  </pre>
);

type ReservationDetailsCardProps = {
  workshop_name: string;
  teacher_name: string;
  day: string;
  time: string;
  url: string;
};
const ReservationDetailsCard = (props: ReservationDetailsCardProps) => {
  return (
    <Card style={{ width: "25rem" }}>
      <Card.Body>
        <p>
          <b>Taller:</b> {props.workshop_name}
        </p>
        <p>
          <b>Teacher:</b> {props.teacher_name}
        </p>
        <p>
          <b>Horario:</b> {props.day} {props.time}
        </p>
        <p>
          <b>Link:</b>{" "}
          <a data-testid="reservation-anchor" href={props.url}>
            {props.url}
          </a>
        </p>
      </Card.Body>
    </Card>
  );
};

export { ReservationDetailsCard };
