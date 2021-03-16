import React, { useReducer } from "react";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
  const [saveAttendance] = useMutation(SAVE_ATTENDANCE, {
    onCompleted: () => console.log("Saved attendance succe"),
  });
  const handleAttendance = (students: Attendance[]) => {
    console.log("students", students);
    saveAttendance({ variables: { students: students } });
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
          key={index}
          name={option.workshop}
          workshop={option.workshop}
          teacher={data.teacher.name}
          day={option.day}
          time={option.time}
          reservations={data.teacher.reservations.filter(
            (reservation: ReservationWithOptionObj) =>
              reservation.option.day === option.day
          )}
          handleAttendance={handleAttendance}
        />
      ))}
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
  day: string;
  time: string;
  workshop: string;
  teacher: string;
  reservations: Reservation[];
  handleAttendance: (info: any) => any;
}
const WorkshopAttendance: React.FC<WorkshopAttendanceProps> = (props) => {
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
  console.log("state", initialState);
  return (
    <Row>
      <Col>
        <h5>
          {props.name}: {capitalizeString(props.day)} {props.time}
        </h5>
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
              {props.reservations.map((applicant, index) => {
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
              })}
            </tbody>
          </Table>
          <Button
            disabled={props.reservations.length === 0}
            onClick={() => props.handleAttendance(Object.values(state))}
          >
            Send
          </Button>
        </Form.Group>
      </Col>
    </Row>
  );
};

export const GET_RESERVATIONS = gql`
  query reservationsList($teacher: ID!) {
    teacher(id: $teacher) {
      name
      options {
        time
        day
        workshop
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
  mutation saveAttendance($students: [AttendingStudent!]) {
    saveWorkshopsAttendance(input: $students) {
      success
    }
  }
`;

export default Dashboard;
