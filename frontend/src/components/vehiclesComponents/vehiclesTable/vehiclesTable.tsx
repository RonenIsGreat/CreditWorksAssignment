import { Vehicle } from "../../../models/vehicle";
import SmartTable, { TableColumnProps } from "../../smartTable/smartTable";

export interface VehiclesTableProps {
    vehicles: Vehicle[],
}

function VehiclesTable({vehicles}: VehiclesTableProps) {

  const tableColumns: TableColumnProps<Vehicle>[] = [
    {
      header: "Owner name",
      renderItem: (vehicle: Vehicle) => vehicle.ownerName,
      sortBy: (a, b) => a.ownerName.localeCompare(b.ownerName)
    },
    {
      header: "ManufacturerId",
      renderItem: (vehicle: Vehicle) => vehicle.manufacturerId,
    },
    {
      header: "Year",
      renderItem: (vehicle: Vehicle) => vehicle.year,
      sortBy: (a, b) => a.year - b.year,
    },
    {
      header: "Weight",
      renderItem: (vehicle: Vehicle) => {
        return `${vehicle.weightInGrams / 1000} Kg`
      },
      sortBy: (a, b) => a.weightInGrams - b.weightInGrams,
    },
    {
      header: "Category",
      renderItem: (vehicle: Vehicle) => vehicle.vehicleId,
    },
  ];

  return (
      <SmartTable items={vehicles} tableColumns={tableColumns} />
  );
}

export default VehiclesTable;
