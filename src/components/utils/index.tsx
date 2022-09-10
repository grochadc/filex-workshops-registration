import React from "react";
import Card from "react-bootstrap/Card";
import tw from "tailwind-styled-components";

type ButtonProps = {
  variant?: "primary" | "secondary"
};
export const Button = tw.button<ButtonProps>`
${(p) => (p.variant === "secondary" ? "bg-gray-400" : "bg-blue-500")}
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

export const EmailIconButton = (props: {fill: string, emails: string[], title?: string}) => {
  return (
  <a 
    className="flex w-10 rounded rounded-sm bg-blue-500 p-2 m-1 text-white cursor-pointer"
    href={`mailto:${props.emails.join(',')}`}
    target="_blank"
    title={props.title}
  ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={props.fill ? props.fill : "black"}><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg></a>)
}

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
