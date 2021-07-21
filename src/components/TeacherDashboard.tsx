import React, { useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { capitalizeString } from "../utils/lib";
import { useQuery, useMutation, gql } from "@apollo/client";

type ReservationWithOptionObj = Reservation & {
  timestamp: string;
  option: Option;
};

let toObjWithIds = (arr: any[], key: string): {} => {
  let obj = {};
  arr.forEach((item) => (obj[item[key]] = { ...item }));
  return obj;
};

const Dashboard: React.FC<any> = () => {
  const { teacher }: { teacher: string } = useParams();
  const { data, loading, error } = useQuery(GET_RESERVATIONS, {
    variables: { teacher },
  });
  const [succesfulReservation, setSuccessfulReservation] = useState(false);
  const [saveAttendance] = useMutation(SAVE_ATTENDANCE, {
    onCompleted: () => setSuccessfulReservation(true),
  });
  const handleAttendance = (
    students: Attendance[],
    workshopInfo: { teacher: string; option_id: string }
  ) => {
    saveAttendance({ variables: { students, workshopInfo } });
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;
  return (
    <Container>
      <Row>
        <h3>Teacher {data.teacher.name}'s Workshops</h3>
      </Row>
      {data.teacher.options.map((option: Option, index: number) => (
        <WorkshopAttendance
          {...option}
          key={index}
          name={option.workshop}
          optionId={option.id}
          teacherId={option.teacher_id}
          teacher={data.teacher.name}
          reservations={data.teacher.reservations.filter(
            (reservation: ReservationWithOptionObj) =>
              reservation.option.day === option.day
          )}
          handleAttendance={handleAttendance}
          succesfulReservation={succesfulReservation}
        />
      ))}
      <Row>
        <a href="https://docs.google.com/spreadsheets/d/1AezhkIpOJ-rWg88jGbZb89DI2aSRtRTD4hlQcVF2thQ/edit#gid=0">
          Attendance in Google Sheets
        </a>
      </Row>
    </Container>
  );
};

interface ReducerAction {
  type: string;
  payload: string;
}

interface ReducerState {
  [prop: string]: {
    attended: boolean;
    code: string;
    name: string;
  };
}

interface WorkshopAttendanceProps {
  name: string;
  url: string;
  optionId: string;
  teacherId: string;
  day: string;
  time: string;
  workshop: string;
  teacher: string;
  reservations: Reservation[];
  handleAttendance: (
    info: any,
    workshop: { teacher: string; option_id: string }
  ) => any;
  succesfulReservation: boolean;
}
const WorkshopAttendance: React.FC<WorkshopAttendanceProps> = (props) => {
  const [workshopUrl, setWorkshopUrl] = React.useState(props.url);
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [saveWorkshopUrl] = useMutation(SAVE_WORKSHOP_URL, {
    onCompleted: () => {
      alert("Url saved successfully");
      setButtonLoading(false);
    },
  });
  const [showReservations, setShowReservations] = React.useState(true);
  const reducer = (state: ReducerState, action: ReducerAction) => {
    const targetProp = action.payload;
    const current = state[targetProp].attended;
    switch (action.type) {
      case "toggle_attendance":
        return {
          ...state,
          [targetProp]: {
            ...state[targetProp],
            attended: !current,
          },
        };
      default:
        return state;
    }
  };
  const reservations = props.reservations.map(
    ({ codigo, nombre, apellido_materno, apellido_paterno, grupo, nivel }) => {
      return {
        workshop: props.workshop,
        teacher: props.teacher,
        attended: false,
        codigo,
        nombre,
        apellido_paterno,
        apellido_materno,
        grupo,
        nivel,
      };
    }
  );

  const initialState = toObjWithIds(reservations, "codigo");
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Row>
      <Col>
        <h5>
          {props.name}: {capitalizeString(props.day)} {props.time}
        </h5>
        <Form.Group>
          <Row>
            <Form.Label>Link:</Form.Label>
            <Col>
              <Form.Control
                id="workshop-url"
                type="text"
                value={workshopUrl}
                onChange={(e) => setWorkshopUrl(e.target.value)}
              />
            </Col>
            <Col>
              <Button
                variant="secondary"
                onClick={() => {
                  setButtonLoading(true);
                  saveWorkshopUrl({
                    variables: {
                      option_id: props.optionId,
                      teacher_id: props.teacherId,
                      link: workshopUrl,
                    },
                  });
                }}
              >
                {buttonLoading ? <>Guardando...</> : <>Guardar</>}
              </Button>
              {props.succesfulReservation ? (
                <>
                  <br />
                  <Alert variant="success">Attendance saved successfuly!</Alert>
                </>
              ) : null}
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Table striped bordered size="sm">
            <thead>
              <tr>
                <th style={{ width: "9%" }}>Attendance</th>
                <th>Code</th>
                <th>Name</th>
                <th>Level</th>
                <th>Group</th>
              </tr>
            </thead>
            <tbody>
              {showReservations
                ? props.reservations.map((applicant, index) => {
                    return (
                      <tr key={index}>
                        <td style={{ textAlign: "center" }}>
                          <input
                            type="checkbox"
                            key={index}
                            checked={state[applicant.codigo].attended}
                            onChange={() =>
                              dispatch({
                                type: "toggle_attendance",
                                payload: applicant.codigo,
                              })
                            }
                          />
                        </td>
                        <td>{applicant.codigo}</td>
                        <td>
                          {applicant.nombre} {applicant.apellido_paterno}{" "}
                          {applicant.apellido_materno}
                        </td>
                        <td>{applicant.nivel}</td>
                        <td>{applicant.grupo}</td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </Table>
          <Button
            disabled={props.reservations.length === 0}
            onClick={() => {
              props.handleAttendance(Object.values(state), {
                teacher: props.teacherId,
                option_id: props.optionId,
              });
              setShowReservations(false);
            }}
          >
            Save Attendance
          </Button>
        </Form.Group>
      </Col>
    </Row>
  );
};

export const SAVE_WORKSHOP_URL = gql`
  mutation saveWorkshopUrl(
    $option_id: String!
    $teacher_id: String!
    $link: String!
  ) {
    setWorkshopLink(option_id: $option_id, teacher_id: $teacher_id, link: $link)
  }
`;

export const GET_RESERVATIONS = gql`
  query reservationsList($teacher: ID!) {
    teacher(id: $teacher) {
      name
      options {
        id
        teacher_id
        time
        day
        workshop
        url
      }
      reservations {
        codigo
        nombre
        apellido_paterno
        apellido_materno
        nivel
        grupo
        timestamp
        option {
          day
        }
      }
    }
  }
`;

export const SAVE_ATTENDANCE = gql`
  mutation saveAttendance(
    $students: [AttendingStudent!]
    $workshopInfo: SavedAttendanceWorkshopInfo!
  ) {
    saveWorkshopsAttendance(input: $students, workshop: $workshopInfo) {
      success
    }
  }
`;

export default Dashboard;
