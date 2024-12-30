import React from "react";
import { CCol, CRow } from "@coreui/react";
import "./crash.scss";
// import DefaultLayout from '../../components/mentalyc/DefaultLayout/DefaultLayout';
import { useAuthState } from "../../providers/AuthProvider";
import crash_image from "../../assets/img/404Page.svg";
import logo from "../../assets/img/new_logo.svg";
import { useHistory } from "react-router-dom";
import LoadingFallback from "../../components/mentalyc/DefaultLayout/LoadingFallback";
import { Drift } from "react-live-chat-loader";
const DefaultLayout = React.lazy(
  () =>
    import(/* webpackChunkName: "Layout" */ "../../components/mentalyc/DefaultLayout/DefaultLayout")
);

export const Page404 = () => {
  const { isAuthenticated } = useAuthState();
  const history = useHistory();

  return (
    <React.Suspense fallback={<LoadingFallback />}>
      <DefaultLayout beforeHeader={null}>
        <div
          className={`c-app flex-row align-items-center ${
            !isAuthenticated() && "c-default-layout"
          }`}
        >
          {/* <CContainer> */}
          <div className="empty-background">
            <CRow className="justify-content-center">
              <CCol md="12">
                <div className="crash-app-content">
                  <img src={logo} alt="Mentalyc" className="crash-page-logo" />
                  <p className="crash-page-text float-left">
                    Oops! The link you entered might be broken, expired or not accessible on mobile.
                  </p>
                  <img src={crash_image} alt="App crashed" className="image-page-404" />
                  <button
                    type="button"
                    className="crash-page-btn"
                    onClick={() => history.push("/")}
                  >
                    Back To Dashboard
                  </button>
                </div>
              </CCol>
            </CRow>
          </div>
          {/* </CContainer> */}
        </div>
        <Drift color="#731054" />
      </DefaultLayout>
    </React.Suspense>
  );
};
