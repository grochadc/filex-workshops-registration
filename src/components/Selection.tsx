import React, { useState, useEffect, Fragment } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import workshops from "./workshops";

type Student = {
  name: string;
};

type WorkshopSelection = {
  workshop: string;
  teacher: string;
  time: string;
};

const optionCardStyles = {
  width: "18rem",
  cursor: "pointer",
  color: "black",
  textDecoration: "none",
};

type SelectionProps = { code: string };

const Selection: React.FC<any> = ({ code }: SelectionProps) => {
  const [student, setStudent] = useState<Student | undefined>(undefined);
  const [workshopSelection, setWorkshopSelection] = useState<
    WorkshopSelection | undefined
  >(undefined);
  const handleWorkshopSelection = (selection: WorkshopSelection) => {
    setWorkshopSelection(selection);
    handleShowModal();
  };
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <Container>
      {student ? <>Hello {student.name}!</> : <p>Loading...</p>}
      {workshops.map((workshop, workshopIndex) => {
        const eventKey = workshopIndex.toString();
        return (
          <Accordion key={workshopIndex}>
            <Card className="text-center p-3">
              <Accordion.Toggle eventKey={eventKey} as={Button}>
                {workshop.name}
              </Accordion.Toggle>
              {workshop.description}
            </Card>
            <Accordion.Collapse eventKey={eventKey}>
              <Container>
                <Row>
                  {workshop.days.map((day) =>
                    day.options.map((option, optionIndex) => {
                      return (
                        <Col className="mb-3" key={optionIndex}>
                          <Card
                            onClick={() =>
                              handleWorkshopSelection({
                                workshop: workshop.name,
                                teacher: option.teacher,
                                time: `${day.name} ${option.time}`,
                              })
                            }
                            as="a"
                            style={optionCardStyles}
                            className="text-center pt-3"
                          >
                            <Card.Title>Teacher {option.teacher}</Card.Title>
                            <Card.Body>
                              {day.name} {option.time}
                            </Card.Body>
                          </Card>
                        </Col>
                      );
                    })
                  )}
                </Row>
              </Container>
            </Accordion.Collapse>
          </Accordion>
        );
      })}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Seleccionaste la opcion:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {workshopSelection ? (
            <>
              <p>
                <strong>Taller:</strong> <em>{workshopSelection.workshop}</em>
              </p>
              <p>
                <strong>Teacher:</strong> <em>{workshopSelection.teacher}</em>
              </p>
              <p>
                <strong>Horario:</strong> <em>{workshopSelection.time}</em>
              </p>
            </>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Reservar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

/*
useEffect(() => {
  let mounted = true;
  if (code) {
    fetch(`/students/${code}`)
      .then((response) => response.json())
      .then((student) => {
        if (mounted) {
          setStudent(student);
        }
      })
      .catch(console.error);
  }
  function callback() {
    mounted = false;
  }
  return callback;
}, [code]);
*/

export default Selection;
