import { Bin } from '@types';
import { Fragment } from 'react/jsx-runtime';
import { useFieldArray, UseFormReturn } from 'react-hook-form';

import { FormInputs } from '../../GeometryControls';
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

  return (
    <>
      <h3>Bins</h3>
      <div className={styles.binsGrid}>
        {fields.map(({ id }, index) => (
          <Fragment key={id}>
            <input
              key={`${id}-name`}
              placeholder="Name"
              type="text"
              {...register(`bins.${index}.name`)}
            />
            <input
              key={`${id}-width`}
              placeholder="Width"
              min="0"
              step="1"
              type="number"
              {...register(`bins.${index}.size.width`, { valueAsNumber: true })}
            />
            <input
              key={`${id}-height`}
              placeholder="Height"
              min="0"
              step="1"
              type="number"
              {...register(`bins.${index}.size.height`, {
                valueAsNumber: true,
              })}
            />
            <input
              key={`${id}-depth`}
              placeholder="Depth"
              min="0"
              step="1"
              type="number"
              {...register(`bins.${index}.size.depth`, { valueAsNumber: true })}
            />
            <button
              className="material-symbols-outlined"
              type="button"
              disabled
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
          disabled
          onClick={(e) => {
            e.preventDefault();
            append(emptyBinRow as Bin);
          }}
        >
          add
        </button>
      </div>
    </>
  );
};
