import { protectedPost, protectedGet } from "../../utils/apiHelpers";
import * as authRoutes from "../apiRoutes/authRoutes";

export const signupUser = async (userSignupJson) => {
  return protectedPost(authRoutes.userSignup, userSignupJson);
};

export const loginUser = async (userLoginJson) => {
  return protectedPost(authRoutes.userSignin, userLoginJson);
};

export const loginWithGoogle = async (idToken) => {
  return protectedPost("/auth/google/login", { idToken });
};

export const getGoogleIdToken = async (code) => {
  return protectedPost("/auth/google/getToken", { code });
};

export const loginWithMicrosoft = async (accessToken) => {
  return protectedPost("/auth/microsoft/login", { accessToken });
};

export const getUserSessionInfo = async () => {
  return protectedGet("/auth/getUserSession");
};

export const generateRecoveryMail = async (recoveryEmailJson) => {
  return protectedPost(authRoutes.generateRecoveryMail, recoveryEmailJson);
};

export const validateCode = async (codeJson) => {
  return protectedPost(authRoutes.validateCode, codeJson);
};

export const validatePhone = async (authDetails) => {
  return protectedPost(authRoutes.validatePhone, authDetails);
};

export const getUserPurchaseInfo = async () => {
  let endpoint = authRoutes.getUserPurchaseInfo;
  return protectedGet(endpoint);
};
