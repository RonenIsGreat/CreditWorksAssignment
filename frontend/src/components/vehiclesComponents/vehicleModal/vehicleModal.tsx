import { Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { Vehicle } from "../../../models/vehicle";
import VehicleService from "../../../services/vehicleService";
import { Manufacturer } from "../../../models/manufacturer";

interface ManufacturerModalProps {
  show: boolean;
  handleClose: () => void;
  vehicle?: Vehicle;
  manufacturers: Manufacturer[];
}

function VehicleModal({
  show,
  handleClose,
  vehicle,
  manufacturers,
}: ManufacturerModalProps) {
  const [id, _] = useState(vehicle?.vehicleId ?? 0);
  const [ownerName, setOwnerName] = useState(vehicle?.ownerName ?? "");
  const [manufacturerId, setManufacturerId] = useState(
    vehicle?.manufacturerId ?? manufacturers[0].manufacturerId
  );
  const [year, setYear] = useState(() => vehicle?.year.toString() ?? "2024");
  const [weight, setWeight] = useState(() => {
    if (!vehicle) {
      return "0";
    }
    return (vehicle.weightInGrams / 1000).toString();
  });

  function roundAndSetYear(year: string) {
    let val = Number(year);
    val = Math.round(val);
    setYear(val.toString());
  }

  function roundAndSetWeight(weight: string) {
    let val = Number(weight);
    val = Math.floor(val * 100) / 100;
    setWeight(val.toString());
  }

  const isExisting = !!vehicle;

  async function finishPressed() {
    if (!manufacturerId) {
      return;
    }

    const weightInGrams = Number(weight) * 1000;
    const vehicle: Vehicle = {
      vehicleId: id,
      ownerName: ownerName,
      manufacturerId: manufacturerId,
      year: Number(year),
      weightInGrams: weightInGrams,
    };
    if (isExisting) {
      await VehicleService.put(vehicle);
    } else {
      await VehicleService.post(vehicle);
    }
    handleClose();
  }

  async function handleDelete() {
    await VehicleService.delete(id);
    handleClose();
  }

  const title = isExisting ? "Edit Vehicle" : "Add Vehicle";
  const finishButtonText = isExisting ? "Update" : "Add";

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Label>Owner Name:</Form.Label>
          <Form.Control
            type="text"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
          />

          <br />

          <Form.Label>Manufacturer:</Form.Label>
          <Form.Select
            onChange={(e) => {
              setManufacturerId(Number(e.target.value));
            }}
          >
            {manufacturers.map((m) => (
              <option value={m.manufacturerId}>{m.name}</option>
            ))}
          </Form.Select>

          <br />

          <Form.Label>Year:</Form.Label>
          <Form.Control
            type="number"
            min="0"
            value={year}
            onChange={(e) => roundAndSetYear(e.target.value)}
          />

          <br />

          <Form.Label>Weight:</Form.Label>
          <Form.Control
            type="number"
            min="0"
            value={weight}
            onChange={(e) => roundAndSetWeight(e.target.value)}
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

export default VehicleModal;
