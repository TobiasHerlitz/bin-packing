import { Parcel } from '@entities';
import { ColumnDef } from '@tanstack/react-table';
import { Button, ButtonColor, ButtonSize, Table } from '@ui';
import { useMemo } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';

import { FormInputs } from '../../PackingControls';
import styles from './ParcelInputs.module.css';

// Casting to unknown and later to Parcel is needed since useFieldArray does not allow empty appends/inserts
const emptyParcelRow: unknown = {
  quantity: 1,
  size: {
    width: '' as const,
    height: '' as const,
    depth: '' as const,
  },
  name: '',
};

interface ParcelsProps {
  form: UseFormReturn<FormInputs>;
}

export const ParcelInputs = ({ form }: ParcelsProps) => {
  const { control, register } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'parcels',
  });

  const columns: ColumnDef<Parcel>[] = useMemo(
    () => [
      {
        header: 'NAME',
        size: 200,
        cell: ({ row }) => (
          <input
            key={`${row.original.id}-name`}
            type="text"
            {...register(`parcels.${row.index}.name`, { required: true })}
          />
        ),
      },
      {
        header: 'QTY',
        size: 60,
        cell: ({ row }) => (
          <input
            key={`${row.original.id}-quantity`}
            type="number"
            {...register(`parcels.${row.index}.quantity`, { required: true })}
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
            {...register(`parcels.${row.index}.originalSize.width`, {
              required: true,
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
            {...register(`parcels.${row.index}.originalSize.height`, {
              required: true,
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
            {...register(`parcels.${row.index}.originalSize.depth`, {
              required: true,
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
    <div className={styles.parcelInputs}>
      <h3>Parcels</h3>
      <Table className={styles.table} columns={columns} data={fields} />
      <Button
        className={styles.addRowButton}
        colorScheme={ButtonColor.Secondary}
        size={ButtonSize.Small}
        text="Add parcel"
        icon="add"
        onClick={(e) => {
          e.preventDefault();
          append(emptyParcelRow as Parcel);
        }}
      />
    </div>
  );
};
