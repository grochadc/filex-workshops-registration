import React, { useReducer } from "react";
import Form from "react-bootstrap/Form";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { capitalizeString } from "../utils/lib";
import { gql, useQuery } from "@apollo/client";

const GET_RESERVATIONS = gql`
  query reservationsList($teacher: ID!) {
    teacher(id: $teacher) {
      name
      options {
        time
        day
        workshop
      }
      reservations {
        code
        name
        timestamp
        option {
          day
        }
      }
    }
  }
`;

let toObjWithIds = (arr: any[], key: string): {} => {
  let obj = {};
  arr.forEach((item) => (obj[item[key]] = { ...item }));
  return obj;
};

const dateParser = (timestamp) => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

const Dashboard: React.FC<any> = ({ teacher }) => {
  const { data, loading, error } = useQuery(GET_RESERVATIONS, {
    variables: { teacher },
  });
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <h1>Error: {JSON.stringify(error)}</h1>;
  return (
    <Container>
      <Row>
        <h3>Teacher {data.teacher.name}'s Workshops</h3>
      </Row>
      {data.teacher.options.map((option: Option, index: number) => (
        <WorkshopAttendance
          key={index}
          name={option.workshop}
          day={option.day}
          time={option.time}
          reservations={data.teacher.reservations.filter(
            (reservation: Reservation) => reservation.option.day === option.day
          )}
          handleAttendance={(info: any) => console.log("parent", info)}
        />
      ))}
    </Container>
  );
};

interface WorkshopAttendanceProps {
  name: string;
  day: string;
  time: string;
  reservations: Reservation[];
  handleAttendance: (info: any) => any;
}
interface ReducerAction {
  type: string;
  payload: string;
}

interface ReducerState {
  [prop: string]: {
    attendance: boolean;
    code: string;
    name: string;
  };
}

const WorkshopAttendance: React.FC<WorkshopAttendanceProps> = (props) => {
  const reducer = (state: ReducerState, action: ReducerAction) => {
    const targetProp = action.payload;
    const current = state[targetProp].attendance;
    switch (action.type) {
      case "toggle_attendance":
        return {
          ...state,
          [targetProp]: {
            ...state[targetProp],
            attendance: !current,
          },
        };
      default:
        return state;
    }
  };
  const reservations = props.reservations.map((item) => {
    return { attendance: false, code: item.code, name: item.name };
  });

  const initialState = toObjWithIds(reservations, "code");
  const [state, dispatch] = useReducer(reducer, initialState);
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
                <th>Reservation made:</th>
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
                        checked={state[applicant.code].attendance}
                        onChange={() =>
                          dispatch({
                            type: "toggle_attendance",
                            payload: applicant.code,
                          })
                        }
                      />
                    </td>
                    <td>{applicant.code}</td>
                    <td>{applicant.name}</td>
                    <td>{dateParser(applicant.timestamp)}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Button
            disabled={props.reservations.length === 0}
            onClick={() => props.handleAttendance(state)}
          >
            Send
          </Button>
        </Form.Group>
      </Col>
    </Row>
  );
};

export default Dashboard;
