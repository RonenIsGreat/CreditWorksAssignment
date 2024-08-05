import { Category } from "../../../models/category";
import SmartTable, { TableColumnProps } from "../../smartTable/smartTable";
import CategoryIcon from "../categoryIcon/categoryIcon";

export interface CategoriesTableProps {
  categories: Category[];
  onRowPress: (item: Category) => void;
}

function CategoriesTable({ categories, onRowPress }: CategoriesTableProps) {
  const tableColumns: TableColumnProps<Category>[] = [
    {
      header: "Name",
      renderItem: (category: Category) => category.name,
    },
    {
      header: "Min Category Weight",
      renderItem: (category: Category) => {
        return `${category.minCategoryWeightGrams / 1000} Kg`;
      },
    },
    {
      header: "Icon",
      renderItem: (category: Category) => {
        return <CategoryIcon name={category.icon} />;
      },
    },
  ];

  return <SmartTable items={categories} tableColumns={tableColumns} onRowPress={onRowPress} />;
}

export default CategoriesTable;
