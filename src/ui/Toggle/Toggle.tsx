import { InputHTMLAttributes, ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import styles from './Toggle.module.css';

interface SharedProps extends InputHTMLAttributes<HTMLInputElement> {
  children: ReactNode;
  className?: string;
  id: string;
}

type UncontrolledToggleProps = SharedProps & {
  checked: boolean;
  onChange: () => void;
  register?: undefined;
};

type FormToggleProps = SharedProps & {
  checked?: undefined;
  onChange?: undefined;
  register: UseFormRegisterReturn<string>;
};

export const Toggle = ({
  checked,
  onChange,
  id,
  children,
  className,
  register,
  ...props
}: UncontrolledToggleProps | FormToggleProps) => {
  return (
    <div className={`${styles.root} ${className}`}>
      <label htmlFor={id} onClick={(e) => e.preventDefault()}>
        {children}
      </label>
      <input
        {...register}
        {...props}
        className={`${styles.toggle}`}
        type="checkbox"
        id={id}
        name={id}
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
};
