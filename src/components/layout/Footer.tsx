import React from "react";
import LinkedinIcon from "../../assets/linkedin.svg";
import GithubIcon from "../../assets/github.svg";

export const Footer: React.FC = () => {
  return (
    <div className="footer-container">
      <span>
        <b>Sahaaya</b>© {new Date().getFullYear()}{" "}
      </span>
      <div>
        <a
          href="https://www.linkedin.com/in/ranganathmd/"
          target="_blank"
        >
          <img src={LinkedinIcon} alt="linkedin" />
        </a>
        <a
          href="https://github.com/Ranganath-MD"
          target="_blank"
        >
          <img src={GithubIcon} alt="github-icon" />
        </a>
      </div>
    </div>
  );
};
