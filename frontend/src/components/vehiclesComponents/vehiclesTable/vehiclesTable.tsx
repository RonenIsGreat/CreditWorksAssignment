import { useMemo } from "react";
import { Category } from "../../../models/category";
import { Manufacturer } from "../../../models/manufacturer";
import { Vehicle } from "../../../models/vehicle";
import SmartTable, { TableColumnProps } from "../../smartTable/smartTable";
import CategoryIcon from "../../categoriesComponents/categoryIcon/categoryIcon";

export interface VehiclesTableProps {
  vehicles: Vehicle[];
  categories: Category[];
  manufacturers: Manufacturer[];
}

interface TableVehicle extends Vehicle {
  manufacturer?: Manufacturer;
  category?: Category;
}

function VehiclesTable({
  vehicles,
  categories,
  manufacturers,
}: VehiclesTableProps) {
  const tableVehicles = useMemo<TableVehicle[]>(() => {
    let tableVehicles: TableVehicle[] = [];
    const manufacturerById = Object.fromEntries(
      manufacturers.map((x) => [x.manufacturerId, x])
    );

    vehicles.forEach((v) => {
      const category = findCategoryForVehicle(v, categories);
      const manufacturer = manufacturerById[v.manufacturerId];
      const extra = { manufacturer: manufacturer, category: category };
      const tableVehicle = Object.assign({}, v, extra) as any as TableVehicle;
      tableVehicles.push(tableVehicle);
    });

    return tableVehicles;
  }, [vehicles, categories, manufacturers]);

  function findCategoryForVehicle(
    vehicle: Vehicle,
    categories: Category[]
  ): Category | undefined {
    // the categories are sorted from the server
    let category = undefined;
    categories.forEach((c) => {
      if (c.minCategoryWeightGrams <= vehicle.weightInGrams) {
        category = c;
      }
    });
    return category;
  }

  const tableColumns: TableColumnProps<TableVehicle>[] = [
    {
      header: "Owner name",
      renderItem: (vehicle: TableVehicle) => vehicle.ownerName,
      sortBy: (a, b) => a.ownerName.localeCompare(b.ownerName),
    },
    {
      header: "Manufacturer",
      renderItem: (vehicle: TableVehicle) => vehicle.manufacturer?.name ?? "--",
      sortBy: (a, b) => {
        const aa = a.manufacturer?.name ?? "--";
        const bb = b.manufacturer?.name ?? "--";
        return aa.localeCompare(bb);
      },
    },
    {
      header: "Year",
      renderItem: (vehicle: TableVehicle) => vehicle.year,
      sortBy: (a, b) => a.year - b.year,
    },
    {
      header: "Weight",
      renderItem: (vehicle: TableVehicle) => {
        return `${vehicle.weightInGrams / 1000} Kg`;
      },
      sortBy: (a, b) => a.weightInGrams - b.weightInGrams,
    },
    {
      header: "Category Name",
      renderItem: (vehicle: TableVehicle) => {
        return vehicle.category?.name ?? "--";
      },
    },
    {
      header: "Category Icon",
      renderItem: (vehicle: TableVehicle) => {
        const icon = vehicle.category?.icon;
        return <CategoryIcon name={icon ?? "--"} />;
      },
    },
  ];

  return <SmartTable items={tableVehicles} tableColumns={tableColumns} />;
}

export default VehiclesTable;
