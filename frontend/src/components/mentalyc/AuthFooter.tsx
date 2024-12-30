import { ReactComponent as HippaIcon } from "@/assets/icons/v2/hipaa.svg";
import { ReactComponent as StarIcon } from "@/assets/icons/star.svg";

export default function AuthFooter() {
  return (
    <div className="tw-mt-4">
      <Reviews />
      <div className="tw-text-center tw-mt-6 tw-mb-4 tw-space-x-2">
        <HippaIcon className="tw-item-center tw-w-24" />

      </div>
    </div>
  );
}

const Reviews = () => (
  <div className="tw-text-center tw-justify-center  tw-flex tw-flex-wrap tw-gap-2 tw-items-center">
    <div className="tw-flex  tw-flex-nowrap tw-gap-1">
      <StarIcon />
      <StarIcon />
      <StarIcon />
      <StarIcon />
      <StarIcon />
    </div>
    <div> 4.8/5 based on 11k+ reviews</div>
  </div>
);
