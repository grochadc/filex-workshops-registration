import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { Button } from "./utils";
import Modal from "react-bootstrap/Modal";
import { GetSelectionInfoQuery } from "../generated/grapqhl";
import WorkshopSelector from "./WorkshopSelector";
import { findWorkshopNameFromOptionId } from "../utils/lib";

type Student = GetSelectionInfoQuery["student"];
type Workshops = GetSelectionInfoQuery["workshops"];
type SelectionForModal = Workshops[0]["options"][0] & { workshop_name: string };

export type SelectionProps = {
  student: Student;
  workshops: Workshops;
  onReservation: (option_id: string, tutorial_reason?: string) => void;
  isWorkshopsOpen: boolean;
};
const Selection = (props: SelectionProps) => {
  const [selectionForModal, setSelectionForModal] =
    useState<SelectionForModal | undefined>();
  const [showModal, setShowModal] = useState(false);
  const [selection, setSelection] =
    useState<{ option_id: string } | undefined>();

  const selectWorkshop = (selectionId: string) => {
    const options = props.workshops
      .map((workshop) => workshop.options)
      .flat()
      .filter((option) => option.active)
      .sort();

      // TO DO sort options by Lunes, Martes and time 19:00 abstract and test
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

    const selectedOption = options.filter(
      (option) => option.id === selectionId
    )[0];

    setSelection({
      option_id: selectionId,
    });

    const selectedOptionWorkshopName = findWorkshopNameFromOptionId(
      props.workshops,
      selectionId
    );

    setSelectionForModal({
      ...selectedOption,
      workshop_name: selectedOptionWorkshopName
        ? selectedOptionWorkshopName
        : "",
    });

    setShowModal(true);
  };
  const handleReservationConfirmation = (tutorial_reason?: string) => {
    if (selection) {
      props.onReservation(selection.option_id, tutorial_reason);
    }
  };
  return (
    <Container>
      <div>
        {!props.isWorkshopsOpen ? (
          <Alert variant="primary">
            El registro esta cerrado. El horario para registro de talleres es
            Viernes a partir de las 11:00 am
          </Alert>
        ) : null}
        {props.workshops
          .filter((workshop) =>
            workshop.levels.includes(String(props.student.nivel))
          )
          .map((workshop, workshopIndex: number) => (
            <WorkshopSelector
              key={workshopIndex}
              workshop={workshop}
              index={workshopIndex}
              selectWorkshop={selectWorkshop}
              student={props.student}
            />
          ))}
      </div>
      <SelectionModal
        show={showModal}
        handleCloseModal={() => setShowModal(false)}
        handleReservationConfirmation={handleReservationConfirmation}
        selectionForModal={selectionForModal}
      />
    </Container>
  );
};

type SelectionModalProps = {
  handleCloseModal: () => void;
  handleReservationConfirmation: (tutorial_reason?: string) => void;
  show: boolean;
  selectionForModal: SelectionForModal | undefined;
};
export const SelectionModal = (props: SelectionModalProps) => {
  return (
    <Modal show={props.show} onHide={props.handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Seleccionaste la opcion:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.selectionForModal ? (
          <>
            <p>
              <strong>Taller:</strong>{" "}
              <em>{props.selectionForModal.workshop_name}</em>
            </p>
            <p>
              <strong>Teacher:</strong>{" "}
              <em>{props.selectionForModal.teacher.nombre}</em>
            </p>
            <p>
              <strong>Horario:</strong> <em>{props.selectionForModal.time}</em>
            </p>
            <p>
              <strong>Dia:</strong> <em>{props.selectionForModal.day}</em>
            </p>
          </>
        ) : (
          "No has seleccionado una opcion"
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleCloseModal}>
          Cancelar
        </Button>
        <Button
          data-testid="modal-reservar-button"
          variant="primary"
          onClick={() => props.handleReservationConfirmation()}
        >
          Reservar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Selection;
