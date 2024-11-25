import { Bin } from '@entities';
import { ColumnDef } from '@tanstack/react-table';
import { Button, ButtonColor, ButtonSize, InputTable } from '@ui';
import { useMemo } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';

import { FormInputs } from '../../PackingControls';
import styles from './BinInputs.module.css';

// Casting to unknown and later to Bin is needed since useFieldArray does not allow empty appends/inserts
const emptyBinRow: unknown = {
  size: {
    width: '' as const,
    height: '' as const,
    depth: '' as const,
  },
  name: '',
};

interface BinsProps {
  form: UseFormReturn<FormInputs>;
}

export const BinInputs = ({ form }: BinsProps) => {
  const { control, register } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'bins',
  });

  const columns: ColumnDef<Bin>[] = useMemo(
    () => [
      {
        header: 'NAME',
        size: 260,
        cell: ({ row }) => (
          <input
            key={`${row.original.id}-name`}
            type="text"
            {...register(`bins.${row.index}.name`)}
          />
        ),
      },
      {
        header: 'WIDTH',
        size: 80,
        cell: ({ row }) => (
          <input
            key={`${row.original.id}-width`}
            min="0"
            step="1"
            type="number"
            {...register(`bins.${row.index}.size.width`, {
              valueAsNumber: true,
            })}
          />
        ),
      },
      {
        header: 'HEIGHT',
        size: 80,
        cell: ({ row }) => (
          <input
            key={`${row.original.id}-height`}
            min="0"
            step="1"
            type="number"
            {...register(`bins.${row.index}.size.height`, {
              valueAsNumber: true,
            })}
          />
        ),
      },
      {
        header: 'DEPTH',
        size: 80,
        cell: ({ row }) => (
          <input
            key={`${row.original.id}-depth`}
            min="0"
            step="1"
            type="number"
            {...register(`bins.${row.index}.size.depth`, {
              valueAsNumber: true,
            })}
          />
        ),
      },
      {
        id: 'removeRow',
        size: 40,
        header: '',
        cell: ({ row }) => (
          <Button
            className={styles.removeRowButton}
            colorScheme={ButtonColor.BGColor}
            icon="delete"
            onClick={(e) => {
              e.preventDefault();
              remove(row.index);
            }}
          />
        ),
      },
    ],
    [register, remove]
  );

  return (
    <div className={styles.binInputs}>
      <h3>Bins</h3>
      <InputTable className={styles.table} columns={columns} data={fields} />
      <Button
        className={styles.addRowButton}
        colorScheme={ButtonColor.Secondary}
        size={ButtonSize.Small}
        text="Add parcel"
        icon="add"
        onClick={(e) => {
          e.preventDefault();
          append(emptyBinRow as Bin);
        }}
      />
    </div>
  );
};
