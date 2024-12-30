import React, { createContext, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import * as authAPI from "../services/unprotected/authAPI";
import { useAppState } from "./AppStateProvider";
import { sentryError } from "../utils/sentryErrorHelper";
import { errorToast } from "../utils/customToast";
import LoadingFallback from "../components/mentalyc/DefaultLayout/LoadingFallback";

const AuthContext = createContext();
const { Provider } = AuthContext;

const useAuthState = () => {
  const state = useContext(AuthContext);
  if (!state) {
    throw new Error("useAuthState must be used within AuthContextProvider");
  }
  return state;
};

const AuthContextProvider = ({ children }) => {
  const history = useHistory();
  const {
    setLoggedUserInfo,
    loggedUserId,
    setEnabledPro,
    setActiveDemo,
    setHadProDemo,
    setCurrentPlanName
  } = useAppState();

  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userRole: "unassigned",
    userState: "inactive",
    hasSubscription: false,
    isAdmin: false,
    isOwner: false,
    finishedOnboarding: false,
    finishedIntroduction: false,
    lastPaymentError: null
  });

  const [isLoading, setIsLoading] = useState(true);

  const updateSessionInfo = async () => {
    const loggedUserInfo = { status: 400, data: {} };
    if (loggedUserInfo.status === 200) {
      // this request always returns
      const isAuthenticated = loggedUserInfo.data.isAuthenticated || false;
      const userRole = loggedUserInfo.data.userRole || "unassigned";
      const userState = loggedUserInfo.data.userState || "inactive";
      const userName = loggedUserInfo.data.userName || "Unknown";
      const userEmail = loggedUserInfo.data.userEmail || "";
      const userGender = loggedUserInfo.data.userGender || "";
      const userId = loggedUserInfo.data.userId || "";
      const hasSubscription = loggedUserInfo.data.hasSubscription || false;
      const isAdmin = loggedUserInfo.data.isAdmin || false;
      const isOwner = loggedUserInfo.data.isOwner || false;
      const teamId = loggedUserInfo.data.teamId || null;
      const finishedOnboarding = loggedUserInfo.data.finishedOnboarding || false;
      const finishedIntroduction = loggedUserInfo.data.finishedIntroduction || false;
      const enabledProValues = loggedUserInfo.data.enabledPro || false;
      const activeDemo = loggedUserInfo.data.activeDemo || false;
      const hadProDemo = loggedUserInfo.data.hadProDemo || false;
      const lastPaymentError = loggedUserInfo.data.lastPaymentError;
      const userStripeId = loggedUserInfo.data.userStripeId ?? "";

      const currentPlanName = loggedUserInfo.data.currentPlan || "Free";
      const newAuthState = {
        isAuthenticated,
        userRole,
        userState,
        hasSubscription,
        isAdmin,
        isOwner,
        finishedOnboarding,
        finishedIntroduction,
        lastPaymentError
      };
      setLoggedUserInfo(userName, userId, userEmail, teamId, userStripeId, userGender);
      setEnabledPro(enabledProValues);
      setActiveDemo(activeDemo);
      setHadProDemo(hadProDemo);
      setAuthState(newAuthState);
      setCurrentPlanName(currentPlanName);
    }
  };

  useEffect(() => {
    (async function () {
      try {
        setIsLoading(true);
        await updateSessionInfo().catch(() => {});
      } finally {
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

  const isAuthenticated = () => {
    return authState.isAuthenticated === true;
  };

  const isAdmin = () => {
    return authState.isAdmin;
  };

  const isOwner = () => {
    return authState.isOwner;
  };

  const isActivated = () => {
    return authState.userState === "active";
  };

  const isSubscribed = () => {
    return authState.hasSubscription;
  };

  const hasFinishedOnboarding = () => {
    return authState.finishedOnboarding;
  };

  const setHasFinishedOnboarding = (finished) => {
    setAuthState({ ...authState, finishedOnboarding: finished });
  };

  const setHasFinishedIntroduction = (finished) => {
    setAuthState((prev) => ({ ...prev, finishedIntroduction: finished }));
  };

  const setFinishedOnboarding = (onboardingValue) => {
    setAuthState({ ...authState, finishedOnboarding: onboardingValue });
  };

  return (
    <Provider
      value={{
        authState,
        userRole: authState.userRole,
        isActivated,
        isAdmin,
        isOwner,
        isAuthenticated,
        isSubscribed,
        setAuthState,
        setHasFinishedOnboarding,
        hasFinishedOnboarding,
        setFinishedOnboarding,
        setHasFinishedIntroduction,
        updateSessionInfo
      }}>
      {isLoading ? <LoadingFallback /> : children}
    </Provider>
  );
};

export { useAuthState, AuthContextProvider };
