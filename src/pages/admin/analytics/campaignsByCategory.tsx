import React, { useState } from "react";
import { VictoryPie, VictoryTheme, VictoryLabel, VictoryTooltip } from "victory";
import { DevCard, DevCardHeader } from "components";

const data = [
  { category: "Farmers", count: 2 },
  { category: "Talents", count: 3 },
  { category: "Movies", count: 5 },
  { category: "Start-ups", count: 10 },
];
const style = {
  labels: {
    fill: "#2a415d",
    fontSize: 12,
    fontFamily: "'Arvo', serif",
    fontWeight: 600
  },
  width: 400,
  height: 400,
  padding: 50
};
const CustomLabel = (props: any) => {
  return (
    <g>
      <VictoryLabel {...props}/>
      <VictoryTooltip
        {...props}
        x={200} y={250}
        orientation="top"
        pointerLength={0}
        cornerRadius={50}
        flyoutWidth={100}
        flyoutHeight={100}
        flyoutStyle={{ fill: "#2a415d" }}
        style={{ fill: "ghostwhite" }}
      />
    </g>
  );
};

CustomLabel.defaultEvents = VictoryTooltip.defaultEvents;

export const CampaignsByCategory: React.FC = () => {
  const [openBar, setOpenBar] = useState<boolean>(true);

  return (
    <DevCard>
      <DevCardHeader
        headerText="Campaigns by Category"
        menuItems={[
          {
            name: openBar ? "Collapse" : "Expand",
            onClick: () => setOpenBar(!openBar),
          },
        ]}
      />
      {openBar && (
        <VictoryPie
          colorScale={["#ffe0009e", "#e4e8ff", "#c5ffc3", "#FFEEDB" ]}
          animate
          cornerRadius={5}
          innerRadius={50}
          padAngle={2}
          x = "category"
          y = "count"
          style={style}
          labelRadius={80}
          labels={({ datum }) =>
            `${datum.category}
              # ${datum.count}
            `}
          labelComponent={<CustomLabel />}
          data={data}
        />
      )}
    </DevCard>
  );
};
