import axios from "axios";
import { hostRoute } from "./routesHelper";

const sessionExpiredEvent = new Event('sessionExpired');

const authAxios = axios.create({
  // headers: {'X-Requested-With': 'XMLHttpRequest'},
  withCredentials: true,
  baseURL: hostRoute
});

// intercepts http response and redirect to the login page
// if user session has expired
authAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.dispatchEvent(sessionExpiredEvent);
        return new Promise(() => {});
      }
    }
    throw error;
  }
);

// Setting up an Axios interceptor on the response path to handle and transform responses and errors globally.
/*
authAxios.interceptors.response.use(
  response => {
    // Check if the HTTP status code is within the 200-299 range, which indicates a successful response.
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    
    const errorMessage = `
      Received Unexpected status code: ${response.status}
      Status text: ${response.statusText}
      Response data: ${JSON.stringify(response.data)}
      Request URL: ${response.config.url}
      Request method: ${response.config.method}
    `;

    throw new Error(errorMessage);
  },
  error => {
    if (error.response) {
      // Handling error for unauthorized access
      if (error.response.status === 401) {
        window.location = `${clientRoute}/login`;
      }

      throw error
      
      // Rethrow the error for further specific handling
      const errorMessage = `
        Message: ${error.response.data.message || error.message}
        Status code: ${error.response.status}
        Status text: ${error.response.statusText}
        ${error.code ? `Code: ${error.code}` : ''}
        ${error.request ? `Request: ${JSON.stringify(error.request)}` : ''}
        ${error.config ? `Config: ${JSON.stringify(error.config)}` : ''}
      `;

      error.message = errorMessage;

      throw new Error(error);
    } else {
      // If no response was received (e.g., network error, server downtime, etc.)
      const errorMessage = `
        Message: ${error.message}
        ${error.code ? `Code: ${error.code}` : ''}
        ${error.request ? `Request: ${JSON.stringify(error.request)}` : ''}
        ${error.config ? `Config: ${JSON.stringify(error.config)}` : ''}
      `;

      error.message = errorMessage 
      // Throw the constructed error message
      throw new Error(error);
    }


  }
);

*/

export { authAxios };
