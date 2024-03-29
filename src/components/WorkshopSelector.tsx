import React, { useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "./utils";
import Alert from "react-bootstrap/Alert";
import { IsWorkshopsOpenContext } from "../pages/SelectionPage";
import { GetSelectionInfoQuery } from "../generated/grapqhl";

type Student = GetSelectionInfoQuery['student'];

const optionCardStyles = {
  width: "18rem",
  cursor: "pointer",
  color: "black",
  textDecoration: "none",
};

type WorkshopSelectorProps = {
  workshop: any;
  index: number;
  student: Student;
  selectWorkshop: (selectionId: string, teacher_id: string) => void;
};
const WorkshopSelector = ({
  workshop,
  index,
  selectWorkshop,
}: WorkshopSelectorProps) => {
  const isWorkshopsOpen = useContext(IsWorkshopsOpenContext);
  const eventKey = index.toString();
  return (
    <Accordion key={workshop.id}>
      <Card className="text-center p-3">
        <Accordion.Toggle eventKey={eventKey} as={Button}>
          {workshop.name}
        </Accordion.Toggle>
        {workshop.description}
      </Card>
      <Accordion.Collapse eventKey={eventKey}>
        <Container>
          <Row>
            {workshop.options.filter(option => option.active).map((option, optionIndex) => {
              return (
                <Col className="mb-3" key={optionIndex}>
                  <Card
                    as="a"
                    style={optionCardStyles}
                    className="text-center pt-3"
                  >
                    <Card.Title
                      className={option.available ? "" : "text-muted"}
                    >
                      Teacher { option.teacher.nombre }
                    </Card.Title>
                    <Card.Subtitle
                      className={option.available ? "" : "text-muted"}
                    >
                      {option.day}
                    </Card.Subtitle>
                    <Card.Body className={option.available ? "" : "text-muted"}>
                      {option.time}
                      {option.available ? (
                        <p>
                          <Button
                            variant={isWorkshopsOpen ? "primary" : "secondary"}
                            disabled={!isWorkshopsOpen}
                            onClick={() => {
                              selectWorkshop(option.id, option.teacher_id);
                            }}
                            data-testid={`button-reservar-${option.id}`}
                          >
                            Reservar
                          </Button>
                        </p>
                      ) : (
                        <Alert variant="danger">Lugares no disponibles</Alert>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </Accordion.Collapse>
    </Accordion>
  );
};

export default WorkshopSelector;
