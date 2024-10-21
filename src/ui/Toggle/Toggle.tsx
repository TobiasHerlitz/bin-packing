import { ReactNode } from 'react';

import styles from './Toggle.module.css';

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  id: string;
  children: ReactNode;
  className?: string;
}

export const Toggle = ({
  checked,
  onChange,
  id,
  children,
  className,
}: ToggleProps) => {
  return (
    <label className={`${className} ${styles.root}`}>
      {children}
      <input
        className={styles.toggle}
        type="checkbox"
        id={id}
        name={id}
        checked={checked}
        onChange={onChange}
      />
    </label>
  );
};
