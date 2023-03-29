import {
  CircularProgress,
  Container,
  MenuItem,
  Popover,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import "./index.scss";
import { DevButton, Seo, DeleteModal } from "components";
import { DashboardCard } from "./dashboard";
import {
  AuthContext,
  DashBoardContext,
  BankContext,
  BeneficiaryContext,
  CampaignContext,
  AttachmentContext,
} from "context";
import { Spinner } from "components/progressbar/global";
import { formatDistance } from "date-fns";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { apiService } from "utils";
import { PreviewCampaign } from "../campaign/previewModal";
import { VscDebugStepOver, VscPreview } from "react-icons/vsc";

const Campaign = ({ item }: any) => {
  const ctx = useContext(DashBoardContext);
  const ctx_c = useContext(CampaignContext);
  const ctx_b = useContext(BeneficiaryContext);
  const context_d = useContext(AttachmentContext);
  const bank = useContext(BankContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleContinue = () => {
    handleClose();
    navigate(`campaign/${item._id}`, { replace: true });
  };
  const handleDelete = (id: string) => {
    ctx.setCampaignId(id);
    handleClose();
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
      handleClose();
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
      <div className="header-title">
        <p className="title">{item.campaignName}</p>
        {item.status === "IN_DRAFT" && (
          <BiDotsVerticalRounded
            size={16}
            className="dots"
            onClick={handleClick}
          />
        )}
        <Popover
          anchorEl={anchorEl}
          keepMounted
          onClose={handleClose}
          open={Boolean(anchorEl)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          className="popover"
        >
          {item.status === "IN_DRAFT" ? (
            <>
              <MenuItem onClick={handleContinue}>
                <VscDebugStepOver className="menu-icon" />{" "}
                <span className="card-menuitem">Continue</span>
              </MenuItem>

              <MenuItem onClick={() => handleDelete(item._id)}>
                <RiDeleteBin6Line className="menu-icon" />{" "}
                <span className="card-menuitem">Delete</span>
              </MenuItem>
            </>
          ) : item.status === "IN_REVIEW" ? (
            <MenuItem
              onClick={() => {
                handlePreviewModal(item._id);
              }}
            >
              {ctx.loadingPreview ? (
                <CircularProgress size={15} className="spinner" />
              ) : (
                <VscPreview className="menu-icon" />
              )}{" "}
              <span className="card-menuitem">Preview</span>
            </MenuItem>
          ) : null}
        </Popover>
      </div>
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
    </div>
  );
};

export const CampaignerDashboard: React.FC = () => {
  const auth = useContext(AuthContext);
  const data = useContext(DashBoardContext);
  const navigate = useNavigate();

  useEffect(() => {
    data.getUserCampaigns();
  }, []);

  return (
    <>
      <Seo title="Campaigner Dashboard" />
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
          {data.isLoading ? (
            <Spinner />
          ) : (
            <div>
              {data.campaigns && data.campaigns.length !== 0 ? (
                <div className="list">
                  {data.campaigns.map((item: any) => {
                    return <Campaign item={item} key={item._id} />;
                  })}
                </div>
              ) : (
                <DashboardCard />
              )}
            </div>
          )}

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
