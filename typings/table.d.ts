import {
  TableBodyProps,
  TableCellProps,
  TableHeadProps,
  TablePaginationProps,
  TableProps,
  TableRowProps,
} from "@material-ui/core";

interface Column extends TableCellProps {
  id: string | number;
  label: string;
  minWidth?: number;
}

type DevTable =
  | TableProps
  | TableRowProps
  | TableHeadProps
  | TableBodyProps
  | TablePaginationProps
  | TableCellProps;
interface IDevTableProps extends DevTable {
  toolbarProps?: {
    headerText?: string;
    handleRefresh?: () => void;
    showLoading?: boolean;
  };
  paginationProps?: {
    rowsPerPageOptions: any;
    count: number;
    rowsPerPage: number;
    page: number;
    onChangePage: () => void;
    onChangeRowsPerPage: () => void;
  };
}

interface DevTableHeadProps extends DevTable {
  columns: Column[];
}
interface DevTableBodyProps extends DevTable {
  rows?: any;
}
