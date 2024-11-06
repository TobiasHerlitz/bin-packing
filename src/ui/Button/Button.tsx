import { ButtonHTMLAttributes } from 'react';

import styles from './Button.module.css';
import { ButtonColor, ButtonSize } from './Button.types';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  text?: string;
  size?: ButtonSize;
  colorScheme?: ButtonColor;
  icon?: string;
}

const buttonSizeToClass: Record<ButtonSize, string> = {
  [ButtonSize.Small]: styles.small,
  [ButtonSize.Medium]: styles.medium,
  [ButtonSize.Large]: styles.large,
};

const buttonColorToClass: Record<ButtonColor, string> = {
  [ButtonColor.Primary]: styles.primaryColor,
  [ButtonColor.Secondary]: styles.secondaryColor,
  [ButtonColor.BGColor]: styles.bgcolor,
};

export const Button = ({
  disabled = false,
  text,
  size = ButtonSize.Small,
  colorScheme = ButtonColor.Primary,
  className,
  icon = 'add',
  ...props
}: ButtonProps) => {
  const colorClass = disabled
    ? styles.disabled
    : buttonColorToClass[colorScheme];
  const sizeClass = buttonSizeToClass[size];
  return (
    <button
      className={`${styles.button} ${colorClass} ${sizeClass} ${className}`}
      {...props}
    >
      {size !== ButtonSize.Small && <span>{text}</span>}
      {size !== ButtonSize.Large && (
        <span
          className={`${size === ButtonSize.Small ? styles.iconSmall : styles.icon} material-symbols-outlined`}
        >
          {icon}
        </span>
      )}
    </button>
  );
};
