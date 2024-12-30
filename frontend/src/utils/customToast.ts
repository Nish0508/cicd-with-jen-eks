import { toast, ToastPromiseParams, ToastContent, ToastOptions, Slide } from "react-toastify";

export const successToast = (message: ToastContent, dict: ToastOptions = {}) => {
  toast.success(message, {
    position: "bottom-left",
    hideProgressBar: false,
    autoClose: 3000,
    draggable: false,
    pauseOnHover: true,
    closeOnClick: true,
    ...dict
  });
};

export const toastAlert = (message: ToastContent, dict: ToastOptions = {}) => {
  const screenWidth = window.innerWidth;
  const toastPosition = screenWidth < 640 ? "top-right" : "bottom-left";

  toast(message, {
    position: toastPosition,
    className:
      "tw-relative sm:tw-h-[6.5rem] tw-h-[5.5rem] sm:tw-w-[27rem] tw-w-[19rem] !tw-text-white ",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    ...dict
  });
};

export const errorToast = (message: ToastContent, dict: ToastOptions = {}) => {
  toast.error(message, {
    position: "bottom-left",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    autoClose: 5000,
    ...dict
  });
};

export const infoToast = (message: ToastContent, dict: ToastOptions = {}) => {
  toast.info(message, {
    position: "bottom-left",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    autoClose: 4000,
    ...dict
  });
};

export const warningToast = (message: ToastContent, dict: ToastOptions = {}) => {
  toast.warn(message, {
    position: "bottom-left",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    autoClose: 4000,
    ...dict
  });
};

export const promiseToast = (
  promise: Promise<any>,
  promiseParams: ToastPromiseParams,
  opts: ToastOptions = {}
) => {
  toast.promise(promise, promiseParams, {
    position: "bottom-left",
    transition: Slide,
    autoClose: 4000,
    ...opts
  });
};
