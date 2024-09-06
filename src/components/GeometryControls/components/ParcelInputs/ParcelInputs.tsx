import { Parcel } from '@types';
import { Fragment } from 'react/jsx-runtime';
import { useFieldArray, UseFormReturn } from 'react-hook-form';

import { FormInputs } from '../../GeometryControls';
import styles from './ParcelInputs.module.css';

// Casting to unknown and later to Parcel is needed since useFieldArray does not allow empty appends/inserts
const emptyParcelRow: unknown = {
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

  return (
    <>
      <h3>Parcels</h3>
      <div className={styles.parcelsGrid}>
        {fields.map(({ id }, index) => (
          <Fragment key={id}>
            <input
              key={`${id}-width`}
              placeholder="Width"
              min="0"
              step="1"
              type="number"
              {...register(`parcels.${index}.size.width`, {
                required: true,
                valueAsNumber: true,
              })}
            />
            <input
              key={`${id}-height`}
              placeholder="Height"
              min="0"
              step="1"
              type="number"
              {...register(`parcels.${index}.size.height`, {
                required: true,
                valueAsNumber: true,
              })}
            />
            <input
              key={`${id}-depth`}
              placeholder="Depth"
              min="0"
              step="1"
              type="number"
              {...register(`parcels.${index}.size.depth`, {
                required: true,
                valueAsNumber: true,
              })}
            />
            <input
              key={`${id}-name`}
              placeholder="Name"
              type="text"
              {...register(`parcels.${index}.name`, { required: true })}
            />
            <button
              type="button"
              className="material-symbols-outlined"
              onClick={(e) => {
                e.stopPropagation();
                remove(index);
              }}
            >
              delete
            </button>
          </Fragment>
        ))}
        <button
          className={`${styles.fullWidth} material-symbols-outlined`}
          onClick={(e) => {
            e.preventDefault();
            append(emptyParcelRow as Parcel);
          }}
        >
          add
        </button>
      </div>
    </>
  );
};
