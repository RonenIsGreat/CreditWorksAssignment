import { Category } from "../../../models/category";
import SmartTable, { TableColumnProps } from "../../smartTable/smartTable";

export interface CategoriesTableProps {
  categories: Category[];
}

function CategoriesTable({ categories }: CategoriesTableProps) {
  const tableColumns: TableColumnProps<Category>[] = [
    {
      header: "Name",
      renderItem: (category: Category) => category.name,
      sortBy: (a, b) => a.name.localeCompare(b.name),
    },
    {
      header: "Min Category Weight",
      renderItem: (category: Category) => {
        return `${category.minCategoryWeightGrams / 1000} Kg`;
      },
      sortBy: (a, b) => a.minCategoryWeightGrams - b.minCategoryWeightGrams,
    },
    {
      header: "Icon",
      renderItem: (category: Category) => category.icon,
      sortBy: (a, b) => a.icon.localeCompare(b.icon),
    },
  ];

  return <SmartTable items={categories} tableColumns={tableColumns} />;
}

export default CategoriesTable;
