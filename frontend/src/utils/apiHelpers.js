import axios from "axios";
import { authAxios } from "./authAxios";
import { clientRoute } from "./routesHelper";
import { sentryError } from "./sentryErrorHelper";

const retry = (cb) => {
  let MAX_RETRIES = 3;
  let RETRY_DELAY = 5000; // 5 SECONDS

  let totalRetries = 0;

  const inner = async (...args) => {
    try {
      let result = await Promise.resolve(cb(...args));
      return result;
    } catch (err) {
      if (totalRetries < MAX_RETRIES) {
        totalRetries += 1;
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        return inner(...args);
      } else {
        throw err;
      }
    }
  };

  return inner;
};

export const protectedPost = async (route, payload) => {
  return authAxios
    .post(route, payload)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const protectedPatch = async (route, payload) => {
  return authAxios
    .patch(route, payload)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

// const formDataToObject = (formData) => {
//   let object = {};
//   Array.from(formData.entries()).forEach(([key, value]) => {
//     object[key] = value;
//   });
//   return object;
// };

// OLD, USED FOR UPLOADING TO OUR SERVER
// export const protectedUploadPost = async (route, formData, progressCallback) => {
//   let payload = formDataToObject(formData);
//   return authAxios
//     .post(route, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data"
//       },
//       onUploadProgress: (progressEvent) => {
//         let downloadPercentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//         progressCallback(downloadPercentage);
//       }
//     })
//     .then((res) => {
//       if (res.data.status !== 200) {
//         sentryError(
//           null,
//           `Received error trying to upload ${JSON.stringify(payload)} ${payload.date} ${
//             payload.patientId
//           } ${payload.patientName} for therapist ${payload.therapistId}`,
//           { ...res }
//         );
//         const customError = new Error();
//         customError.name = "serverError";
//         customError.message = res.data.message || "The server responded with an error";
//         throw customError;
//       } else {
//         return res.data;
//       }
//     })
//     .catch((error) => {
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         let serverErrorMessage =
//           error.response.data.message ?? `The server responded with an error`;
//         sentryError(serverErrorMessage, `Error 2 processing server response on trying to upload`, {
//           data: JSON.stringify(error.response.data),
//           status: error.response.status,
//           headers: JSON.stringify(error.response.headers)
//         });
//         throw new Error(serverErrorMessage);
//       } else if (error.request) {
//         // The request was made but no response was received
//         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//         // http.ClientRequest in Node.js
//         sentryError(null, `Error reaching the server - response on trying to upload`, {
//           data: error.request,
//           payload: payload
//         });
//         throw new Error(error);
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         console.error(
//           `Error while uploading file with payload ${JSON.stringify(
//             payload
//           )} got error ${JSON.stringify(error)}`
//         );
//         sentryError(
//           null,
//           `Something happened with processing on trying to upload ${JSON.stringify(payload)} ${
//             payload.date
//           } ${payload.patientId} ${payload.patientName} for therapist ${payload.therapistId}`,
//           { z: "test", error }
//         );
//         // sentryError(error, `Something happened with processing upload `, payload)
//         throw new Error(error);
//       }
//     });
// };

// const axiosRetry = (url, retries, delay) => {
//   return axios.get(url).catch(function (error) {
//     if (retries > 0 && !error.response) {
//       // Wait for delay amount before retrying
//       setTimeout(() => {
//         return axiosRetry(url, retries - 1, delay * 2); // Double the delay for exponential backoff
//       }, delay);
//     } else {
//       return Promise.reject(error);
//     }
//   });
// };

export const protectedUploadS3PutAxios = retry(
  async (route, fileData, progressCallback, therapistId, sessionId, mimetype, fileSize) => {
    try {
      const response = await axios.put(route, fileData, {
        headers: {
          "Content-Length": fileSize,
          "Content-Type": mimetype
        },
        onUploadProgress: (progressEvent) => {
          let downloadPercentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          progressCallback(downloadPercentage);
        }
      });
      return response;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        let serverErrorMessage =
          error.response.data.message ??
          `The s3 server responded with an error while uploading session ${sessionId} for therapist ${therapistId}`;
        sentryError(error, `Error 2 processing server response on trying to upload`, {
          message: serverErrorMessage,
          data: JSON.stringify(error.response),
          status: error.response.status,
          headers: JSON.stringify(error.response.headers),
          therapistId: therapistId,
          sessionId: sessionId
        });
        throw new Error(serverErrorMessage);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in Node.js
        sentryError(
          error,
          `Error reaching the s3 server - response while uploading session ${sessionId} for therapist ${therapistId}`,
          {
            data: JSON.stringify(error.request),
            therapistId: therapistId,
            sessionId: sessionId
          }
        );
        throw error;
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error(
          `Error while uploading file to s3 while uploading session ${sessionId} for therapist ${therapistId} got error ${JSON.stringify(
            error
          )}`
        );
        sentryError(
          error,
          `Something happened with processing on trying to upload to s3 while uploading session ${sessionId} for therapist ${therapistId}`,
          { therapistId: therapistId, sessionId: sessionId }
        );
        throw error;
      }
    }
  }
);

export const protectedGet = async (route, options) => {
  return authAxios
    .get(route, options)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const protectedPut = async (route, payload) => {
  return authAxios
    .put(route, payload)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const protectedDelete = async (route) => {
  return authAxios
    .delete(route)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};
