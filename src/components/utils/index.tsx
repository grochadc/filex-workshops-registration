import React from "react";
import Card from "react-bootstrap/Card";

export const Loading = () => <div>Loading...</div>;
export const Error = ({ e }) => <div>{JSON.stringify(e)}</div>;

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
