import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Router from "./Router";
import { useModal } from "../hooks";
import { gql, useQuery } from "@apollo/client";

const optionCardStyles = {
  width: "18rem",
  cursor: "pointer",
  color: "black",
  textDecoration: "none",
};

const capitalizeString = (str: string) => {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
};

const GET_STUDENT = gql`
  query getSelectionInfo($code: String!) {
    student(code: $code) {
      code
      name
    }
    workshops {
      name
      description
      options {
        id
        day
        time
        teacher
        workshop
        url
        zoom_id
      }
    }
  }
`;

type Option = {
  id: string;
  day: string;
  time: string;
  teacher: string;
  url: string;
  zoom_id?: string;
};
type Workshop = {
  name: string;
  description: string;
  options: Option[];
};
type WorkshopSelection = {
  code: string;
  name: string;
  workshop_id: string;
  option_id: string;
  teacher_id?: String;
  url: string;
  zoom_id?: string;
};

type SelectionForModal = {
  workshop: string;
  teacher: string;
  day: string;
  time: string;
};

type SelectionProps = {
  code: string | undefined;
  setReservation: React.Dispatch<any> | undefined;
};
const Selection: React.FC<SelectionProps> = ({ code, setReservation }) => {
  const { data, loading, error } = useQuery(GET_STUDENT, {
    variables: { code },
  });
  const { setRoute } = Router.useRoute();
  const [workshopSelection, setWorkshopSelection] = useState<
    WorkshopSelection | undefined
  >(undefined);
  const [selectionForModal, setSelectionForModal] = useState<
    SelectionForModal | undefined
  >(undefined);
  const { showModal, handleCloseModal, handleShowModal } = useModal();
  const handleWorkshopSelection = (selection: WorkshopSelection) => {
    const options = data.workshops.map((workshop) => workshop.options).flat();
    const selectedOption = options.filter(
      (option) => option.id === selection.option_id
    )[0];
    setWorkshopSelection(selection);
    setSelectionForModal({
      workshop: selectedOption.workshop,
      teacher: selectedOption.teacher,
      day: selectedOption.day,
      time: selectedOption.time,
    });
    handleShowModal();
  };
  const handlePostData = (data: WorkshopSelection | undefined) => {
    data && setReservation && setReservation(data);
    console.log("reservation from selection component", data);
    setRoute("success");
  };

  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  if (loading) return <p>Loading...</p>;
  return (
    <Container>
      <div>
        <>Hola {data.student.name}!</>
        {data.workshops.map((workshop: Workshop, workshopIndex: number) => {
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
                    {workshop.options.map((option, optionIndex) => (
                      <Col className="mb-3" key={optionIndex}>
                        <Card
                          onClick={() =>
                            handleWorkshopSelection({
                              code: data.student.code,
                              name: data.student.name,
                              url: option.url,
                              zoom_id: option.zoom_id,
                              option_id: option.id,
                              workshop_id: workshop.name,
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
                            {option.day} {option.time}
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Container>
              </Accordion.Collapse>
            </Accordion>
          );
        })}
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Seleccionaste la opcion:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectionForModal ? (
            <>
              <p>
                <strong>Taller:</strong>{" "}
                <em>{capitalizeString(selectionForModal.workshop)}</em>
              </p>
              <p>
                <strong>Teacher:</strong>{" "}
                <em>{capitalizeString(selectionForModal.teacher)}</em>
              </p>
              <p>
                <strong>Horario:</strong> <em>{selectionForModal.time}</em>
              </p>
              <p>
                <strong>Dia:</strong>{" "}
                <em>{capitalizeString(selectionForModal.day)}</em>
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
