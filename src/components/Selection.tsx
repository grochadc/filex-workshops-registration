import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Router from "./Router";
import Database from "../dbInterface";
import { useFetch, useModal } from "../hooks";

import workshops from "./workshops";

type Student = {
  code: string;
  name: string;
};

type WorkshopSelection = {
  workshop: string;
  teacher: string;
  day: string;
  time: string;
  code: string;
  name: string;
};

const optionCardStyles = {
  width: "18rem",
  cursor: "pointer",
  color: "black",
  textDecoration: "none",
};

type SelectionProps = { code: string | undefined };

const capitalizeString = (str: string) => {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
};

const generateId = () => {
  let str = Math.random().toString(36).substring(7);
  return str;
};

const Selection: React.FC<SelectionProps> = ({ code }) => {
  const { response, error, isLoading } = useFetch(`students/${code}`);
  const student: Student = response;
  const { setRoute } = Router.useRoute();
  const [workshopSelection, setWorkshopSelection] = useState<
    WorkshopSelection | undefined
  >(undefined);
  const { showModal, handleCloseModal, handleShowModal } = useModal();
  const handleWorkshopSelection = (selection: WorkshopSelection) => {
    setWorkshopSelection(selection);
    handleShowModal();
  };
  const handlePostData = (data: WorkshopSelection | undefined) => {
    if (code && data) {
      Database.ref(`workshops/${data.teacher}/${generateId()}`)
        .set({ ...data, day: data.day })
        .then(() => {
          handleCloseModal();
          setRoute("success");
        })
        .catch(() => {
          alert("Hubo un error. Por favor intenta de nuevo.");
        });
    } else {
      alert("Por favor revisa tu codigo o seleccion");
    }
  };

  return (
    <Container>
      {error ? (
        <p>
          Sucedió un error. Porfavor intenta de nuevo. Error code:{" "}
          {error.status} {error.message}
        </p>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {student && <>Hello {student.name}!</>}
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
                                    day: day.name,
                                    code: student.code,
                                    name: student.name,
                                  })
                                }
                                as="a"
                                style={optionCardStyles}
                                className="text-center pt-3"
                              >
                                <Card.Title>
                                  Teacher {capitalizeString(option.teacher)}
                                </Card.Title>
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
        </div>
      )}
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
                <strong>Teacher:</strong>{" "}
                <em>{capitalizeString(workshopSelection.teacher)}</em>
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
          <Button
            variant="primary"
            onClick={() => handlePostData(workshopSelection)}
          >
            Reservar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Selection;
