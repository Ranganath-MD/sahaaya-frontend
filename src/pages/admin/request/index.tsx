import React, { useContext, useMemo } from "react";
import { RouteComponentProps, useLocation } from "@reach/router";
import { AdminLayout, Seo, StatusChangeModal } from "components";
import { AdminDashboardContext, ProfileContext } from "context";
import { CampaignsTable } from "./table";
import { RequestShow } from "./requestShow";

export const CampaignRequests: React.FC<RouteComponentProps> = () => {
  const ctx = useContext(AdminDashboardContext);
  const profile = useContext(ProfileContext);
  const location = useLocation();

  const table = useMemo(() => <CampaignsTable />, [ctx.page, ctx.rowsPerPage]);

  const approveDialog = useMemo(
    () => (
      <StatusChangeModal
        onCancel={() => ctx.setOpenApproveDialog(false)}
        onClick={(value: any) => ctx.handleApprove(value)}
        open={ctx.openApproveDialog}
        onClose={() => ctx.setOpenApproveDialog(false)}
        name={"Approve"}
        isLoading={ctx.isStatusChanging}
        loadingText={"Approving"}
        buttonText="Approve"
      />
    ),
    [ctx.openApproveDialog]
  );

  const rejectDialog = useMemo(
    () => (
      <StatusChangeModal
        onCancel={() => ctx.setOpenRejectDialog(false)}
        onClick={(value: any) => ctx.handleReject(value)}
        open={ctx.openRejectDialog}
        onClose={() => ctx.setOpenRejectDialog(false)}
        name={"Reject"}
        isLoading={ctx.isStatusChanging}
        loadingText={"Rejecting"}
        buttonText="Reject"
      />
    ),
    [ctx.openRejectDialog]
  );

  return (
    <>
      <Seo title={`${profile?.user.username} - Profile`} />
      <AdminLayout
        width={"250px"}
        headerText={profile?.user.username}
        headerSecondaryText={profile?.user.email}
        pathName={location && location.pathname}
      >
        {table}
        <RequestShow />
        {approveDialog}
        {rejectDialog}
      </AdminLayout>
    </>
  );
};
