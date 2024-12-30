import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { errorToast, infoToast, successToast } from "../../utils/customToast";
import "./login.scss";
import * as authAPI from "../../services/unprotected/authAPI";

import login_logo from "@/assets/img/new_logo.svg";
import mentalyc_login_img from "@/assets/img/front/SignupGraphic.svg";
import LoadingFallback from "@/components/mentalyc/DefaultLayout/LoadingFallback";
import { LoginForm } from "@/components/mentalyc/LoginForms";
import { sentryError } from "@/utils/sentryErrorHelper";
import ErrorFallback from "@/components/mentalyc/ErrorFallback";
import * as Sentry from "@sentry/react";


import { PreloadImage } from "../../components/mentalyc/PreloadImage";


import { BackButton } from "@/components/mentalyc/BackButton";
import { LoadingPulse } from "@/components/mentalyc/LoadingPulse";
import AuthFooter from "@/components/mentalyc/AuthFooter";
import { useLoginSetup } from "@/hooks/useLoginSetup";



const Login = () => {
  const [showRecoveryEmailForm, setShowRecoveryEmailForm] = useState(false);
  const [showRecoveryCodeForm, setShowRecoveryCodeForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  
  
  const [loginLoading, setLoginLoading] = useState(false);
  
  const [pageLoading, setPageLoading] = useState(false);
  const [gtoken, setGtoken] = useState<string | null>();
  const location = useLocation();

  const { setupUserAfterLogin } = useLoginSetup();

  const handleReturnLink = () => {
    setShowRecoveryCodeForm(false);
    setShowRecoveryEmailForm(false);
  };

  useEffect(() => {
    // @ts-ignore
    window?._cio?.page(isMobile ? "mobileLogin" : "desktopLogin", {});
  }, []);

  // search params

  useEffect(() => {
    // on mount, remove the following sensitive params from the search params
    // gtoken: google token is removed for obvious security reasons
    // returnUrl: removed and stored in the session storage so it can be persisted
    let searchParams = new URLSearchParams(location.search);
    let gtoken = searchParams.get("gtoken") ?? "";
    let returnUrl = searchParams.get("returnUrl");
    setGtoken(gtoken);

    searchParams.delete("gtoken");
    searchParams.delete("returnUrl");

    history.push(location.pathname + "?" + searchParams.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (gtoken) {
      handleGoogleLogin(gtoken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gtoken]);

  const handleSubmitForm = async (e: any ) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      infoToast("Please input both login credentials!", {
        toastId: "invalid-credentials"
      });
    } else {
      let userLoginJson = {
        user_email: email.trim().toLowerCase(),
        user_password: password.trim(),
        is_mobile: isMobile
      };

      setLoginLoading(true);
      return authAPI
        .loginUser(userLoginJson)
        .then((userLogin) => {
          setLoginLoading(false);
          if (
            userLogin.status === 200 &&
            userLogin.data !== null &&
            Object.keys(userLogin.data).length > 0
          ) {
            const userLoginData = userLogin.data;
            setupUserAfterLogin(userLoginData);
          } else if (userLogin.status === 400) {
            infoToast(
              "We couldn't log you in. Your email doesn't seem to match the expected format.",
              {
                toastId: "problem"
              }
            );
          } else if (userLogin.status === 401) {
            infoToast("We couldn't log you in. Your credentials don't seem to match.", {
              toastId: "problem"
            });
          } else {
            infoToast("We couldn't log you in. Please contact the support team.", {
              toastId: "problem"
            });
          }
        })
        .catch((err) => {
          setLoginLoading(false);
          errorToast("There was a problem with logging you in. Please contact the support team.", {
            toastId: "problem"
          });
          sentryError(err, `Problem logging in`, { userEmail: email });
        });
    }
  };


  async function handleGoogleLogin(idToken: string) {
    try {
      setPageLoading(true);
      let data = await authAPI.loginWithGoogle(idToken);
      let userLoginData = data.data;
      
      setPageLoading(false);
      setupUserAfterLogin(userLoginData);
    } catch (err: any) {
      setPageLoading(false);
      if (err.response.status === 404) {
        // user does not exist,
        // navigate to signup and skip the first form to continue registration

        const user = err.response.data.user;
       

        history.push({
          pathname: "/register",
          state: {
            historyState: "phone",
            googleIdToken: idToken
          }
        });
      } else {
        setGtoken(null);
        let message = "an error occurred";
        errorToast(message);
        sentryError(err, "an error occured authenticating user through google");
      }
    }
  }

  const handleMicrosoftLogin = async (res: any) => {
    try {
      setPageLoading(true);
      let loginRes = await authAPI.loginWithMicrosoft(res.accessToken);
      let userLoginData = loginRes.data;
     
      setPageLoading(false);
      setupUserAfterLogin(userLoginData);
    } catch (err: any) {
      setPageLoading(false);
      if (err.response && err.response.status === 404) {
        // user does not exist,
        // navigate to signup and skip the first form to continue registration

        const user = err.response.data.user;
        
        

        history.push({
          pathname: "/register",
          state: {
            historyState: "phone",
            microsoftAccessToken: res.accessToken
          }
        });
      } else {
        let message = "an error occurred";
        errorToast(message);
        sentryError(err, "an error occurred authenticating user through google");
      }
    }
  };

  const sendRecoveryCode = async (callback?: (err?: any) => void) => {
    if (email.trim() === "") {
      infoToast("Please input your email address!");
    } else {
      let recoveryEmailJson = {
        user_email: email
      };

      try {
        const generateRecoveryMailResponse = await authAPI.generateRecoveryMail(recoveryEmailJson);
        if (generateRecoveryMailResponse.status === 200) {
          successToast("We have sent a code to the provided email address!");
          callback?.();
        } else {
          errorToast(generateRecoveryMailResponse.message);
          sentryError(
            null,
            `An internal error occurred while generating recovery mail ${generateRecoveryMailResponse.message}`,
            {}
          );
          let err = Error(generateRecoveryMailResponse.message);
          callback?.(err);
        }
      } catch (err) {
        errorToast("oops an error occurred. Please try again");
        sentryError(err, `There was a problem while generating a recovery mail!`, {});
        callback?.(err);
      }
    }
  };

  const showBackBtn = showRecoveryCodeForm || showRecoveryEmailForm;

  return (
    <Sentry.ErrorBoundary
      beforeCapture={(scope) => {
        scope.setTag("component", "login");
      }}
      fallback={ErrorFallback}>
      <React.Suspense fallback={<LoadingFallback />}>
        <div className="login-page">
          <div className="page-content">
            <div className="left-content" style={{ position: "relative" }}>
              {pageLoading && (
                <div className="tw-absolute tw-left-0 tw-top-0 tw-w-full tw-h-full tw-grid tw-place-items-center">
                  <div className="loading-overlay  tw-absolute tw-left-0 tw-top-0 tw-w-full tw-h-full  tw-bg-black tw-opacity-40 tw-z-10"></div>
                  <div className="relative tw-z-10">
                    <LoadingPulse color="white" size="large" />
                  </div>
                </div>
              )}
              {showBackBtn && (
                <div className="back-button-section">
                  <BackButton className="tw-text-primary-500" onClick={handleReturnLink} />
                </div>
              )}
              <div className="login-form-container">
                <div className="top-login-section">
                  <div className="login-header-section">
                    <div className="logo">
                      <img src={login_logo} alt="app logo" />
                    </div>
                  </div>

                  <>
                    {!showRecoveryEmailForm && !showRecoveryCodeForm && (
                      <LoginForm
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        loading={loginLoading}
                        setShowRecoveryEmailForm={setShowRecoveryEmailForm}
                        onSubmitLogin={handleSubmitForm}
                        onGoogleLogin={handleGoogleLogin}
                        onMicrosoftLogin={handleMicrosoftLogin}
                      />
                    )}
                    {showRecoveryEmailForm && !showRecoveryCodeForm && (
                      <div>sdfsd</div>
                    )}
                    {!showRecoveryEmailForm && showRecoveryCodeForm && (
                     <div>sdfsd </div>
                    )}
                  </>

                  <AuthFooter />
                </div>
              </div>
            </div>
            <div className="right-content">
              <PreloadImage src={mentalyc_login_img} className="login-image" />
            </div>
          </div>
        </div>
      </React.Suspense>
    </Sentry.ErrorBoundary>
  );
};

export default Login;
