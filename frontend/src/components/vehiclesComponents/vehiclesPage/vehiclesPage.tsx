import { Button, Spinner } from "react-bootstrap";
import useAsyncMemo from "../../../hooks/useAsyncMemo";
import { Category } from "../../../models/category";
import { Manufacturer } from "../../../models/manufacturer";
import { Vehicle } from "../../../models/vehicle";
import CategoryService from "../../../services/categotyService";
import ManufacturerService from "../../../services/manufacturerService";
import VehicleService from "../../../services/vehicleService";
import VehiclesTable from "../vehiclesTable/vehiclesTable";
import { useState } from "react";
import "./vehiclesPage.css";
import VehicleModal from "../vehicleModal/vehicleModal";

function VehiclesPage() {
  const [refreshCount, setRefreshCount] = useState(0);
  const [vehicles, loadingV] = useAsyncMemo<Vehicle[]>(
    () => VehicleService.get(),
    [refreshCount],
    null
  );
  const [categories, loadingC] = useAsyncMemo<Category[]>(
    () => CategoryService.get(),
    [refreshCount],
    null
  );
  const [manufacturers, loadingM] = useAsyncMemo<Manufacturer[]>(
    () => ManufacturerService.get(),
    [refreshCount],
    null
  );

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | undefined>();

  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    refreshData();
  };

  function refreshData() {
    setRefreshCount(refreshCount + 1);
    setSelectedVehicle(undefined);
  }

  function renderVehiclesTable() {
    if (
      vehicles === null ||
      categories === null ||
      manufacturers === null ||
      loadingV ||
      loadingC ||
      loadingM
    ) {
      return (
        <div>
          <Spinner animation="border" />
        </div>
      );
    }

    return (
      <VehiclesTable
        vehicles={vehicles}
        categories={categories}
        manufacturers={manufacturers}
        onRowPress={(vehicle) => {
          setSelectedVehicle(vehicle);
          handleShow();
        }}
      />
    );
  }

  const hasNoManufacturers = (manufacturers?.length === 0)

  return (
    <div className="vehicles-page">
      {renderVehiclesTable()}

      <Button
        className="add-button"
        variant="primary"
        onClick={handleShow}
        disabled={hasNoManufacturers}
      >
        {"Add Vehicle"}
      </Button>
      {hasNoManufacturers && <div>{"Can't add vehicle without having manufacturers"}</div>}

      {showModal && (
        <VehicleModal
          show={showModal}
          handleClose={handleClose}
          vehicle={selectedVehicle}
          manufacturers={manufacturers!}
        />
      )}
    </div>
  );
}

export default VehiclesPage;
