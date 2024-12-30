import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import "./default.scss";
import { useAuthState } from "../../../providers/AuthProvider";
import { isMobile } from "react-device-detect";
import PropTypes from "prop-types";
import DefaultHeader from "./DefaultHeader";


const DefaultLayout = ({ children, beforeHeader, customContainerClass = "" }) => {
  const { isAuthenticated, hasFinishedOnboarding } = useAuthState();
  const routeObject = useRouteMatch("/dashboard");
  const [dashboardRoute, setDashboardRoute] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    if (routeObject !== null && routeObject.path === "/dashboard") {
      setDashboardRoute(true);
    } else {
      setDashboardRoute(false);
    }
  }, [routeObject]);

  useEffect(() => {
    const handleSessionExpired = () => {
      setSessionExpired(true);
    };

    // event listener for expired session custom event
    window.addEventListener("sessionExpired", handleSessionExpired);

    return () => {
      window.removeEventListener("sessionExpired", handleSessionExpired);
    };
  }, []);

  return (
    <div className="c-wrapper-custom">
      {isAuthenticated() ? (
        <>
          {beforeHeader}
          <DefaultHeader />
          <div className="c-body-custom">
            <main className="c-main-custom">
              {/* {isMobile && !hasFinishedOnboarding() && dashboardRoute && <div className="mobile-header-notification" closeButton>
              The mobile version enables you to upload your sessions and view your notes. Open Mentalyc on your computer to finish your onboarding and access the full functionality.
              </div>} */}

              <div className={`custom-container ${customContainerClass}`}>{children}</div>
            </main>
          </div>
        </>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node,
  beforeHeader: PropTypes.node,
  customContainerClass: PropTypes.string
};
export default DefaultLayout;
