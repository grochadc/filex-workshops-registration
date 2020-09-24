import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Database from "../dbInterface";
import { capitalizeString } from "../lib";

type Applicant = {
  code: string;
  day: string;
  name: string;
  teacher: string;
  time: string;
  workshop: string;
  id: string;
};

const Loading: React.FC<{ isLoading: boolean; children: React.ReactNode }> = ({
  isLoading,
  children,
}) => {
  return <>{isLoading ? <p>Loading...</p> : <>{children}</>}</>;
};

const getUniqueKeys = (applicants: Applicant[], key: string): string[] => {
  const keys = applicants.map((applicant) => applicant[key]);
  let unique = (keys: string[]) => keys.filter((v, i) => keys.indexOf(v) === i);
  return unique(keys);
};

const filterApplicants = (applicants: Applicant[]) => {
  return getUniqueKeys(applicants, "day").map((uniqueKey) =>
    applicants.filter((applicant) => applicant["day"] === uniqueKey)
  );
};

const Dashboard: React.FC<any> = () => {
  const [applicants, setApplicants] = useState<Applicant[] | undefined>();
  const [loading, setLoading] = useState(false);
  const [teacherName, setTeacherName] = useState<string | null>();
  useEffect(() => {
    const params = new URL(window.location.href).searchParams;
    const teacher = params.get("teacher");
    setTeacherName(teacher);
    const dbRef = `workshops/${params.get("teacher")}`;
    setLoading(true);
    Database.ref(dbRef)
      .once("value")
      .then((snapshot) => {
        const values: Applicant[] = Object.values(snapshot.val());
        setApplicants(values);
        setLoading(false);
      });
  }, []);

  applicants && console.log(filterApplicants(applicants));
  return (
    <Loading isLoading={loading}>
      <Container>
        <Row>
          <h3>
            Teacher {teacherName && capitalizeString(teacherName)}'s Workshops
          </h3>
        </Row>
        {applicants &&
          filterApplicants(applicants).map((dayArray) => (
            <Row>
              <Col>
                <h5>
                  {dayArray[0].workshop}: {dayArray[0].time}
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
                      {dayArray.map((applicant, i) => (
                        <tr>
                          <td style={{ textAlign: "center" }}>
                            <input
                              type="checkbox"
                              key={i}
                              value={applicant.code}
                            />
                          </td>
                          <td>
                            <label>{applicant.code}</label>
                          </td>
                          <td>{applicant.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <Button>Send</Button>
                </Form.Group>
              </Col>
            </Row>
          ))}
      </Container>
    </Loading>
  );
};

export default Dashboard;
