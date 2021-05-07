import React, { useState, useContext } from "react";
import { RouteComponentProps, Redirect } from "@reach/router";
import "./home.scss";
import { Container } from "@material-ui/core";
import { CategoryCard, DevButton, Seo } from "components";
import Hero from "assets/Taieri.svg";
import site from "utils/siteOptions.json";
import { Steps } from "./steps";
import { useWindowsize } from "hooks";
import { MobileSteps } from "./mobilesteps";
import Dummy1 from "assets/dummy/dummy1.png";
import Dummy2 from "assets/dummy/dummy2.png";
import Dummy3 from "assets/dummy/dummy3.png";
import Dummy4 from "assets/dummy/dummy4.png";
import { AuthContext, BaseContext } from "context";

export const Home: React.FC<RouteComponentProps> = () => {
  const size = useWindowsize();
  const [ step, setStep ] = useState<number>(1);
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

  if(auth.isLoggedIn() && !auth.isAdmin()) return <Redirect to="dashboard" noThrow/>;
  if(auth.isLoggedIn() && auth.isAdmin()) return <Redirect to="admin/dashboard" noThrow/>;

  return (
    <div>
      <Seo title="Sahaaya"/>
      <Container>
        <section id="section-one" className="hero-section" >
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
          <h1>Who uses Sahaaya</h1>
          <div className="section-flex">
            {
              ctx.categories !== null && ctx.categories.map((c: any) =>  (
                <CategoryCard
                  key={c.key}
                  iconComponent={ctx.renderCategoryIcons(c.key)}
                  title={c.title}
                  description={c.description}
                />
              ))
            }
          </div>
        </section>
        <section id="section-three">
          <div className="wrapper">
            <p>Follow these simple steps and start raising fund.</p>
            {
              size.width >= 600 ?
                <Steps
                  renderImage={renderImage}
                  step={step}
                  setStep={setStep}
                /> :
                <MobileSteps
                  renderImage={renderImage}
                  step={step}
                  setStep={setStep}
                />
            }
          </div>
        </section>
        <section id="section-four">
          <span></span>
        </section>
      </Container>
    </div>
  );
};
