import styles from './Button.module.css';

/**
 * Small: Only an icon<br>
 * Medium: Text and icon<br>
 * Large: Centered text and full width<br>
 */
export enum ButtonSize {
  Small,
  Medium,
  Large
}

export enum ButtonColor {
  Primary,
  Secondary
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled: boolean;
  text?: string;
  size: ButtonSize;
  colorScheme: ButtonColor;
}

const buttonSizeToClass: Record<ButtonSize, string> = {
  [ButtonSize.Small]: styles.small,
  [ButtonSize.Medium]: styles.medium,
  [ButtonSize.Large]: styles.large,
}

export const Button = ({
  disabled = false,
  text,
  size = ButtonSize.Medium,
  colorScheme = ButtonColor.Primary,
  ...props
}: ButtonProps) => {
  return (
    <button className={`${styles.button} ${buttonSizeToClass[size]}`} {...props}>
      {text}
    </button>
  );
};
