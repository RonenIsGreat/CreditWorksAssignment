import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { useState } from "react";
import { Manufacturer } from "../../../models/manufacturer";
import ManufacturerService from "../../../services/manufacturerService";

interface ManufacturerModalProps {
  show: boolean;
  handleClose: () => void;
  manufacturer?: Manufacturer;
}

function ManufacturerModal({ show, handleClose, manufacturer }: ManufacturerModalProps) {
  const [id, _] = useState(manufacturer?.manufacturerId ?? 0);
  const [name, setName] = useState(manufacturer?.name ?? "");

  const isExisting = !!manufacturer;

  async function finishPressed() {
    const category: Manufacturer = {
      manufacturerId: id,
      name: name,
    };
    if (isExisting) {
      await ManufacturerService.put(category);
    } else {
      await ManufacturerService.post(category);
    }
    handleClose();
  }

  async function handleDelete(){
    await ManufacturerService.delete(id);
    handleClose();
  }

  const title = isExisting ? "Edit Manufacturer" : "Add Manufacturer";
  const finishButtonText = isExisting ? "Update" : "Add";

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Label>Manufacturer Name:</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer className="justify-content-between">
        {isExisting && (
          <Button variant="danger" onClick={() => handleDelete()}>
            Delete
          </Button>
        )}
        <Button variant="secondary" onClick={handleClose}>
        Close
        </Button>
        <Button variant="primary" onClick={() => finishPressed()}>
        {finishButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ManufacturerModal;
