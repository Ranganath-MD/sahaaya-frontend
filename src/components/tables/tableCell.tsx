import React from "react";
import TableCell from "@material-ui/core/TableCell";
import { IDevTableProps } from "../../../typings/table";

export const DevTableCell: React.FC<IDevTableProps> = ({ children }) => {
  return (
    <TableCell>
      {children}
    </TableCell>
  );
};
