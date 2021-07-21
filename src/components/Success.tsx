import React from "react";
import { Link } from "react-router-dom";
import { ReservationDetailsCard } from "./utils";

type SuccessProps = {
  reservationResponse: any;
};

const Success: React.FC<SuccessProps> = ({ reservationResponse }) => {
  const {
    teacher,
    day,
    time,
    url,
  } = reservationResponse.makeWorkshopReservation;
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
          workshopName={"noname"}
          teacher={teacher}
          day={day}
          time={time}
          url={url}
        />
      )}
    </div>
  );
};

export default Success;
