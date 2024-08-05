import { Manufacturer } from "../../../models/manufacturer";
import SmartTable, { TableColumnProps } from "../../smartTable/smartTable";

export interface ManufacturersTableProps {
  manufacturers: Manufacturer[];
  onRowPress: (item: Manufacturer) => void;
}

function ManufacturersTable({ manufacturers, onRowPress }: ManufacturersTableProps) {
  const tableColumns: TableColumnProps<Manufacturer>[] = [
    {
      header: "Name",
      renderItem: (category: Manufacturer) => category.name,
      sortBy: (a, b) => a.name.localeCompare(b.name),
    },
  ];

  return <SmartTable items={manufacturers} tableColumns={tableColumns} onRowPress={onRowPress} />;
}

export default ManufacturersTable;
