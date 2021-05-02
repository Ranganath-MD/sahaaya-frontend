import { ExpandablePanel } from "components";
import { CampaignContext } from "context";
import React, { useState, useEffect, useContext } from "react";
import { RiAttachmentLine } from "react-icons/ri";

const iconStyle = {
  width: "1.1em",
  height: "1.1em",
};
export const Attchments: React.FC = () => {
  const [expand, setExpand] = useState(false);

  const ctx = useContext(CampaignContext);

  useEffect(() => {
    if (ctx.activeSection === "step3") setExpand(true);
    else setExpand(false);
  }, [ctx.activeSection]);

  return (
    <ExpandablePanel
      headerText={"Attachments"}
      expanded={expand}
      headerIcon={<RiAttachmentLine color="#0052CC" style={iconStyle} />}
    >
      Attachments
    </ExpandablePanel>
  );
};

