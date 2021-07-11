import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import { TableToolbar } from "./tabletoolbar";
import { TableContext } from "./context";
import { IDevTableProps } from "../../../typings/table";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export const BasicTable: React.FC<IDevTableProps> = ({
  children,
  ...props
}) => {
  const context = useContext(TableContext);
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <TableToolbar
        headerText={props.toolbarProps?.headerText}
        handleRefresh={props.toolbarProps?.handleRefresh}
        showLoading={props.toolbarProps?.showLoading}
        noRefresh={props.toolbarProps?.noRefresh}
      />
      <TableContainer className={classes.container}>
        <Table
          stickyHeader
          aria-label="sticky table"
          size={context.dense ? "small" : "medium"}
        >
          {children}
        </Table>
      </TableContainer>
    </Paper>
  );
};
