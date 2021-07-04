import { TableRow, TableRowProps } from "@material-ui/core";
import React from "react";

export const DevTableRow: React.FC<TableRowProps> = ({
  children,
  ...props
}) => {
  return <TableRow {...props}>{children}</TableRow>;
};
