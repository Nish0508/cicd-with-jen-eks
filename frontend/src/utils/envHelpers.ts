export const isDev = () => import.meta.env.DEV;

export const isProd = () => import.meta.env.PROD;

export const isAppProd = () => import.meta.env.VITE_APP_ENV === "production";
