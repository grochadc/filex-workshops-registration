import React, { useReducer, useState } from "react";
import { ReservationsListQuery } from "../generated/grapqhl";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { useMediaQuery } from "react-responsive";

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

type OptionFromReservationsListQuery =
  ReservationsListQuery["teacher"]["options"][0];
type AttendanceTableProps = {
  index: number;
  day: string;
  time: string;
  url?: string;
  reservations: OptionFromReservationsListQuery["reservations"];
  workshop: OptionFromReservationsListQuery["workshop"];
  option_id: string;
  teacher: ReservationsListQuery["teacher"];
  onSaveAttendance: (params: {
    attendance: any[];
  }) => Promise<any>;
};

const AttendanceTable = (props: AttendanceTableProps) => {
  const eventKey = props.index.toString();
  const initialState = props.reservations;
  type Action = { type: "change"; payload: number };
  function reducer(state: any, action: Action) {
    switch (action.type) {
      case "change":
        const currentItem = state[action.payload];
        if (currentItem === null) return state;
        return [
          ...state.slice(0, action.payload),
          {
            ...state[action.payload],
            attended: !currentItem.attended,
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

    props
      .onSaveAttendance({
        attendance: state,
      })
      .then(() => {
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
              <h4 className="font-bold text-2xl">{props.workshop.name}</h4>
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
            isTutorial={Boolean(props.workshop.id === 4)}
            onCheckboxChange={(index) =>
              dispatch({ type: "change", payload: index })
            }
          />
          <div className="flex justify-end w-full pt-4 pr-4">
            <button
              className="rounded rounded-sm bg-blue-500 p-2 m-1 text-white"
              onClick={handleSaveAttendance}
            >
              Save Attendance
            </button>
          </div>
          {loading ? <Tooltip>Saving...</Tooltip> : null}
          {!loading && success ? <Tooltip>Saved attendance!</Tooltip> : null}
        </div>
      </Accordion.Collapse>
    </div>
  );
};

type ReturnedReservation =
  ReservationsListQuery["teacher"]["options"][0]["reservations"][0];
type TableViewProps = {
  reservations: Exclude<ReturnedReservation, null>[];
  isTutorial: boolean;
  onCheckboxChange: (index: number) => void;
};

const TableView = (props: TableViewProps) => {
  const isMobile = useMediaQuery({ query: `(max-width:760px)` });
  const [showFullDetails, setShowFullDetails] = useState(false);
  return (
    <>
      {isMobile ? (
        <button
          className="underline text-blue-500"
          onClick={() => setShowFullDetails(!showFullDetails)}
        >
          Mostrar/Ocultar Datos Completos
        </button>
      ) : null}
      <table className="w-full mt-3">
        <thead>
          <tr className="border-b-4">
            <th>no.</th>
            {showFullDetails || !isMobile ? <th>Codigo</th> : null}
            <th>Nombre</th>
            {showFullDetails || !isMobile ? <th>email</th> : null}
            {showFullDetails || !isMobile ? <th>telefono</th> : null}
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
                  key={reservation?.id}
                >
                  <td className="py-2 text-center">{index + 1}</td>
                  {showFullDetails || !isMobile ? (
                    <td>{reservation?.student.codigo}</td>
                  ) : null}
                  <td>
                    {reservation?.student.nombre}{" "}
                    {reservation?.student.apellido_paterno}{" "}
                    {reservation?.student.apellido_materno}
                  </td>
                  {showFullDetails || !isMobile ? (
                    <td>
                      <a
                        href={`mailto:${reservation?.student.email}`}
                        target="_blank"
                        rel="noreferrer"
                        className="underline text-blue-500 hover:text-blue-300"
                      >
                        {reservation?.student.email}
                      </a>
                    </td>
                  ) : null}
                  {showFullDetails || !isMobile ? (
                    <td>{reservation?.student.telefono}</td>
                  ) : null}
                  <td className="text-center">{reservation?.student.nivel}</td>
                  <td className="text-center">{reservation?.student.grupo}</td>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      checked={
                        props.reservations && props.reservations[index].attended
                      }
                      onChange={() => props.onCheckboxChange(index)}
                    />
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </>
  );
};

const EmptyReservationsTable = () => (
  <>There are no reservations for this workshop.</>
);

export default AttendanceTable;
