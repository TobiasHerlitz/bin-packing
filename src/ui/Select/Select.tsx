import { ButtonHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import styles from './Select.module.css';

interface SelectProps extends ButtonHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { label: string; value: string | number }[];
  register: UseFormRegisterReturn<string>;
}

export const Select = ({
  label,
  register,
  options = [],
  ...props
}: SelectProps) => {
  const select = (
    <select
      {...register}
      className={`${styles.select} ${styles.chevron}`}
      {...props}
    >
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );

  if (label) {
    return (
      <label className={styles.label}>
        <span>{label}</span>
        {select}
      </label>
    );
  }

  return select;
};
