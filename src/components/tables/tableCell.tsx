import React from "react";
import { TableCell, Tooltip } from "@material-ui/core";
import { IDevTableProps } from "../../../typings/table";
import { withStyles, Theme } from "@material-ui/core/styles";
import styled from "styled-components";

const LightTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: "#2a415d",
    color: "#fff",
    boxShadow: theme.shadows[1],
    fontSize: 11,
    margin: -20,
    maxWidth:200
  },
}))(Tooltip);

const Value = styled.p`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const DevTableCell: React.FC<IDevTableProps> = ({ children }) => {
  return (
    <LightTooltip arrow title={children as string || ""}>
      <TableCell>
        <Value>
          {children}
        </Value>
      </TableCell>
    </LightTooltip>
  );
};
