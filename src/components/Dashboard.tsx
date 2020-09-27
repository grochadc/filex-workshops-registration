import React, { useReducer } from "react";
import Form from "react-bootstrap/Form";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { capitalizeString } from "../utils/lib";
import { gql, useQuery } from "@apollo/client";

interface Option {
  day: string;
}

interface Reservation {
  code: string;
  name: string;
  option: Option;
}

const GET_RESERVATIONS = gql`
  query reservationsList {
    teacher(id: "alondra") {
      name
      options {
        time
        day
        workshop {
          name
        }
      }
      reservations {
        code
        name
        option {
          day
        }
      }
    }
  }
`;

interface WorkshopAttendanceProps {
  name: string;
  day: string;
  time: string;
  reservations: Reservation[];
  handleAttendance: (info: any) => any;
}

let transform = (arr, key) => {
  let obj = {};
  arr.forEach((item) => (obj[item[key]] = { attendance: false, ...item }));
  return obj;
};

const WorkshopAttendance: React.FC<WorkshopAttendanceProps> = (props) => {
  const reducer = (state, action: { type: string; payload: string }) => {
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
  const bareReservations = props.reservations.map((item) => {
    return { code: item.code, name: item.name };
  });

  const initialState = transform(bareReservations, "code");
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
                        value={state[applicant.code].attendance}
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

const Dashboard: React.FC<any> = () => {
  const { data, loading, error } = useQuery(GET_RESERVATIONS);
  if (loading) return <p>Loading...</p>;
  if (error) return <h1>Error</h1>;
  return (
    <Container>
      <Row>
        <h3>Teacher {data.teacher.name}'s Workshops</h3>
      </Row>
      {data.teacher.options.map((option, index) => (
        <WorkshopAttendance
          key={index}
          name={option.workshop.name}
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

export default Dashboard;
