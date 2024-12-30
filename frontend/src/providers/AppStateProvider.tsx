import React, { useContext, useState, createContext, useEffect, ReactNode } from "react";

import { GroupInfo, PatientInfo } from "@/types/patients";
import { PlanLevel } from "@/types/utils";
import {
  BASIC_PLAN_LEVEL,
  FREE_PLAN_LEVEL,
  MINI_PLAN_LEVEL,
  PRO_PLAN_LEVEL,
  SUPER_PLAN_LEVEL
} from "@/utils/constants";



type SessionAllowance = {
  createdSessions: number;
  remainingSessions: number;
  purchasedSessions: number;
  freeRemainingNotesPerType: { [x: string]: number };
  remainingDemoNotes: number;
  resetDate: number;
  subscriptionStart: number;
  subscriptionEnd: number;
  trialEnd: number | null;
};

interface IAppState {
  userName: string;
  userEmail: string;
  loggedUserId: string;
  userStripeId: string;
  teamId: string;
  userGender: string;
  onboarding: boolean;
  seenUploadReminder: boolean;
  clientStatusFilter: string;
  enabledPro: boolean;
  hadProDemo: boolean;
  activeDemo: boolean;
  canUsePro: boolean;
  currentPlanName: string;
  currentPlanLevel: PlanLevel;
  sessionsAllowance: SessionAllowance | null;
  setOnboarding: React.Dispatch<React.SetStateAction<boolean>>;
  setLoggedUserInfo: (
    userName: string,
    userId: string,
    userEmail: string,
    teamId: string,
    userStripeId: string,
    userGender: string
  ) => void;
  setClientStatusFilter: React.Dispatch<React.SetStateAction<string>>;
  setEnabledPro: React.Dispatch<React.SetStateAction<boolean>>;
  setHadProDemo: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveDemo: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPlanName: React.Dispatch<React.SetStateAction<string>>;
  setPatientLastSessionUploadTimestamp: (
    patientId: string | null,
    clientGroupId: string | null,
    timestamp: number
  ) => void;
  updateSessionsAllowance: (sessionAllowance?: SessionAllowance) => void;
}

const LAST_REFERAL_BLINK = "LAST_REFERAL_BLINK";

const AppStateContext = createContext<IAppState | null>(null);

export function useAppState() {
  const state = useContext(AppStateContext);
  if (!state) {
    throw new Error("useAppState must be used within AppStateProvider");
  }
  return state;
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [loggedUserId, setLoggedUserId] = useState("");
  const [userStripeId, setUserStripeId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userGender, setUserGender] = useState("");
  const [onboarding, setOnboarding] = useState(false);
  const [teamId, setTeamId] = useState("");
  const [seenUploadReminder, setSeenUploadReminder] = useState(false);
  const [enabledPro, setEnabledPro] = useState(false);
  const [hadProDemo, setHadProDemo] = useState(false);
  const [activeDemo, setActiveDemo] = useState(false);
  const [currentPlanName, setCurrentPlanName] = useState("Free");
  const [currentPlanLevel, setCurrentPlanLevel] = useState(FREE_PLAN_LEVEL as PlanLevel);
  const [sessionsAllowance, setSessionsAllowance] = useState<SessionAllowance | null>(null);
  const [clientStatusFilter, setClientStatusFilter] = useState("active");



  useEffect(() => {
    let planLevels: Record<string, PlanLevel> = {
      free: FREE_PLAN_LEVEL,
      mini: MINI_PLAN_LEVEL,
      basic: BASIC_PLAN_LEVEL,
      pro: PRO_PLAN_LEVEL,
      super: SUPER_PLAN_LEVEL
    };
    let usersPlan = currentPlanName.toLowerCase();
    let usersPlanLevel: PlanLevel = planLevels[usersPlan] ?? planLevels.free;
    setCurrentPlanLevel(usersPlanLevel);
  }, [currentPlanName]);

  const setPatientLastSessionUploadTimestamp = (
    patientId: string | null,
    clientGroupId: string | null,
    timestamp: number
  ) => {
    
  };

  const setLoggedUserInfo = (
    userName: string,
    userId: string,
    userEmail: string,
    teamId: string,
    userStripeId: string,
    userGender: string
  ) => {
    setLoggedUserId(userId);
    setUserName(userName);
    setUserEmail(userEmail);
    setTeamId(teamId);
    setUserStripeId(userStripeId);
    setUserGender(userGender);
  };

  const providerValue = {
    userName,
    userEmail,
    loggedUserId,
    userStripeId,
    userGender,
    teamId,
    onboarding,
    seenUploadReminder,
    enabledPro,
    hadProDemo,
    activeDemo,
    canUsePro: enabledPro || activeDemo,
    currentPlanName,
    currentPlanLevel,
    sessionsAllowance,
    clientStatusFilter,
    setOnboarding,
    setLoggedUserInfo,
    setEnabledPro,
    setHadProDemo,
    setActiveDemo,
    setCurrentPlanName,
    setPatientLastSessionUploadTimestamp,
    setClientStatusFilter
  };

  return <AppStateContext.Provider value={providerValue}>{children}</AppStateContext.Provider>;
}
