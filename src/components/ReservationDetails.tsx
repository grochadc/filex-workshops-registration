import React from "react";
import { useHistory } from "react-router-dom";
import { ReservationDetailsCard } from "./utils";
import { ReservationDetailsType } from "../App";

type ReservationDetailsProps = {
  reservationDetails: ReservationDetailsType;
};
const ReservationDetails = (props: ReservationDetailsProps) => {
  const history = useHistory();
  if (props.reservationDetails.workshop_name.length === 0) {
    history.push("/");
  }
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
