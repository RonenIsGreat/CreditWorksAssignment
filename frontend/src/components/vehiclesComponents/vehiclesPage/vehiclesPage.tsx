import useAsyncMemo from "../../../hooks/useAsyncMemo";
import { Category } from "../../../models/category";
import { Manufacturer } from "../../../models/manufacturer";
import { Vehicle } from "../../../models/vehicle";
import CategoryService from "../../../services/categotyService";
import ManufacturerService from "../../../services/manufacturerService";
import VehicleService from "../../../services/vehicleService";
import VehiclesTable from "../vehiclesTable/vehiclesTable";

function VehiclesPage() {
  const [vehicles, a] = useAsyncMemo<Vehicle[]>(
    () => VehicleService.get(),
    [],
    null
  );
  const [categories,b] = useAsyncMemo<Category[]>(
    () => CategoryService.get(),
    [],
    null
  );
  const [manufacturers, c] = useAsyncMemo<Manufacturer[]>(
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
      {renderVehiclesTable()}

    </div>
  );
}

export default VehiclesPage;
