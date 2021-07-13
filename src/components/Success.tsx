import React from "react";
import { Link } from "react-router-dom";
import { ReservationDetailsCard } from "./utils";

type SuccessProps = {
  reservationResponse: any;
};

const Success: React.FC<SuccessProps> = ({ reservationResponse }) => {
  return (
    <div>
      <p>
        {reservationResponse.makeWorkshopReservation.alreadyRegistered ? (
          <>
            Ya te habías registrado a este taller. Consulta la informacion de tu
            taller <Link to="/details">aquí</Link>
          </>
        ) : (
          <>Reservación realizada con exito!</>
        )}
      </p>

      {reservationResponse.makeWorkshopReservation.alreadyRegistered ? null : (
        <ReservationDetailsCard
          workshopName={"somename"}
          teacher={"someteacher"}
          day={"anyday"}
          time={"notime"}
          url={reservationResponse.makeWorkshopReservation.url}
        />
      )}
    </div>
  );
};

export default Success;
