import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemSecondaryAction
} from "@material-ui/core";
import { AdminDashboardContext } from "context";
import { useWindowsize } from "hooks";
import React, { useContext } from "react";
import styled from "styled-components";

const Text = styled.p`
  font-size: 1.2em;
  font-weight: bold;
  text-align: center;
  padding: 1em;
`;
const Count = styled.p`
  font-size: .7em;
  text-align: center;
  padding: .5em;
  background-color: #2a415d;
  color: white;
  border-radius: 5px;
`;

export const Campaigners: React.FC = () => {
  const ctx = useContext(AdminDashboardContext);
  const { width } = useWindowsize();
  if (
    ctx.dashboardData?.campaigners &&
    ctx.dashboardData?.campaigners.length === 0
  ) {
    return <Text>No Fundrisers yet</Text>;
  }
  return (
    <List>
      {ctx.dashboardData?.campaigners.map((item: any) => {
        return (
          <ListItem key={item._id}>
            <ListItemAvatar>
              {item.avatar?.url ? (
                <Avatar alt={item.username} src={item.avatar?.url} />
              ) : (
                <Avatar alt={item.username}>
                  {item.username && item.username.charAt(0).toUpperCase()}
                </Avatar>
              )}
            </ListItemAvatar>
            <ListItemText primary={item.username} secondary={item.email} />
            {item.campaigns?.length > 0 && width > 600 && (
              <ListItemSecondaryAction>
                <Count>{item.campaigns?.length} campaign(s)</Count>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        );
      })}
    </List>
  );
};
