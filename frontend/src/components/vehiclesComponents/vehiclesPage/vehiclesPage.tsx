import useAsyncMemo from "../../../hooks/useAsyncMemo";
import { Category } from "../../../models/category";
import { Manufacturer } from "../../../models/manufacturer";
import { Vehicle } from "../../../models/vehicle";
import CategoryService from "../../../services/categotyService";
import ManufacturerService from "../../../services/manufacturerService";
import VehicleService from "../../../services/vehicleService";
import VehiclesTable from "../vehiclesTable/vehiclesTable";

function VehiclesPage() {
  const vehicles = useAsyncMemo<Vehicle[]>(
    () => VehicleService.get(),
    [],
    null
  );
  const categories = useAsyncMemo<Category[]>(
    () => CategoryService.get(),
    [],
    null
  );
  const manufacturers = useAsyncMemo<Manufacturer[]>(
    () => ManufacturerService.get(),
    [],
    null
  );

  function renderVehiclesTable() {
    if (vehicles === null || categories === null || manufacturers === null) {
      return <div>{"Loading..."}</div>;
    }

    return (
      <VehiclesTable
        vehicles={vehicles}
        categories={categories}
        manufacturers={manufacturers}
      />
    );
  }

  return (
    <div className="vehicles-page">
      {"Vehicles Page"}
      {renderVehiclesTable()}
    </div>
  );
}

export default VehiclesPage;
