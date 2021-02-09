import React from "react";
import { RouteComponentProps } from "@reach/router";
import "./home.scss";
import { Container } from "@material-ui/core";
import { DevButton } from "../../components";
import Hero from "../../assets/Taieri.svg";
import site from "../../utils/siteOptions.json";
import { Seo } from "../../components/layout/Seo";

export const Home: React.FC<RouteComponentProps> = () => {
  return (
    <div>
      <Seo title="Sahaaya"/>
      <Container>
        <section className="hero-section">
          <div className="hero-text">
            <h1>{site.heroText}</h1>
            <p>{site.hero_desc}</p>
            <DevButton
              primary
              isShadow
            >
              Start Campaign
            </DevButton>
          </div>
          <div className="hero-img">
            <img src={Hero} width="100%"/>
          </div>
        </section>
        <section id="section-two">
          <p>Who uses Sahaaya</p>
          <div className="section-flex">
            <div>Farmers</div>
            <div>Talents</div>
            <div>Movie Makers</div>
            <div>Start up</div>
          </div>
        </section>
        <section>
          <span></span>
        </section>
      </Container>
    </div>
  );
};
