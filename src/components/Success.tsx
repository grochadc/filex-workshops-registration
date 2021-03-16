import React from "react";

type SuccessProps = {
  reservationResponse: any;
};

const Success: React.FC<SuccessProps> = ({ reservationResponse }) => {
  return (
    <div>
      <p>Reservación realizada con exito!</p>
      <p>ID de Reservacion: {reservationResponse.makeWorkshopReservation.id}</p>
      <p>Codigo: {reservationResponse.makeWorkshopReservation.codigo}</p>
      <p>Nombre: {reservationResponse.makeWorkshopReservation.nombre}</p>
      <p>Hora: {reservationResponse.makeWorkshopReservation.timestamp}</p>
      <p>
        URL del taller:{" "}
        <a href={reservationResponse.makeWorkshopReservation.url}>
          {reservationResponse.makeWorkshopReservation.url}
        </a>
      </p>
      {reservationResponse.makeWorkshopReservation.zoom_id && (
        <p>Zoom ID: {reservationResponse.makeWorkshopReservation.zoom_id}</p>
      )}
    </div>
  );
};

export default Success;
