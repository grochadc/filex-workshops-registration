import React, { useReducer } from "react";
import { ReservationsListQuery, AttendingStudent } from "../generated/grapqhl";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

type Reservations = ReservationsListQuery["teacher"]["options"][0]["reservations"];

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
  }) => void;
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

  const handleSaveAttendance = () => {
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
    });
  };
  return (
    <div>
      <Accordion.Toggle eventKey={eventKey} as={Card}>
        <Card.Body>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div>
              <h4>{props.workshop_name}</h4>
              <h5>
                {props.day} {props.time}
              </h5>
              <p>
                Link: <a href={props.url}>{props.url}</a>
              </p>
            </div>
            <div>Click para Abrir/Cerrar</div>
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
          <Button onClick={handleSaveAttendance}>Save</Button>
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
    <Table>
      <thead>
        <tr>
          <th>no.</th>
          <th>Codigo</th>
          <th>Nombre</th>
          <th>email</th>
          <th>telefono</th>
          <th>Nivel</th>
          <th>Grupo</th>
          {props.isTutorial ? <th>Tutorial reason</th> : null}
          <th>Present</th>
        </tr>
      </thead>
      <tbody>
        {props.reservations.length === 0 ? (
          <EmptyReservationsTable />
        ) : (
          props.reservations.map((reservation, index) => {
            return (
              <tr key={reservation.id}>
                <td>{index + 1}</td>
                <td>{reservation.codigo}</td>
                <td>
                  {reservation.nombre} {reservation.apellido_paterno}{" "}
                  {reservation.apellido_materno}
                </td>
                <td>{reservation.email}</td>
                <td>{reservation.telefono}</td>
                <td>{reservation.nivel}</td>
                <td>{reservation.grupo}</td>
                {props.isTutorial ? (
                  <td>
                    {reservation.tutorial_reason
                      ? reservation.tutorial_reason
                      : "null"}
                  </td>
                ) : null}
                <td>
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
    </Table>
  );
};

const EmptyReservationsTable = () => (
  <div>There are no reservations for this workshop.</div>
);

export default AttendanceTable;
