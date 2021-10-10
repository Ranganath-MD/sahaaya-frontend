import React, { useContext, useState } from "react";
import { DevCard, DevCardHeader } from "components";
import { AdminDashboardContext } from "context";
import {
  VictoryLine,
  VictoryChart,
  VictoryScatter,
  VictoryTheme,
  VictoryAxis,
  VictoryTooltip,
} from "victory";
import { Loading } from "./loading";

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
      {ctx.isLoading ? (
        <Loading />
      ) : (
        <>
          {openBar && (
            <VictoryChart
              // adding the material theme provided with Victory
              theme={VictoryTheme.material}
            >
              <VictoryAxis
                tickFormat={[
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ]}
                label="In the Month of 2021"
                style={style}
              />
              <VictoryAxis
                dependentAxis
                label="Donation in lacs"
                style={style}
                tickFormat={(x) => Math.round(x / 100000)}
              />
              <VictoryLine
                animate
                style={style}
                interpolation="linear"
                data={ctx.donationsByyear}
              />
              <VictoryScatter
                data={ctx.donationsByyear}
                size={5}
                style={{ data: { fill: "#c43a31" } }}
                labels={({ datum }) =>
                  `${Math.round(datum.y / 100000)} lacs`
                }
                labelComponent={<VictoryTooltip dy={0} />}
              />
            </VictoryChart>
          )}
        </>
      )}
    </DevCard>
  );
};
