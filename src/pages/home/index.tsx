import React, { useState } from "react";
import { RouteComponentProps } from "@reach/router";
import "./home.scss";
import { Container } from "@material-ui/core";
import { CategoryCard, DevButton } from "../../components";
import Hero from "../../assets/Taieri.svg";
import site from "../../utils/siteOptions.json";
import { Seo } from "../../components/layout/Seo";
import { GrValidate } from "react-icons/gr";
import { RiMovie2Line } from "react-icons/ri";
import { GiHourglass, GiFarmTractor } from "react-icons/gi";
import { Steps } from "./steps";
import { useWindowsize } from "../../hooks";
import { MobileSteps } from "./mobilesteps";
import Dummy1 from "../../assets/dummy/dummy1.png";
import Dummy2 from "../../assets/dummy/dummy2.png";
import Dummy3 from "../../assets/dummy/dummy3.png";
import Dummy4 from "../../assets/dummy/dummy4.png";

export const Home: React.FC<RouteComponentProps> = () => {
  const size = useWindowsize();
  const [ step, setStep ] = useState<number>(1);

  const renderCategoryIcons = (key: string) => {
    switch (key) {
    case "c1":
      return <GiFarmTractor size={30}/>;
    case "c2":
      return <GrValidate size={30}/>;
    case "c3":
      return <RiMovie2Line size={30}/>;
    case "c4":
      return <GiHourglass size={30}/>;
    default:
      return null;
    }
  };

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
              site.categories.map((c) => {
                return (
                  <CategoryCard
                    key={c.key}
                    iconComponent={renderCategoryIcons(c.key)}
                    title={c.title}
                    description={c.description}
                  />
                );
              })
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
