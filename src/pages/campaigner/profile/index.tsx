import React, { useContext, useState } from "react";
import { RouteComponentProps } from "@reach/router";
import {
  Seo,
  UserAvatar,
  EditableInput,
  EditableTextArea,
  Phone,
  FormInput,
  DevButton,
  ReadOnlyMaskInput,
} from "components";
import { AuthContext, ProfileContext } from "context";
import { AiOutlineEdit } from "react-icons/ai";
import { Container, Grid, IconButton } from "@material-ui/core";
import styled from "styled-components";
import "./index.scss";
import { MdEdit } from "react-icons/md";

const Label = styled.span`
  color: #697384;
  font-size: 12px;
`;
export const UserProfile: React.FC<RouteComponentProps> = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const ctx = useContext(AuthContext);
  const profile = useContext(ProfileContext);

  return (
    <Container className="container">
      <Seo
        title={
          profile.user?.username
            ? `${profile.user?.username} - Profile`
            : "Profile"
        }
      />
      <div className="edit-btn">
        <DevButton
          background="#2A415D"
          color="#fff"
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? (
            "Done"
          ) : (
            <>
              <MdEdit className="edit-icon" /> Edit Profile
            </>
          )}
        </DevButton>
      </div>
      <Grid container spacing={5}>
        <Grid item xs={12} md={4}>
          <div className="avatar">
            <UserAvatar
              alt={profile.user?.username}
              onChange={profile.handleAvatar}
              src={profile.user?.avatar ? profile.user?.avatar.url : ""}
            />
            <EditableInput
              value={profile.user?.username}
              width="90%"
              textSize="1.5rem"
              bold
              onChange={(e) =>
                profile.setUser({ ...profile.user, username: e.target.value })
              }
              onBlur={profile.handleUsername}
            />
            <p className="email">{ctx.currentUser?.email}</p>
          </div>
          <div className="counts">
            <div>
              <h1>
                {ctx.currentUser?.campaigns
                  ? ctx.currentUser?.campaigns.length
                  : 0}
              </h1>
              <p>Campaigns</p>
            </div>
            <div>
              <h1>
                {ctx.currentUser?.donation
                  ? ctx.currentUser?.donation.length
                  : 0}
              </h1>
              <p>Donation</p>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={8}>
          <div className="details">
            <p className="card_header_text">Summary</p>
            <div className="hr"></div>
            <div>
              {!editMode ? (
                <p>{profile.user?.about ? profile.user?.about : "--"}</p>
              ) : (
                <EditableTextArea
                  value={profile.user?.about}
                  autoFocus
                  placeholder="Tell something about yourself"
                  className="about"
                  onChange={(e) =>
                    profile.setUser({ ...profile.user, about: e.target.value })
                  }
                  onBlur={() =>
                    profile.updateUserdetails("about", profile.user?.about)
                  }
                />
              )}
            </div>
          </div>
          <div className="details">
            <div className="edit">
              <h1>About Me</h1>
              <div>
                <IconButton onClick={() => setEditMode(!editMode)}>
                  <AiOutlineEdit />
                </IconButton>
              </div>
            </div>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                {!editMode ? (
                  <div>
                    <Label>Phone</Label>
                    <p>
                      {profile.user?.phone ? (
                        <ReadOnlyMaskInput
                          displayType={"text"}
                          value={profile.user?.phone}
                          prefix={"+91"}
                          format="+91 (###) ###-####"
                        />
                      ) : (
                        "--"
                      )}
                    </p>
                  </div>
                ) : (
                  <Phone
                    format="+91 (###) ###-####"
                    type="tel"
                    label="Phone"
                    value={profile.user?.phone}
                    onValueChange={(amount: any) => {
                      profile.setUser({ ...profile.user, phone: amount.value });
                      profile.updateUserdetails("phone", amount.value);
                    }}
                    placeholder="+91 (###) ###-####"
                  />
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                {!editMode ? (
                  <div>
                    <Label>Work</Label>
                    <p>{profile.user?.work ? profile.user?.work : "--"}</p>
                  </div>
                ) : (
                  <FormInput
                    type="text"
                    placeholder="Enter occupation"
                    label="Work"
                    // error={!!ctx_b.emailError}
                    // errorMsg={ctx_b.emailError}
                    value={profile.user?.work}
                    onChange={(e) =>
                      profile.setUser({ ...profile.user, work: e.target.value })
                    }
                    onBlur={() =>
                      profile.updateUserdetails(
                        "occupation",
                        profile.user?.work
                      )
                    }
                  />
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                {!editMode ? (
                  <div>
                    <Label>City</Label>
                    <p>{profile.user?.city ? profile.user?.city : "--"}</p>
                  </div>
                ) : (
                  <FormInput
                    type="text"
                    placeholder="Enter city"
                    label="City"
                    // error={!!ctx_b.emailError}
                    // errorMsg={ctx_b.emailError}
                    value={profile.user?.city}
                    onChange={(e) =>
                      profile.setUser({ ...profile.user, city: e.target.value })
                    }
                    onBlur={() =>
                      profile.updateUserdetails("city", profile.user?.city)
                    }
                  />
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                {!editMode ? (
                  <div>
                    <Label>State</Label>
                    <p>{profile.user?.state ? profile.user?.state : "--"}</p>
                  </div>
                ) : (
                  <FormInput
                    type="text"
                    placeholder="Enter State"
                    label="State"
                    // error={!!ctx_b.emailError}
                    // errorMsg={ctx_b.emailError}
                    value={profile.user?.state}
                    onChange={(e) =>
                      profile.setUser({
                        ...profile.user,
                        state: e.target.value,
                      })
                    }
                    onBlur={() =>
                      profile.updateUserdetails("state", profile.user?.state)
                    }
                  />
                )}
              </Grid>
            </Grid>
            {editMode && (
              <DevButton
                background="#2A415D"
                color="white"
                onClick={() => setEditMode(!editMode)}
                className="done-button"
              >
                Done
              </DevButton>
            )}
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};
