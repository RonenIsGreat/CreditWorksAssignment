import useAsyncMemo from "../../../hooks/useAsyncMemo";
import { Vehicle } from "../../../models/vehicle";
import VehicleService from "../../../services/vehicleService";
import VehiclesTable from "../vehiclesTable/vehiclesTable";

function VehiclesPage() {
  const vehicles = useAsyncMemo<Vehicle[]>(()=>VehicleService.get(), [], null);

  function renderVehiclesTable(){
    if (vehicles === null){
      return "Loading..."
    }

    return <VehiclesTable vehicles={vehicles} />
  }

  return (
    <div className="vehicles-page">
      {"Vehicles Page"}
      {renderVehiclesTable()}
    </div>
  );
}

export default VehiclesPage;
