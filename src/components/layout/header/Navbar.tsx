import React, { useContext } from "react";
import { Toolbar, Avatar, ListItemIcon, ListItemText, MenuItem, Popover, ListItem, Typography } from "@material-ui/core";
import { DevButton } from "../../button";
import { Link, LinkGetProps } from "@reach/router";
import Logo from "../../../assets/logo.svg";
import { AuthContext } from "../../../context";
import { VscAccount } from "react-icons/vsc";

export const NavBar: React.FC = () => {
  const context = useContext(AuthContext);
  const isActive = ({ isCurrent }: LinkGetProps) => {
    return isCurrent
      ? { className: "active-link" }
      : { className: "inactive-link" };
  };

  const LinksBasedOnRoles = () => {
    let Links = [
      { name: "Browse Campaign", path: "browse-campaign" },
      { name: "How it Works", path: "how-sahaaya-works" },
      { name: "Start Campaign", path: "start-campaign" },
    ];
    if (context.isAuthenticated && context.isAdmin()) {
      Links = [
        { name: "Dashboard", path: "admin/dashboard" }
      ];
    }

    if (context.isAuthenticated && !context.isAdmin()) {
      Links.unshift({ name: "Dashboard", path: "/dashboard" });
    }

    return Links;
  };

  return (
    <Toolbar>
      <Link to="/">
        <img src={Logo} width="35px" height="auto" />
      </Link>
      <Toolbar>
        {LinksBasedOnRoles().map((link, i) => {
          return (
            <div key={i} className="nav-item">
              <Link to={link.path} getProps={isActive}>
                {link.name}
              </Link>
            </div>
          );
        })}
      </Toolbar>
      <div style={{ flexGrow: 1 }} />
      {
        context.isAuthenticated ? (
          <>
            <Avatar
              alt="user profile"
              onClick={(event) => context.setAnchorEl(event.currentTarget)}
              className="profile-menu"
            >
              {context.currentUser && context.currentUser.username.charAt(0)}
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
                  primary={context.currentUser && context.currentUser.username}
                  secondary={
                    <Typography
                      component="span"
                      className="user-role"
                      variant="body2"
                      color="textPrimary"
                    >
                      {context.currentUser && context.currentUser.role}
                    </Typography>
                  }
                />
              </ListItem>
              <MenuItem onClick={() => context.setAnchorEl(null)}>
                <ListItemIcon className="menu_list_item">
                  <VscAccount />
                </ListItemIcon>
                <ListItemText className="menu_item_text" primary="My Account" />
              </MenuItem>
              <MenuItem>
                <DevButton
                  primary
                  onClick={() => context.logout()}
                  fullWidth
                >Logout</DevButton>
              </MenuItem>
            </Popover>
          </>
        ) : <>
          <Link to="/login">
            <DevButton isShadow={false}>Sign in</DevButton>
          </Link>
          <Link to="/register">
            <DevButton primary isShadow={false}>
              Sign Up
            </DevButton>
          </Link>
        </>
      }

    </Toolbar>
  );
};
