import React from "react";
import { ReservationDetailsCard } from "./utils";

type ReservationDetailsProps = {
  reservationDetails: any;
};
const ReservationDetails = ({
  reservationDetails,
}: ReservationDetailsProps) => {
  //const {workshopName, time, day, url, teacher} = reservationDetails;
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <h1>Detalles de tu reservación</h1>
        <ReservationDetailsCard {...reservationDetails} />
      </div>
    </div>
  );
};

export default ReservationDetails;
