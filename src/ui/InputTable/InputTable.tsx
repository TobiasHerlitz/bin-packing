import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  InitialTableState,
  useReactTable,
} from '@tanstack/react-table';

import styles from './InputTable.module.css';

interface InputTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  initialState?: InitialTableState;
  className?: string;
}

export const InputTable = <TData extends object>({
  columns,
  data,
  initialState,
  className,
}: InputTableProps<TData>) => {
  const table = useReactTable({
    columns,
    data,
    initialState,
    getCoreRowModel: getCoreRowModel(),
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
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className={styles.cell}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
