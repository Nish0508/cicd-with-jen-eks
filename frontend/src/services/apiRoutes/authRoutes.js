import { hostRoute } from "../../utils/routesHelper";
const authRoute = `${hostRoute}/auth`;

export const userSignin = authRoute + "/signin";

export const userSignup = authRoute + "/signup";

export const getUserSessionInfo = authRoute + "/getUserSession";

export const generateRecoveryMail = authRoute + "/recover";

export const validateCode = authRoute + "/validate";

export const userSignout = authRoute + "/signout";

export const validatePhone = authRoute + "/verifyPhone";

export const identifyUserProfile = authRoute + "/identify";

export const getUserPurchaseInfo = authRoute + "/purchaseState";

export const setupTracking = authRoute + "/setupTracking";
