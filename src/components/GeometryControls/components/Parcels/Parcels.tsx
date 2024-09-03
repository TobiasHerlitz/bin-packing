import { Parcel } from '@types';
import { useFieldArray, UseFormReturn } from 'react-hook-form';

import { FormInputs } from '../../GeometryControls';
import styles from './Parcels.module.css';

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

export const Parcels = ({ form }: ParcelsProps) => {
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
          <>
            <input
              key={`${id}-width`}
              placeholder="Width"
              min="0"
              step="1"
              type="number"
              {...register(`parcels.${index}.size.width`, { required: true })}
            />
            <input
              key={`${id}-height`}
              placeholder="Height"
              min="0"
              step="1"
              type="number"
              {...register(`parcels.${index}.size.height`, { required: true })}
            />
            <input
              key={`${id}-depth`}
              placeholder="Depth"
              min="0"
              step="1"
              type="number"
              {...register(`parcels.${index}.size.depth`, { required: true })}
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
          </>
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
