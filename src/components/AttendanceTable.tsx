import React, { useReducer, useState } from "react";
import { ReservationsListQuery, AttendingStudent } from "../generated/grapqhl";
import Table from "react-bootstrap/Table";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

import tw from "tailwind-styled-components";

const Tooltip = tw.div`
  rounded
  border
  border-black
  min-w-20
  max-w-max
  p-1
  px-2
  m-3
  text-center
`;

type Reservations =
  ReservationsListQuery["teacher"]["options"][0]["reservations"];

type AttendanceTableProps = {
  index: number;
  day: string;
  time: string;
  url: string;
  reservations: Reservations | null | undefined;
  workshop_id: string;
  workshop_name: string;
  option_id: string;
  teacher_id: string;
  teacher_name: string;
  onSaveAttendance: (params: {
    attendance: AttendingStudent[];
    option_id: string;
  }) => Promise<any>;
};

const AttendanceTable = (props: AttendanceTableProps) => {
  const eventKey = props.index.toString();
  const initialState = props.reservations
    ? props.reservations.map((reservation) => {
        return {
          ...reservation,
          attended: false,
        };
      })
    : [];
  type Action = { type: "change"; payload: number };
  function reducer(state: typeof initialState, action: Action) {
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
  const [state, dispatch] = useReducer(reducer, initialState);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleSaveAttendance = () => {
    setLoading(true);

    function getValidatedAttendance(
      state: typeof initialState,
      teacher: string,
      workshop: string
    ): AttendingStudent[] {
      return state.map((item) => {
        const { __typename, email, telefono, ...result } = item;
        return {
          ...result,
          teacher,
          workshop,
        };
      });
    }

    props.onSaveAttendance({
      attendance: getValidatedAttendance(
        state,
        props.teacher_name,
        props.workshop_name
      ),
      option_id: props.option_id,
    }).then(() => {
      setLoading(false);
      setSuccess(true);
    });
  };
  return (
    <div>
      <Accordion.Toggle eventKey={eventKey} as={Card}>
        <Card.Body>
          <div className="flex justify-around">
            <div>
              <h4 className="font-bold text-2xl">{props.workshop_name}</h4>
              <h5 className="font-bold text-lg">
                {props.day} {props.time}
              </h5>
              <p>
                Link:{" "}
                <a
                  className="underline text-blue-500 hover:text-blue-300"
                  href={props.url}
                >
                  {props.url}
                </a>
              </p>
            </div>
            <div className="cursor-pointer">Click para Abrir/Cerrar</div>
          </div>
        </Card.Body>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={eventKey}>
        <div>
          <TableView
            reservations={state}
            isTutorial={Boolean(props.workshop_id === "4")}
            onCheckboxChange={(index) =>
              dispatch({ type: "change", payload: index })
            }
          />
          <button
            className="rounded rounded-sm bg-blue-500 p-2 m-1 text-white"
            onClick={handleSaveAttendance}
          >
            Save
          </button>
          <a 
            href={`mailto:${props.reservations?.map((reservation) => reservation.email).join(',')}`}
            className="underline text-blue-500 hover:text-blue-300"
            target="_blank">
              Enviar correo a todos
          </a>
          {loading ? <Tooltip>Saving...</Tooltip> : null}
          {!loading && success ? <Tooltip>Saved attendance!</Tooltip> : null}
        </div>
      </Accordion.Collapse>
    </div>
  );
};

type TableViewProps = {
  reservations: any[];
  isTutorial: boolean;
  onCheckboxChange: (index: number) => void;
};

const TableView = (props: TableViewProps) => {
  return (
    <table className="w-screen mt-3">
      <thead>
        <tr className="border-b-4">
          <th>no.</th>
          <th>Codigo</th>
          <th>Nombre</th>
          <th>email</th>
          <th>telefono</th>
          <th>Nivel</th>
          <th>Grupo</th>
          <th>Present</th>
        </tr>
      </thead>
      <tbody>
        {props.reservations.length === 0 ? (
          <EmptyReservationsTable />
        ) : (
          props.reservations.map((reservation, index) => {
            return (
              <tr
                className="odd:bg-white even:bg-slate-100"
                key={reservation.id}
              >
                <td className="py-2 text-center">{index + 1}</td>
                <td>{reservation.codigo}</td>
                <td>
                  {reservation.nombre} {reservation.apellido_paterno}{" "}
                  {reservation.apellido_materno}
                </td>
                <td>{reservation.email}</td>
                <td>{reservation.telefono}</td>
                <td className="text-center">{reservation.nivel}</td>
                <td className="text-center">{reservation.grupo}</td>
                <td className="text-center">
                  <input
                    type="checkbox"
                    checked={props.reservations[index].attended}
                    onChange={() => props.onCheckboxChange(index)}
                  />
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};

const EmptyReservationsTable = () => (
  <>There are no reservations for this workshop.</>
);

export default AttendanceTable;
