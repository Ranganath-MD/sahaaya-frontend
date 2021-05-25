import { Container, IconButton } from "@material-ui/core";
import { navigate, RouteComponentProps } from "@reach/router";
import React, { useContext, useEffect } from "react";
import "./index.scss";
import { DevButton, Seo, DeleteModal } from "components";
import { DashboardCard } from "./dashboard";
import { AuthContext, DashBoardContext,BankContext, BeneficiaryContext, CampaignContext, AttachmentContext } from "context";
import { Spinner } from "components/progressbar/global";
import { formatDistance } from "date-fns";
import { RiDeleteBin5Line } from "react-icons/ri";
import { apiService } from "utils";
import { PreviewCampaign } from "../campaign/previewModal";

const Campaign = ({ item }: any) => {
  const ctx = useContext(DashBoardContext);
  const ctx_c = useContext(CampaignContext);
  const ctx_b = useContext(BeneficiaryContext);
  const context_d = useContext(AttachmentContext);
  const bank = useContext(BankContext);
  const handleContinue = () => {
    navigate(`campaign/${item._id}`, { replace: true });
  };
  const handleDelete = (id: string) => {
    ctx.setCampaignId(id);
    ctx.setOpenDelete(!ctx.openDelete);
  };
  const handlePreviewModal = async (id: string) => {
    ctx.setPreviewLoading(true);
    try {
      const result = await apiService.get(`campaign/${id}`);
      ctx_b.setBeneficiaryData(result.data?.beneficiary);
      ctx_c.setCampaignData(result.data);
      context_d.setDocs(result.data);
      bank.setBankDetails(result.data?.bank);
      ctx_c.setPreviewOpen(true);
      ctx.setPreviewLoading(false);
    } catch (err) {
      ctx.setPreviewLoading(false);
    }
  };
  return (
    <div
      className={
        item.status === "IN_DRAFT" ? "wrapper_draft" : "wrapper_review"
      }
    >
      {item.status === "IN_DRAFT" && (
        <IconButton
          className="deleteButton"
          onClick={() => handleDelete(item._id)}
        >
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
          <DevButton
            background="#2A415D"
            color="white"
            onClick={handleContinue}
          >
            Continue
          </DevButton>
        ) : (
          <DevButton
            primary
            onClick={() => handlePreviewModal(item._id)}
            isloading={ctx.loadingPreview}
          >
            Preview
          </DevButton>
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
      <PreviewCampaign />
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
