import React, { useContext, useState } from "react";
import { DevCard, DevCardHeader } from "components";
import { AdminDashboardContext } from "context";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { Loading } from "./loading";

const renderBarcolor = (status: string) => {
  switch (status) {
  case "IN_DRAFT":
    return "#ffe0009e";
  case "IN_REVIEW":
    return "#e4e8ff";
  case "APPROVED":
    return "#c5ffc3";
  case "REJECTED":
    return "#ce11260d";
  case "COMPLETED":
    return "green";
  default:
    return "#2a415d";
  }
};
const style = {
  axis: {
    axis: { stroke: "#2a415d" },
    axisLabel: {
      fontSize: 10,
      fontFamily: "'Arvo', serif",
      fontWeight: 600,
      padding: 30,
    },
    ticks: { stroke: "grey", size: 5 },
    tickLabels: { fontSize: 7, fontWeight: 600, padding: 5 },
  },
  bar: {
    data: {
      fill: ({ datum }: any) => renderBarcolor(datum.status),
    },
    labels: {
      fontSize: 10,
      fontFamily: "'Arvo', serif",
      fontWeight: 600,
    },
  },
};
export const CampaignsPerStatus: React.FC = () => {
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
              domainPadding={30}
              height={300}
              animate
            >
              <VictoryAxis
                tickValues={[1, 2, 3, 4, 5]}
                tickFormat={[
                  "IN_DRAFT",
                  "IN_REVIEW",
                  "APPROVED",
                  "REJECTED",
                  "COMPLETED",
                ]}
                label="Status of the campaigns"
                style={style.axis}
              />
              <VictoryAxis
                dependentAxis
                label="Number of campaigns"
                style={style.axis}
                tickFormat={(x) => `${x}`}
              />
              <VictoryBar
                data={ctx.campaignsByStatus}
                x="index"
                y="campaigns"
                style={style.bar}
                labels={({ datum }) => datum.campaigns}
                barWidth={40}
              />
            </VictoryChart>
          )}
        </>
      )}
    </DevCard>
  );
};
