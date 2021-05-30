import React, { useContext } from "react";
import {
  Avatar,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  ListItem,
  Typography,
} from "@material-ui/core";
import { DevButton } from "../../button";
import { Link } from "@reach/router";
import { AuthContext, ProfileContext } from "../../../context";
import { VscAccount } from "react-icons/vsc";

export const RightMenu: React.FC = () => {
  const context = useContext(AuthContext);
  const profile = useContext(ProfileContext);

  return (
    <>
      {context.isAuthenticated ? (
        <>
          <Avatar
            alt="user profile"
            onClick={(event) => context.setAnchorEl(event.currentTarget)}
            className="profile-menu"
            src={profile.user?.avatar ? profile.user?.avatar.url : ""}
          >
            {profile.user && profile.user?.username?.charAt(0).toUpperCase()}
          </Avatar>
          <Popover
            anchorEl={context.anchorEl}
            keepMounted
            open={Boolean(context.anchorEl)}
            onClose={() => context.setAnchorEl(null)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <ListItem alignItems="flex-start">
              <ListItemText
                className="user-name"
                primary={profile.user?.username}
                secondary={
                  <Typography
                    component="span"
                    className="user-role"
                    variant="body2"
                    color="textPrimary"
                  >
                    {context.currentUser?.type === "Admin" ? context.currentUser.role : context.currentUser?.email}
                  </Typography>
                }
              />
            </ListItem>
            <MenuItem onClick={context.openProfile}>
              <ListItemIcon className="menu_list_item">
                <VscAccount />
              </ListItemIcon>
              <ListItemText className="menu_item_text" primary="My Account" />
            </MenuItem>
            <MenuItem>
              <DevButton
                primary
                isloading={context.isLoading ? true : false}
                loadingText={""}
                onClick={() => context.logout()}
                fullWidth
              >
                Logout
              </DevButton>
            </MenuItem>
          </Popover>
        </>
      ) : (
        <>
          <Link to="/login">
            <DevButton isShadow={false}>Sign in</DevButton>
          </Link>
          <Link to="/register">
            <DevButton isShadow={false} bordered>
              Sign Up
            </DevButton>
          </Link>
        </>
      )}
    </>
  );
};
