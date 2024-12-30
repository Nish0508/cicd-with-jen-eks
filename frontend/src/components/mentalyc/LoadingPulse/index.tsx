import styles from "./LoadingPulse.module.scss";
import cx from "clsx";

type LoadingPulseProps = {

  size?: "small" | "medium" | "large" | number;
  align?: "center" | "left" | "right";
  color?: "black" | "white";
};
export const LoadingPulse = ({
  size = "medium",
  align = "center",
  color = "black"
}: LoadingPulseProps) => {
  return (
    <div
      className={cx(
        styles.LoadingPulse,
        styles[`align-${align}`],
        size && styles[`size-${size}`],
        color && styles[`color-${color}`],
        "sk-spinner-pulse"
      )} ></div>
  );
};
