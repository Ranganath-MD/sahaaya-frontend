import React, { useContext, useState } from "react";
import { DevCard, DevCardHeader } from "components";
import { AdminDashboardContext } from "context";
import {
  VictoryLine,
  VictoryChart,
  VictoryScatter,
  VictoryTheme,
  VictoryAxis,
  VictoryTooltip
} from "victory";

const donation = [
  { index: "Jan", donation: 2000000, campaigns: 10 },
  { index: "Feb", donation: 3500000, campaigns: 12 },
  { index: "Mar", donation: 3800000, campaigns: 2 },
  { index: "Apr", donation: 4000000, campaigns: 0 },
  { index: "May", donation: 4100000, campaigns: 3 },
  { index: "Jun", donation: 4350000, campaigns: 10 },
  { index: "Jul", donation: 4500000, campaigns: 12 },
  { index: "Aug", donation: 4600000, campaigns: 5 },
  { index: "Sep", donation: 5000000, campaigns: 6 },
  { index: "Oct", donation: 5500000, campaigns: 8 },
  { index: "Nov", donation: 6000000, campaigns: 10 },
  { index: "Dec", donation: 6500000, campaigns: 8 },
];

const style = {
  data: { stroke: "#c43a31" },
  axis: { stroke: "#2a415d" },
  axisLabel: {
    fontSize: 10,
    fontFamily: "'Arvo', serif",
    fontWeight: 600,
    padding: 30,
  },
  ticks: { stroke: "grey", size: 5 },
  tickLabels: { fontSize: 7, fontWeight: 600, padding: 5 },
};

export const DonationsByyear: React.FC = () => {
  const [openBar, setOpenBar] = useState<boolean>(true);
  const ctx = useContext(AdminDashboardContext);

  return (
    <DevCard>
      <DevCardHeader
        headerText="Status Vs Campaigns"
        menuItems={[
          {
            name: openBar ? "Collapse" : "Expand",
            onClick: () => setOpenBar(!openBar),
          },
        ]}
      />
      {openBar && (
        <VictoryChart
          // adding the material theme provided with Victory
          theme={VictoryTheme.material}
        >
          <VictoryAxis
            tickFormat={["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}
            label="In the Month of 2021"
            style={style}
            padding={{ top: 0, bottom: 0, left: 0, right: 0 }}
          />
          <VictoryAxis
            dependentAxis
            label="Donation in lacs"
            style={style}
            tickFormat={(x) => `${x}`}
          />
          <VictoryLine
            style={style}
            interpolation="basis"
            data={donation}
            x="index"
            y={(d) => Math.round(d.donation / 100000)}
          />
          <VictoryScatter
            data={donation}
            size={5}
            style={{ data: { fill: "#c43a31" } }}
            x="index"
            y={(d) => Math.round(d.donation / 100000)}
            labels={({ datum }) => `${Math.round(datum.donation / 100000)} lacs`}
            labelComponent={<VictoryTooltip dy={0} />}
          />
        </VictoryChart>
      )}
    </DevCard>
  );
};
