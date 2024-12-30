import * as Sentry from "@sentry/react";

const isProd = import.meta.env.MODE === "production";

export const sentryError = (error, errorMessage = "", contextObject = {}) => {
  if (isProd) {
    if (error) {
      if (Object.keys(contextObject).length > 0) {
        Sentry.withScope(function (scope) {
          scope.setContext("errorInfo", contextObject);
          Sentry.captureException(error);
        });
      } else {
        Sentry.captureException(error);
      }
    } else {
      if (Object.keys(contextObject).length > 0) {
        Sentry.withScope(function (scope) {
          scope.setContext("errorInfo", contextObject);
          Sentry.captureMessage(errorMessage);
        });
      } else {
        Sentry.captureMessage(errorMessage);
      }
    }
  } else {
    let message = `${errorMessage}`;
    if (error) {
      message = `${message} : ${error.message}`;
    }
    if (Object.keys(contextObject).length > 0) {
      message = `${message} : ${JSON.stringify(contextObject)}`;
    }
    console.error(message);
  }
};
