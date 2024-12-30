import React, { ReactElement } from "react";
import styles from "./Button.module.scss";
import cx from "clsx";

const ButtonSpinner = () => {
  return (
    <div className={styles.btnSpinnerContainer}>
      <div className={styles.btnSpinnerRing}></div>
      <div className={styles.btnSpinner}></div>
    </div>
  );
};

type SUPPORTED_VARIANTS = "filled" | "outlined" | "light" | "ghost" | "dashed";

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: SUPPORTED_VARIANTS;
  color?: string;
  loadingText?: string;
  isLoading?: boolean;
  fullWidth?: boolean;
  className?: string;
  id?: string;
  leftIcon?: ReactElement | null;
  rightIcon?: ReactElement | null;
  style?: React.CSSProperties;
}

export const Button = ({
  children,
  disabled,
  isLoading,
  color = "gradient",
  variant = "filled",
  loadingText,
  fullWidth = false,
  className,
  id = "",
  style,
  rightIcon,
  leftIcon,
  ...btnProps
}: ButtonProps) => {
  const isDisabled = isLoading === true || disabled === true;
  return (
    <button
      {...btnProps}
      disabled={isDisabled}
      style={style}
      id={id}
      className={cx(
        styles.button,
        styles[color],
        styles[variant],
        fullWidth && styles.block,
        className
      )}>
      <div className={styles.btnFlex}>
        {isLoading || leftIcon ? (
          <div className={cx(styles.btnAddon, styles.btnLeftAddon)}>
            {isLoading ? <ButtonSpinner /> : leftIcon ? leftIcon : null}
          </div>
        ) : null}

        {isLoading && loadingText ? loadingText : children}
        {rightIcon && <div className={cx(styles.btnAddon, styles.btnRightAddon)}>{rightIcon}</div>}
      </div>
    </button>
  );
};
