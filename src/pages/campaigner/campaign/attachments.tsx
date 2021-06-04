import { ExpandablePanel, CloudinaryImage } from "components";
import { Uplaod } from "components/dropzone";
import { CampaignContext } from "context";
import { AttachmentContext } from "context/user/attachmentContext";
import React, { useState, useEffect, useContext, useMemo } from "react";
import { RiAttachmentLine, RiCloseCircleFill } from "react-icons/ri";
import "./campaign.scss";

const iconStyle = {
  width: "1.1em",
  height: "1.1em",
};
export const Attchments: React.FC = () => {
  const [expand, setExpand] = useState(false);

  const ctx_c = useContext(CampaignContext);
  const ctx = useContext(AttachmentContext);
  useEffect(() => {
    if (ctx_c.activeSection === "step3") setExpand(true);
    else setExpand(false);
  }, [ctx_c.activeSection]);

  const adhaarUpload = useMemo(
    () => (
      <div>
        <div>
          <Uplaod
            title="Adhaar Card"
            required
            progress={ctx.progress}
            handleUpload={ctx.handleAdharcardupload}
          />
        </div>
        <div>
          <div className="cloudinary-images">
            {ctx.adhaarcard &&
              ctx.adhaarcard.map((item: any) => {
                return (
                  <div key={item.public_id} className="image_container">
                    <RiCloseCircleFill
                      color="#b30c0c"
                      className="icon"
                      onClick={() => ctx.deleteAdhaar(item.public_id)}
                    />
                    <CloudinaryImage publicId={item.public_id} width={100} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    ),
    [ctx.progress, ctx.adhaarcard]
  );
  const beneficiaryUpload = useMemo(
    () => (
      <div>
        <div>
          <Uplaod
            title="Beneficairy Photo"
            progress={ctx.progress_b}
            required
            handleUpload={ctx.handleBeneficiaryPhoto}
          />
        </div>
        <div>
          <div className="cloudinary-images">
            {ctx.beneficiaryPhotos &&
              ctx.beneficiaryPhotos.map((item: any) => {
                return (
                  <div key={item.public_id} className="image_container">
                    <RiCloseCircleFill
                      color="#b30c0c"
                      className="icon"
                      onClick={() => ctx.deleteBeneficiaryPhoto(item.public_id)}
                    />
                    <CloudinaryImage publicId={item.public_id} width={100} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    ),
    [ctx.progress_b, ctx.beneficiaryPhotos]
  );
  const otherAttachments = useMemo(
    () => (
      <div>
        <div>
          <Uplaod
            title="Other Attachments"
            progress={ctx.progress_0}
            handleUpload={ctx.handleOtherPhoto}
          />
        </div>
        <div>
          <div className="cloudinary-images">
            {ctx.otherPhotos &&
              ctx.otherPhotos.map((item: any) => {
                return (
                  <div key={item.public_id} className="image_container">
                    <RiCloseCircleFill
                      color="#b30c0c"
                      className="icon"
                      onClick={() => ctx.deleteOtherPhotos(item.public_id)}
                    />
                    <CloudinaryImage publicId={item.public_id} width={100} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    ),
    [ctx.progress_0, ctx.otherPhotos]
  );

  return (
    <ExpandablePanel
      headerText={"Attachments"}
      expanded={expand}
      disableSave={ctx.validateStep3()}
      disabled={!ctx_c.campaign?.step2}
      onSave={ctx.handleSaveStep3}
      onChange={() => setExpand(!expand)}
      showStatus={ctx_c.campaign?.step3}
      headerIcon={<RiAttachmentLine color="#0052CC" style={iconStyle} />}
    >
      {adhaarUpload}
      {beneficiaryUpload}
      {otherAttachments}
    </ExpandablePanel>
  );
};
