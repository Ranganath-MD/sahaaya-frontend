import { ProfileContext } from "context/user/profileContext";
import React, { createContext, useContext, useState } from "react";
import { apiService, socket } from "utils";
import { ICampaignPayload } from "../../../typings/campaign";

export const AdminDashboardContext: React.Context<any> = createContext({});

export const AdminDashboardProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
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
  const [dashboardData, setDashboardData] = React.useState<any>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [allCampaigns, setAllCampaigns] = useState([]);
  const [campaignsByStatus, setCampaignsByStatus] = useState<any>([]);
  const [campaignsByCategory, setCampaignsByCategory] = useState<any>([]);
  const [donationsByyear, setDonationsByYear] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const profile = useContext(ProfileContext);
  const statusChangedBy = {
    name: profile.user.username,
    email: profile.user.email,
    userId: profile.user.id,
  };

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
    const text = e.target.value.toLowerCase();
    const result = dashboardData?.campaigns.filter(
      (campaign: any) => campaign.campaignName.toLowerCase().indexOf(text) >= 0
    );
    setAllCampaigns(result);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const result = await apiService.get("/admin/dashboard");
      setDashboardData(result.data);
      setAllCampaigns(result.data.campaigns);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const formatCampaignsByStatus = ({
    IN_DRAFT,
    IN_REVIEW,
    APPROVED,
    REJECTED,
    COMPLETED,
  }: any) => {
    const campaign_data: any = [
      { index: 1, status: "IN_DRAFT", campaigns: IN_DRAFT },
      { index: 2, status: "IN_REVIEW", campaigns: IN_REVIEW },
      { index: 3, status: "APPROVED", campaigns: APPROVED },
      { index: 4, status: "REJECTED", campaigns: REJECTED },
      { index: 5, status: "COMPLETED", campaigns: COMPLETED },
    ];

    setCampaignsByStatus(campaign_data);
  };

  const formatCampaignsByCategory = ({
    farmers,
    talents,
    movies,
    startups,
  }: any) => {
    const data = [
      { category: "Farmers", count: farmers },
      { category: "Talents", count: talents },
      { category: "Movies", count: movies },
      { category: "Start-ups", count: startups },
    ];
    setCampaignsByCategory(data);
  };
  const formatDoationsByYear = (data: any) => {
    const values = data.map((item: any) => {
      return {
        x: item.index,
        y: item.donation,
      };
    });
    setDonationsByYear(values);
  };

  const getAnalyticsData = async () => {
    setIsLoading(true);
    try {
      const analytics = await apiService.get("/admin/analytics");
      formatCampaignsByStatus(analytics.data?.campaignsByStatus);
      formatCampaignsByCategory(analytics.data?.campaignsBycategory);
      formatDoationsByYear(analytics.data?.donation);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
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
        fetchDashboardData,
        dashboardData,
        searchText,
        handleSearch,
        allCampaigns,
        getAnalyticsData,
        campaignsByStatus,
        campaignsByCategory,
        donationsByyear,
        isLoading,
      }}
    >
      {children}
    </AdminDashboardContext.Provider>
  );
};
