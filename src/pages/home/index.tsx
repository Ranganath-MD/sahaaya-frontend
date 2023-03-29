import React, { useState, useContext } from "react";
import {
  Navigate,
  Link,
} from "react-router-dom";
import "./home.scss";
import { Container } from "@material-ui/core";
import { CategoryCard, DevButton, Seo } from "components";
import site from "utils/siteOptions.json";
import { Steps } from "./steps";
import { useWindowsize } from "hooks";
import { MobileSteps } from "./mobilesteps";

import { AuthContext, BaseContext } from "context";
import Illustration from "../../assets/ill/ill2.svg";
import Hero from "../../assets/Taieri.svg";
import Dummy1 from "../../assets/dummy/dummy1.png";
import Dummy2 from "../../assets/dummy/dummy2.png";
import Dummy3 from "../../assets/dummy/dummy3.png";
import Dummy4 from "../../assets/dummy/dummy4.png";

export const Home: React.FC = () => {
  const size = useWindowsize();
  const [step, setStep] = useState<number>(1);
  const ctx = useContext(BaseContext);
  const auth = useContext(AuthContext);

  const renderImage = () => {
    switch (step) {
    case 1:
      return Dummy1;
    case 2:
      return Dummy2;
    case 3:
      return Dummy3;
    case 4:
      return Dummy4;
    default:
      break;
    }
  };

  if (auth.isLoggedIn() && !auth.isAdmin())
    return <Navigate to="/dashboard" replace />;
  if (auth.isLoggedIn() && auth.isAdmin())
    return <Navigate to="/admin/dashboard" replace />;

  return (
    <div>
      <Seo title="Sahaaya" />
      <Container>
        <section id="section-one" className="hero-section">
          <div className="hero-text">
            <h1>{site.heroText}</h1>
            <p>{site.hero_desc}</p>
            <Link to="/register">
              <DevButton primary isShadow>
                Start Campaign
              </DevButton>
            </Link>
          </div>
          <div className="hero-img">
            <img src={Hero} width="100%" />
          </div>
        </section>
        <section id="section-two">
          <h1>Who uses Sahaaya</h1>
          <div className="section-flex">
            {ctx.categories !== null &&
              ctx.categories.map((c: any) => (
                <CategoryCard
                  key={c.key}
                  iconComponent={ctx.renderCategoryIcons(
                    c.key
                  )}
                  title={c.title}
                  description={c.description}
                  // backgroundSrc={ctx.renderBackground(c.key)}
                />
              ))}
          </div>
        </section>
        <section id="section-three">
          <div className="wrapper">
            <p>
              Follow these simple steps and start raising
              fund.
            </p>
            {size.width >= 600 ? (
              <Steps
                renderImage={renderImage}
                step={step}
                setStep={setStep}
              />
            ) : (
              <MobileSteps
                renderImage={renderImage}
                step={step}
                setStep={setStep}
              />
            )}
          </div>
        </section>
        <section id="section-four">
          <div>
            <p>Start your Campaign, Raise the fund</p>
            <DevButton
              color="#2a415d"
              background="yellow"
              isShadow
            >
              Register Now
            </DevButton>
          </div>
          <div className="hero-img">
            <img src={Illustration} width="100%" />
          </div>
        </section>
      </Container>
    </div>
  );
};
