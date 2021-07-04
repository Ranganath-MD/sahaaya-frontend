import { ProfileContext } from "context/user/profileContext";
import React, { createContext, useContext, useState } from "react";
import { apiService, socket } from "utils";

export const AdminDashboardContext: React.Context<any> = createContext({});

export const AdminDashboardProvider: React.FC = ({ children }) => {
  const [openSideBar, setOpenSideBar] = useState<boolean>(true);
  const [campaignsForReview, setCampaignsForReview] = useState([]);
  const [isTableDataLoading, setLoading] = useState<boolean>(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [campaignId, setCampaignId] = useState("");
  const [previewOpen, setOpenPreview] = useState<boolean>(false);
  const [openApproveDialog, setOpenApproveDialog] = useState<boolean>(false);
  const [openRejectDialog, setOpenRejectDialog] = useState<boolean>(false);
  const [isStatusChanging, setStatusChanging] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const profile = useContext(ProfileContext);
  const statusChangedBy = {
    name: profile.user.username,
    email: profile.user.email,
    userId: profile.user.id,
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const fetchCampaignsUnderReview = async () => {
    setLoading(true);
    try {
      const campaigns = await apiService.get("/admin/campaigns-under-review", {
        sortBy: "_id",
        direction: "desc",
        page: page,
        perPage: rowsPerPage,
      });
      setCampaignsForReview(campaigns.data);
      setCount(campaigns.data.total);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenApproveDialog = () => {
    setOpenApproveDialog(true);
    setAnchorEl(null);
  };
  const handleOpenRejectDialog = () => {
    setOpenRejectDialog(true);
    setAnchorEl(null);
  };

  const updateCampaignDetails = (
    campaignId: string,
    campaignKey: string,
    value: any
  ) => {
    if (!campaignId) return null;
    const cmp: ICampaignPayload = {
      campaignId,
      campaignKey,
      value,
    };
    socket.emit("update-campaign", cmp);
    socket.on("campaign", (data) => {
      setSelectedCampaign(data);
    });
  };
  const handleApprove = () => {
    if (campaignId === "") return null;
    updateCampaignDetails(campaignId, "status", "APPROVED");
    updateCampaignDetails(campaignId, "statusChangedBy", statusChangedBy);
    setOpenApproveDialog(false);
  };
  const handleReject = (value: any) => {
    if (campaignId === "") return null;
    updateCampaignDetails(campaignId, "status", "REJECTED");
    updateCampaignDetails(campaignId, "rejected_reason", value.inputText);
    updateCampaignDetails(campaignId, "statusChangedBy", statusChangedBy);
    setOpenRejectDialog(false);
  };

  return (
    <AdminDashboardContext.Provider
      value={{
        openSideBar,
        setOpenSideBar,
        campaignsForReview,
        fetchCampaignsUnderReview,
        isTableDataLoading,
        rowsPerPage,
        page,
        count,
        handleChangePage,
        handleChangeRowsPerPage,
        selectedCampaign,
        setSelectedCampaign,
        previewOpen,
        setOpenPreview,
        openApproveDialog,
        setOpenApproveDialog,
        openRejectDialog,
        setOpenRejectDialog,
        isStatusChanging,
        setStatusChanging,
        handleOpenApproveDialog,
        handleOpenRejectDialog,
        handleClick,
        handleClose,
        anchorEl,
        handleApprove,
        handleReject,
        campaignId,
        setCampaignId,
      }}
    >
      {children}
    </AdminDashboardContext.Provider>
  );
};
