import React, { useReducer } from "react";
import { ReservationsListQuery } from "../generated/grapqhl";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

type Reservations = ReservationsListQuery["teacher"]["options"][0]["reservations"];

type AttendanceTableProps = {
  reservations: Reservations | null | undefined;
  workshop_id: string;
  option_id: string;
  onSaveAttendance: (params: { attendance: any[]; option_id: string }) => void;
};

const AttendanceTable = (props: AttendanceTableProps) => {
  type Action = { type: "change"; payload: number };
  function reducer(state: any, action: Action) {
    switch (action.type) {
      case "change":
        return [
          ...state.slice(0, action.payload),
          {
            ...state[action.payload],
            attended: !state[action.payload].attended,
          },
          ...state.slice(action.payload + 1),
        ];
      default:
        throw new Error("Couldn't match action type on reducer");
    }
  }
  const initialState = props.reservations
    ? props.reservations.map((reservation) => {
        return {
          ...reservation,
          attended: false,
        };
      })
    : [];
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleSaveAttendance = () => {
    props.onSaveAttendance({ attendance: state, option_id: props.option_id });
  };
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>no.</th>
            <th>Codigo</th>
            <th>Nombre</th>
            <th>Nivel</th>
            <th>Grupo</th>
            {props.workshop_id === "4" ? <th>Tutorial reason</th> : null}
            <th>Present</th>
          </tr>
        </thead>
        <tbody>
          {state.map((reservation, index) => {
            return (
              <tr key={reservation.id}>
                <td>{index + 1}</td>
                <td>{reservation.codigo}</td>
                <td>
                  {reservation.nombre} {reservation.apellido_paterno}{" "}
                  {reservation.apellido_materno}
                </td>
                <td>{reservation.nivel}</td>
                <td>{reservation.grupo}</td>
                {props.workshop_id === "4" ? (
                  <td>
                    {reservation.tutorial_reason
                      ? reservation.tutorial_reason
                      : "null"}
                  </td>
                ) : null}
                <td>
                  <input
                    type="checkbox"
                    value={state[index].attended}
                    onChange={() =>
                      dispatch({ type: "change", payload: index })
                    }
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button onClick={handleSaveAttendance}>Save</Button>
    </div>
  );
};

export default AttendanceTable;
