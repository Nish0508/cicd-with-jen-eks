import bcrypt from "bcrypt";
import dotenv from "dotenv";

import { SentryErrorClass, logMessage } from "../utils/errorHandling.js";


import {
 getTherapistByEmail
} from "../utils/userHelpers.js";

dotenv.config();

const ACTIVE = "active";
const VERIFIED = "verified";
const UNVERIFIED = "unverified";

const normalizeEmail = email => email.toLowerCase().trim();

const isProd = process.env.NODE_ENV === "production";



const DISABLE_PHONE_TEST_DEPLOYMENT = isProd ? false : true;
console.log(`enabled phone verification - ${!DISABLE_PHONE_TEST_DEPLOYMENT}`);

if (isProd && DISABLE_PHONE_TEST_DEPLOYMENT) {
  throw new Error("You forgot to enable mobile validation");
}



export const loginUser = async (req, res, user) => {
  const sessionsList = []

  const subscriptionDetails = {
    enabledPro: true,
    activeDemo: false,
    isActive: true,
    hadProDemo:true,
    lastPaymentError: null
  }

  const patients = []
  const patientsIds = patients.map(x => x.user_id);
  const clientGroups = []
  const clientGroupsIds = clientGroups.map(x => x.group_id);
  const currentPlan = "pro"

  req.session.userRole = user.user_type;
  req.session.isAuthenticated = true;
  req.session.userState = user.user_status;
  req.session.userId = user.user_id;
  req.session.userName = user.user_name;
  req.session.userEmail = user.user_email;
  req.session.userGender = user.client_gender;
  req.session.userSessions = sessionsList;
  req.session.hasSubscription = subscriptionDetails.isActive;
  req.session.isAdmin = user.is_admin;
  req.session.isOwner = user.is_owner;
  req.session.patientsIds = patientsIds;
  req.session.clientGroupsIds = clientGroupsIds;
  req.session.teamId = user.team_id;
  req.session.finishedOnboarding = user.finished_onboarding;
  req.session.finishedIntroduction = user.finished_introduction;
  req.session.enabledPro = subscriptionDetails.enabledPro;
  req.session.activeDemo = subscriptionDetails.activeDemo;
  req.session.hadProDemo = subscriptionDetails.hadProDemo;
  req.session.currentPlan = currentPlan;
  req.session.gaClientId = "";
  req.session.createdTimestamp = Number(user.created);
  req.session.lastPaymentError = subscriptionDetails.lastPaymentError;
  req.session.userStripeId = user.stripe_customer_id;
  // req.session.stripeUserId =

  const data = {
    user_name: user.user_name,
    user_email: user.user_email,
    user_type: user.user_type,
    user_id: user.user_id,
    user_status: user.user_status,
    user_gender: user.client_gender,
    created: user.created,
    subscription_active: subscriptionDetails.isActive,
    is_admin: user.is_admin,
    is_owner: user.is_owner,
    team_id: user.team_id,
    finished_onboarding: user.finished_onboarding,
    finished_introduction: user.finished_introduction,
    enabled_pro: subscriptionDetails.enabledPro,
    active_demo: subscriptionDetails.activeDemo,
    had_pro_demo: subscriptionDetails.hadProDemo,
    current_plan: currentPlan,
    stripe_customer_id: user.stripe_customer_id
  };

  
  
  return res.status(200).json({
    status: 200,
    message: "Login successful!",
    data: data
  });
};

export const signin = async (req, res) => {
  let userEmail = req.body?.user_email || "";
  userEmail = normalizeEmail(userEmail);
  try {
    const user = await getTherapistByEmail(userEmail);
    if (user && user.user_status === "active") {
      switch (user.user_status) {
        case ACTIVE:
          // eslint-disable-next-line
          let password = req.body.user_password;
          // eslint-disable-next-line
          let valid = await bcrypt.compare(password, user.user_password);
          // eslint-disable-next-line
          if (valid) {
            await loginUser(req, res, user);
          } else {
            return res.json({
              status: 401,
              message: "The login information was incorrect!"
            });
          }
          break;
        case VERIFIED:
          return res.json({
            status: 401,
            message: "This account has not been activated by an administrator yet!"
          });
        case UNVERIFIED:
          return res.json({
            status: 401,
            message: "This account has not been verified yet!"
          });
        default:
          return res.json({
            status: 500,
            message: "Unknown user status!"
          });
      }
    } else {
      return res.json({
        status: 401,
        message: "The provided login information was invalid!"
      });
    }
  } catch (err) {
    const message = `An internal error happened while validating the user! ${err.message}`;
    new SentryErrorClass(err, message);
    return res.json({
      status: 500,
      message: message
    });
  }
};
