import { useAppState } from "@/providers/AppStateProvider";
import { useAuthState } from "@/providers/AuthProvider";

import { useHistory } from "react-router-dom";

const useLoginSetup = () => {
  const { setLoggedUserInfo, setEnabledPro, setActiveDemo, setHadProDemo, setCurrentPlanName } =
    useAppState();
  const { setAuthState } = useAuthState();
  const history = useHistory();

  const redirectUser = (userLoginData: any) => {
    const returnUrl = "";
    let introductionRoute = "/lost";
    let skipReturnUrl =
      returnUrl === introductionRoute && userLoginData.finished_introduction === true;

    if (returnUrl && !skipReturnUrl) {
      history.push(returnUrl);
    } else {
      if (!userLoginData.finished_introduction) {
        history.push(introductionRoute);
      } else if (userLoginData.team_id !== null && !userLoginData.finished_onboarding) {
        history.push("/lost");
      } else {
        history.push("/lost");
      }
    }
  };

  const setupUserAfterLogin = (userLoginData: any) => {
    
    // userName: string, userId: string
    setLoggedUserInfo(
      userLoginData.user_name,
      userLoginData.user_id,
      userLoginData.user_email,
      userLoginData.team_id,
      userLoginData.stripe_customer_id,
      userLoginData.user_gender
    );
    // isAuthenticated: userRole, userStatus
    setAuthState({
      isAuthenticated: true,
      userRole: userLoginData.user_type,
      userState: userLoginData.user_status,
      hasSubscription: userLoginData.subscription_active,
      isAdmin: userLoginData.is_admin,
      isOwner: userLoginData.is_owner,
      teamId: userLoginData.team_id,
      finishedOnboarding: userLoginData.finished_onboarding,
      finishedIntroduction: userLoginData.finished_introduction
    });

    setEnabledPro(userLoginData.enabled_pro);
    setActiveDemo(userLoginData.active_demo);
    setHadProDemo(userLoginData.had_pro_demo);
    setCurrentPlanName(userLoginData.current_plan);

    
    // setup customerIO tracking
   
    redirectUser(userLoginData);
  };

  return { setupUserAfterLogin };
};

export { useLoginSetup };

