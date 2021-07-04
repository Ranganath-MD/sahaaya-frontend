import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Column, DevTableHeadProps } from "../../../typings/table";

export const DevTableHead: React.FC<DevTableHeadProps> = ({ ...props }) => {
  return (
    <TableHead>
      <TableRow>
        {props.columns?.map((item: Column) => {
          return (
            <TableCell
              key={item.id}
              {...props}
              style={{ minWidth: item.minWidth, fontWeight: 600 }}
            >
              {item.label}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};
