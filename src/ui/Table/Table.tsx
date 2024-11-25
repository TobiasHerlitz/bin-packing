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
  className?: string;
}

export const Table = <TData extends object>({
  columns,
  data,
  initialState,
  renderExpandedRow,
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
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <>
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={styles.cell}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
            {row.getIsExpanded() && renderExpandedRow && (
              <tr>
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
