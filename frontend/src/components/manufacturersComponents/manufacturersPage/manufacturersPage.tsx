import { Button, Spinner } from "react-bootstrap";
import useAsyncMemo from "../../../hooks/useAsyncMemo";
import ManufacturerService from "../../../services/manufacturerService";
import ManufacturerModal from "../manufacturerModal/manufacturerModal";
import ManufacturersTable from "../manufacturersTable/manufacturersTable";
import { useState } from "react";
import { Manufacturer } from "../../../models/manufacturer";
import "./manufacturersPage.css";

function ManufacturersPage() {
  const [refreshCount, setRefreshCount] = useState(0);
  const [items, isLoading] = useAsyncMemo(
    () => ManufacturerService.get(),
    [refreshCount],
    null
  );
  const [selectedManufacturer, setSelectedManufacturer] = useState<
    Manufacturer | undefined
  >();

  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    refreshData();
  };

  function refreshData() {
    setRefreshCount(refreshCount + 1);
    setSelectedManufacturer(undefined);
  }

  function renderTable() {
    if (items === null || isLoading) {
      return (
        <div>
          <Spinner animation="border" />
        </div>
      );
    }

    return (
      <ManufacturersTable
        manufacturers={items}
        onRowPress={(manufacturer) => {
          setSelectedManufacturer(manufacturer);
          handleShow();
        }}
      />
    );
  }

  return (
    <div className="manufacturers-page">
      {renderTable()}

      <Button className="add-button" variant="primary" onClick={handleShow}>
        {"Add Manufacturer"}
      </Button>

      {showModal && (
        <ManufacturerModal
          show={showModal}
          handleClose={handleClose}
          manufacturer={selectedManufacturer}
        />
      )}
    </div>
  );
}

export default ManufacturersPage;
