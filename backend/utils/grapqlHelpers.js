import { GraphQLClient, gql } from "graphql-request";
import dotenv from "dotenv";

// import winston from 'winston';
// var defLogger = winston.createLogger({
//   level: 'info',
//   format: winston.format.json(),
//   defaultMeta: { service: 'user-service' },
//   transports: [new winston.transports.File({ filename: 'winston.log' }),],
// });

dotenv.config();

const PORT = process.env.PORT;
const serverURL = `${process.env.API_SERVER_URL ?? "http://localhost"}:${PORT ?? 8000}`;

let client = null;

const getClient = () => {
  if (client !== null) {
    return client;
  } else {
    const endpoint = `${serverURL}/graphql`;
    console.log({ endpoint });
    client = new GraphQLClient(endpoint, {
      headers: {
        authorization: "Bearer token",
        "Content-Type": "application/json"
      }
    });
    return client;
  }
};

export const makeMutation = async (get_mutation, get_variables, token, WebServerURL) => {
  const graphQLClient = getClient();
  const mutation = gql`
    ${get_mutation}
  `;
  const variables = get_variables;
  const data = await graphQLClient.request(mutation, variables);
  return JSON.stringify(data, undefined, 2);
};

export const makeQuery = async (get_query, token, WebServerURL) => {
  const graphQLClient = getClient();
  const query = gql`{${get_query}}`;
  const data = await graphQLClient.request(query);
  let res = JSON.stringify(data, undefined, 2);
  return res;
};
