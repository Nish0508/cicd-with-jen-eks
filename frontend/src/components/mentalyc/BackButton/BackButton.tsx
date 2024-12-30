import { ReactComponent as ChevronLeftIcon } from "@/assets/icons/ChevronLeftGradient.svg";
import { useHistory } from "react-router-dom";

export const BackButton = ({
  href,
  onClick,
  className
}: {
  href?: string;
  onClick?: () => void;
  className?: string;
}) => {
  const history = useHistory();

  const defaultBackAction = () => {
    if (href) {
      history.push(href);
    } else {
      history.goBack();
    }
  };

  const handleClick = () => {
    if (onClick) {
      return onClick?.();
    }
    let preventDefaultAction = false;

    if (!preventDefaultAction) {
      defaultBackAction();
    }
  };

  return (
    <div className={className}>
      <button className="btn-reset tw-flex tw-items-center tw-px-0 tw-gap-1" onClick={handleClick}>
        <ChevronLeftIcon />
        <span className="tw-font-medium !tw-text-xs !tw-text-primary-500">Back</span>
      </button>
    </div>
  );
};
