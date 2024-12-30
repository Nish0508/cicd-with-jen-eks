import * as Sentry from "@sentry/node";
import dotenv from "dotenv";

dotenv.config();

const isProd = process.env.NODE_ENV === "production";

export class DuplicateEntryError extends Error {
  constructor(message) {
    super(message);
    this.name = "DuplicateEntryError";
  }
}

export const reportError = (err, errorMessage, errorLevel = "debug") => {
  // Available levels are "fatal", "critical", "error", "warning", "log", "info", and "debug".

  if (isProd && err) {
    Sentry.captureException(err);
    console.error(`${Date.now()} ${new Date()} : ${JSON.stringify(err)}`);
  } else {
    console.error(err);
  }

  logMessage(errorMessage, errorLevel);
};

export const logMessage = (message, messageLevel) => {
  if (isProd) {
    Sentry.captureMessage(message, messageLevel);
    console.error(`${Date.now()} ${new Date()} : ${message}`);
  } else {
    console.error(message);
  }
};

export class SentryErrorClass extends Error {
  
   constructor(error, message = "") {
    // Call the parent class's constructor with the error message
    super(error.message);

    // Set the name property to match the class name
    this.name = "SentryErrorClass";

    // Assign additional properties
    this.error = error;
    this.customMessage = message;
    this.reported = false;

    if (!(error instanceof SentryErrorClass && error.reported)) {
      // If the passed error was not a Sentry error or has not been reported, report it 
      reportError(error, message);
      this.reported = true;
    }
  }
}
