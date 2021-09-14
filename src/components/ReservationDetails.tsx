import React from "react";
import { ReservationDetailsCard } from "./utils";
import { ReservationDetailsType } from "../App";

type ReservationDetailsProps = {
  reservationDetails: ReservationDetailsType;
};
const ReservationDetails = (props: ReservationDetailsProps) => {
  //const {workshopName, time, day, url, teacher} = reservationDetails;
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <h1>Detalles de tu reservación</h1>
        <ReservationDetailsCard {...props.reservationDetails} />
      </div>
    </div>
  );
};

export default ReservationDetails;
