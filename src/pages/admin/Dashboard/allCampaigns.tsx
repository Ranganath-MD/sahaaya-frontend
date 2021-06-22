import React from "react";

const camps = [
  { name: "camp1" },
  { name: "camp2" },
  { name: "camp3" },
  { name: "camp4" },
  { name: "camp5" },
  { name: "camp6" },
];

export const CampaignList: React.FC = () => {
  return <div>
    {
      camps && camps.map((item: any) => {
        return (
          <div key={item.name}>{item.name}</div>
        );
      })
    }
  </div>;
};
