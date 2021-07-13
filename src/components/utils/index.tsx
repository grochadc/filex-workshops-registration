import React from "react";
import Card from "react-bootstrap/Card";

type ReservationDetailsCardProps = {
  workshopName: string;
  teacher: string;
  day: string;
  time: string;
  url: string;
};
const ReservationDetailsCard = ({
  workshopName,
  teacher,
  day,
  time,
  url,
}: ReservationDetailsCardProps) => {
  return (
    <Card style={{ width: "25rem" }}>
      <Card.Body>
        <p>
          <b>Taller:</b> {workshopName}
        </p>
        <p>
          <b>Teacher:</b> {teacher}
        </p>
        <p>
          <b>Horario:</b> {day} {time}
        </p>
        <p>
          <b>Link:</b> <a href={url}>{url}</a>
        </p>
      </Card.Body>
    </Card>
  );
};

export { ReservationDetailsCard };
