import dotenv from "dotenv";
import { makeMutation, makeQuery } from "./grapqlHelpers.js";
dotenv.config();

const PORT = process.env.PORT;
const webServerURL = `${process.env.API_SERVER_URL}:${PORT}`;

const DEMO_NOTES = 15;
export const GROUP_THERAPY = "Group therapy";
const DAY_IN_MS = 1000 * 60 * 60 * 24;
const TWO_WEEKS_IN_MS = DAY_IN_MS * 14;

export const getTherapistByEmail = async email => {
  let queryGetTherapistByEmail = `
  getTherapistByEmail(user_email:"${email}"){
    user_id  	
    user_name  	
    user_email  	
    user_password 	
    user_type
    user_status
    client_gender
    is_admin
    is_owner
    team_id
    created
    finished_onboarding
    finished_introduction
    stripe_customer_id
  }`;
  let result = await makeQuery(queryGetTherapistByEmail, "token", webServerURL);
  let userInfo = JSON.parse(result).getTherapistByEmail;
  return userInfo;
};
