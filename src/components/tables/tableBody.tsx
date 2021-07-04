import React from "react";
import { TableBody } from "@material-ui/core";
import { DevTableBodyProps } from "../../../typings/table";

export const DevTableBody: React.FC<DevTableBodyProps> = ({ children  }) => {

  return (
    <TableBody>
      {children}
    </TableBody>
  );
};
