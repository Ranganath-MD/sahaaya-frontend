import React from "react";
import { IDevTableProps } from "../../../typings/table";
import { TableProvider } from "./context";
import { BasicTable } from "./table";

export const TableFromComponent: React.FC<IDevTableProps> = ({ ...props }) => {
  return (
    <TableProvider>
      <BasicTable { ...props } />
    </TableProvider>
  );
};

export * from "./table";
export * from "./tableBody";
export * from "./tablehead";
export * from "./tableRow";
export * from "./tabletoolbar";
export * from "./noRows";
export * from "./tableCell";
