import React from "react";
import GmailIcon from "../../assets/gmail.svg";
import LinkedinIcon from "../../assets/linkedin.svg";

export const Footer: React.FC = () => {

  return (
    <div className="footer-container">
      <span>© {new Date().getFullYear()} <b>Sahaaya, Inc.</b> All rights reserved</span>
      <div>
        <img src={GmailIcon} alt="gmail-icon" />
        <img src={LinkedinIcon} alt="linkedin-icon"/>
      </div>
    </div>
  );
};
