import { RouteComponentProps } from "@reach/router";
import React, { useEffect, useState } from "react";
import { Seo } from "../../components/layout/Seo";
import { io } from "socket.io-client";
const socket = io("http://localhost:8080");

export const CampaignerDashboard: React.FC<RouteComponentProps> = () => {
  const [state, setstate] = useState("");

  useEffect(() => {
    socket.on("desc-be", (data) => {
      console.log(data);
    });
  }, []);

  const handleChange = (e: any) => {
    setstate(e.target.value);
    socket.emit("desc", e.target.value);
  };

  return (
    <>
      <Seo title="Campaigner Dashboard"/>
      <h1>Campaigner Dashboard</h1>
      <textarea
        placeholder= "text"
        value={state}
        name="state"
        onChange={handleChange}
      />
    </>
  );
};
