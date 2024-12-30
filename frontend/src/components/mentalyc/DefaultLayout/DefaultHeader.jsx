/// importing relevant modules and package
import React, { useEffect, useState } from "react";
import {  withRouter, useHistory, useLocation } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { ReactComponent as InfoIcon } from "@/assets/icons/info-circle.svg";
// import relevant icons
// import profile_dropdown_icon from "../../../assets/icons/Profile-dropdown.svg";
import profile_dropdown_icon from "@/assets/icons/Profile-dropdown.svg";
import logo from "@/assets/img/new_logo_small.svg";
import { ReactComponent as NoteIcon } from "@/assets/icons/hero/note.svg";
import { ReactComponent as NoteReviewIcon } from "@/assets/icons/profile/note.svg";
import { ReactComponent as UserIcon } from "@/assets/icons/profile/user.svg";
import { ReactComponent as KeyIcon } from "@/assets/icons/profile/key.svg";
import { ReactComponent as CardIcon } from "@/assets/icons/profile/card.svg";
import { ReactComponent as UserAddIcon } from "@/assets/icons/profile/user-add.svg";
import { ReactComponent as DocumentIcon } from "@/assets/icons/profile/document-download.svg";
import { ReactComponent as DataIcon } from "@/assets/icons/profile/data.svg";
import { ReactComponent as LogoutIcon } from "@/assets/icons/profile/logout.svg";
import { ReactComponent as MessageIcon } from "@/assets/icons/profile/message.svg";
import { ReactComponent as ShareIcon } from "@/assets/icons/profile/export.svg";
import { ReactComponent as TemplateIcon } from "@/assets/icons/profile/book.svg";
import { ReactComponent as ClientsIcon } from "@/assets/icons/profile/clients.svg";
import { ReactComponent as DashboardIcon } from "@/assets/icons/profile/clipboard-text.svg";
import { ReactComponent as GiftIcon } from "@/assets/icons/profile/gift.svg";
import { ReactComponent as GrowTeamIcon } from "@/assets/icons/profile/manage.svg";
import { ReactComponent as TreatmentIcon } from "@/assets/icons/treatments/review.svg";
import { IoCloseOutline } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
import { useWindowWidth } from "@react-hook/window-size";


import "./default.scss";

// context
import { useAppState } from "@/providers/AppStateProvider";
import { useAuthState } from "@/providers/AuthProvider";


const CONSENT_DOCUMENT = `/Files/Mentalyc_Informed_Consent.docx`;

const openInNewTab = (url) => {
  window.open(url, "_blank", "noreferrer");
};

const DefaultHeader = () => {
  const { logout, isOwner, isTeamMember, } = useAuthState();
  const {
    currentPlanName,
    activeDemo,
    referralBlink,
    updateReferalBlink
  } = useAppState();

  const location = useLocation();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [planName, setPlanName] = useState(activeDemo ? "Pro Demo" : currentPlanName);
  const width = useWindowWidth();
  // const activeClassName = location.pathname ? 'active-class' : '';

  return (
    <>
      <div data-testid="dashboard-header" className="header-container lg:tw-z-[100]" id="header">
        <div
          className={`${(width < 1000) ? "center-header" : "left-header"}`}
          style={{
            padding:
              (location.pathname.includes("onboarding") ||
                location.pathname.includes("introduction")) &&
              "0.5rem 0rem" // ugly hack to fix onboarding header
          }}>
       
          <div
            id="dashboardBanner"
            className="tw-absolute tw-right-0 tw-top-[4rem] sm:tw-top-[6rem] tw-max-w-[20rem]"></div>
        </div>
       
      </div>
    </>
  );
};

export default withRouter(DefaultHeader);
