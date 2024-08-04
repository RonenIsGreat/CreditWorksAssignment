import { Manufacturer } from "../../../models/manufacturer";
import SmartTable, { TableColumnProps } from "../../smartTable/smartTable";

export interface ManufacturersTableProps {
  manufacturers: Manufacturer[];
}

function ManufacturersTable({ manufacturers }: ManufacturersTableProps) {
  const tableColumns: TableColumnProps<Manufacturer>[] = [
    {
      header: "Name",
      renderItem: (category: Manufacturer) => category.name,
      sortBy: (a, b) => a.name.localeCompare(b.name),
    },
  ];

  return <SmartTable items={manufacturers} tableColumns={tableColumns} />;
}

export default ManufacturersTable;
