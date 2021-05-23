import { Container, IconButton } from "@material-ui/core";
import { navigate, RouteComponentProps } from "@reach/router";
import React, { useContext, useEffect } from "react";
import "./index.scss";
import { DevButton, Seo, DeleteModal } from "components";
import { DashboardCard } from "./dashboard";
import { AuthContext, DashBoardContext } from "context";
import { Spinner } from "components/progressbar/global";
import { formatDistance } from "date-fns";
import { RiDeleteBin5Line } from "react-icons/ri";

const Campaign = ({ item }: any) => {
  const ctx = useContext(DashBoardContext);
  const handleContinue = () => {
    navigate(`campaign/${item._id}`, { replace: true });
  };
  const handleDelete = (id: string) => {
    ctx.setCampaignId(id);
    ctx.setOpenDelete(!ctx.openDelete);
  };
  return (
    <div
      className={
        item.status === "IN_DRAFT" ? "wrapper_draft" : "wrapper_review"
      }
    >
      {item.status === "IN_DRAFT" && (
        <IconButton className="deleteButton" onClick={() => handleDelete(item._id)}>
          <RiDeleteBin5Line color="red" />
        </IconButton>
      )}

      <p className="title">{item.campaignName}</p>
      <div className="created">
        Created{" "}
        {formatDistance(new Date(item.createdDate), new Date(), {
          addSuffix: true,
        })}
      </div>
      <span
        className={
          item.status === "IN_DRAFT" ? "status_draft" : "status_review"
        }
      >
        {item.status}
      </span>
      <p className="desc">{item.description}</p>
      <div>
        {item.status === "IN_DRAFT" ? (
          <DevButton background="#2A415D" color="white" onClick={handleContinue}>
            Continue
          </DevButton>
        ) : (
          <DevButton primary>Preview</DevButton>
        )}
      </div>
    </div>
  );
};

export const CampaignerDashboard: React.FC<RouteComponentProps> = () => {
  const auth = useContext(AuthContext);
  const data = useContext(DashBoardContext);

  useEffect(() => {
    data.getUserCampaigns();
  }, []);

  return (
    <>
      <Seo title="Campaigner Dashboard" />
      {data.isLoading && <Spinner />}
      <Container>
        <Container>
          <div className="heading">
            <h1 className="welcome-msg">
              Welcome, {auth.currentUser ? auth.currentUser?.username : "..."}
            </h1>
            {data.campaigns && data.campaigns.length !== 0 && (
              <div className="buttons">
                <DevButton
                  background="#2A415D"
                  color="white"
                  onClick={() => navigate("./create-campaign")}
                >
                  Create Campaign
                </DevButton>
                <DevButton bordered>Donate</DevButton>
              </div>
            )}
          </div>
          <p>Campaigns</p>
          <div className="list">
            {data.campaigns && data.campaigns.length !== 0
              ? data.campaigns.map((item: any) => {
                return <Campaign item={item} key={item._id} />;
              })
              : null}
          </div>
          {data.campaigns.length === 0 && <DashboardCard />}
          <DeleteModal
            open={data.openDelete}
            onClose={() => data.setOpenDelete(false)}
            onCancel={() => data.setOpenDelete(false)}
            onDelete={() => data.deleteCampaign(data.campaignId)}
            isDeleteLoading={data.loadingDelete}
          />
        </Container>
      </Container>
    </>
  );
};
