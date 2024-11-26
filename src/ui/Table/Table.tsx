import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  InitialTableState,
  Row,
  useReactTable,
} from '@tanstack/react-table';
import { ReactElement } from 'react';

import styles from './Table.module.css';

interface TableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  initialState?: InitialTableState;
  renderExpandedRow?: (row: Row<TData>) => ReactElement;
  noHeader?: boolean;
  className?: string;
}

export const Table = <TData extends object>({
  columns,
  data,
  initialState,
  renderExpandedRow,
  noHeader = false,
  className,
}: TableProps<TData>) => {
  const table = useReactTable({
    columns,
    data,
    initialState,
    getCoreRowModel: getCoreRowModel(),
    ...(renderExpandedRow && {
      getRowCanExpand: () => true,
      getExpandedRowModel: getExpandedRowModel(),
    }),
  });

  return (
    <table className={`${styles.table} ${className ?? ''}`}>
      {!noHeader && (
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    width: header.getSize(),
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
      )}
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <>
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  style={{ width: cell.column.getSize() }}
                  key={cell.id}
                  className={styles.cell}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
            {row.getIsExpanded() && renderExpandedRow && (
              <tr className={styles.expandedRow}>
                <td colSpan={row.getAllCells().length}>
                  {renderExpandedRow(row)}
                </td>
              </tr>
            )}
          </>
        ))}
      </tbody>
    </table>
  );
};
