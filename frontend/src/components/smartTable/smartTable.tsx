import { useState } from "react";
import "./smartTable.css";

export interface TableColumnProps<T> {
  header: string;
  renderItem: (item: T) => any;
  sortBy?: (item: T, other: T) => number;
}

export interface smartTableProps<T> {
  tableColumns: TableColumnProps<T>[];
  items: T[];
  onRowPress?: (item: T) => void;
}

function SmartTable<T>({
  tableColumns,
  items,
  onRowPress,
}: smartTableProps<T>) {
  const [sortedItems, setSortedItems] = useState<T[]>(items);
  const [sortedByColIndex, setSortedByColIndex] = useState<number>();

  // nothing to display in a table
  if (items.length === 0 || tableColumns.length === 0) {
    return <div>{"Nothing to display"}</div>;
  }

  function headerSortPressed(
    tableColumn: TableColumnProps<T>,
    colIndex: number
  ) {
    if (!tableColumn.sortBy) {
      return;
    }

    if (sortedByColIndex !== colIndex) {
      let newOrder = sortedItems.slice().sort(tableColumn.sortBy);
      setSortedItems(newOrder);
    } else {
      let newOrder = sortedItems.slice().reverse();
      setSortedItems(newOrder);
    }
    setSortedByColIndex(colIndex);
  }

  function renderHeader(tableColumn: TableColumnProps<T>, colIndex: number) {
    const isSortable = tableColumn.sortBy !== undefined;
    const className = `smart-table-header smart-table-cell ${
      isSortable && "sortable"
    }`;
    return (
      <div
        key={`header-${colIndex}`}
        className={className}
        onClick={() => headerSortPressed(tableColumn, colIndex)}
      >
        {tableColumn.header}
      </div>
    );
  }

  function renderItemRow(item: T, rowIndex: number) {
    return tableColumns.map((c, i) => (
      <div
        key={`row-${rowIndex}-${i}`}
        className="smart-table-item smart-table-cell"
        onClick={() => {
          if (onRowPress) {
            onRowPress(item);
          }
        }}
      >
        {c.renderItem(item)}
      </div>
    ));
  }

  return (
    <div className="smart-table">
      <div
        className="smart-table-grid"
        style={{ gridTemplateColumns: `repeat(${tableColumns.length}, 1fr)` }}
      >
        {tableColumns.map(renderHeader)}
        {sortedItems.map(renderItemRow)}
      </div>
    </div>
  );
}

export default SmartTable;
