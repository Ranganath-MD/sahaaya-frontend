import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { RiMovie2Line } from "react-icons/ri";
import siteOptions from "../../utils/siteOptions.json";

export const MobileSteps: React.FC<IStepProps> = ({ renderImage, setStep }) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: IPanelProps) => (_e: React.ChangeEvent<any>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel.id : false);
    setStep(panel.step);
  };

  return (
    <div>
      {
        siteOptions.panelData.map((panel) => {
          return (
            <Accordion
              key={panel.id}
              expanded={expanded === panel.id}
              onChange={handleChange(panel)}
              className={expanded === panel.id ? "msteps__active" : "msteps__primary"}
            >
              <AccordionSummary
                expandIcon={<RiMovie2Line />}
                id={panel.id}
              >
                <span className="icon">{panel.step}</span>
                <span>{panel.title}</span>
              </AccordionSummary>
              <AccordionDetails>
                <div className="panel_details">
                  <img src={renderImage()} />
                  <span>{panel.description} </span>
                </div>
              </AccordionDetails>
            </Accordion>
          );
        })
      }
    </div>
  );
};
