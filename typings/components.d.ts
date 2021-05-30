/* eslint-disable no-unused-vars */
interface IButtonProps {
  // eslint-disable-next-line no-unused-vars
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  color?: string;
  primary?: boolean;
  background?: string;
  isloading?: boolean;
  disabled?: boolean;
  isShadow?: boolean;
  bordered?: boolean;
  loadingText?: string;
  submit?: boolean;
  fullWidth?: boolean;
  minHeight?: string;
  className?: string;
}

interface IButtonSpinner {
  primary?: boolean;
}
interface CardProps {
  iconComponent?: JSX.Element | null;
  title: string;
  description?: string;
  onClick?: () => void;
  backgroundSrc?: string;
}
interface Props {
  window?: () => Window;
  children: React.ReactElement;
}
interface IHeaderProps {
  links: any
}
interface DashboardCard {
  title: string;
  description: string;
  icon: string;
  navigationPath?: string;
  handleClick?: () => void;
}
interface InputProps  {
  name?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  maxlength?: number;
  label?: string;
  readOnly?: boolean;
  min?: number;
  max?: number;
  icon?: any;
  width?: string;
  errorMsg?: string;
  value?: string;
  autoFocus?: boolean;
  error?: boolean;
  onBlur?: ((_: React.FocusEvent<HTMLInputElement>) => void) | undefined;
  onChange?: ((_: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void) | undefined;
}
interface ISnackbarProps {
  open: boolean;
  handleClose: ((event: React.SyntheticEvent<any, Event>) => void) | undefined;
  message: string;
}

interface ITextFields {
  width?: number | string;
  maxLength?: number;
  placeholder?: string;
  defaultValue?: string;
  value: string;
  error?: boolean;
  requiredMessage?: string;
  textSize?: string;
  bold?: boolean;
  label?: string;
  rows?: number;
  cols?: number;
  className?: string;
  required?: boolean;
  autoFocus?: boolean;
  onChange?: ((_: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void) | undefined;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement | HTMLInputElement> | undefined;
  onMouseOver?: React.MouseEventHandler<HTMLTextAreaElement | HTMLInputElement> | undefined;
  onMouseLeave?: React.MouseEventHandler<HTMLTextAreaElement | HTMLInputElement> | undefined;
}

interface ICustomAccordian {
  // eslint-disable-next-line @typescript-eslint/ban-types
  onChange?: ((event: React.ChangeEvent<{}>, expanded: boolean) => void) | undefined;
  expanded?: boolean;
  headerText?: string;
  secondaryText?: string;
  actionMenu?: boolean;
  isSave?: boolean;
  isCancel?: boolean;
  defaultExpanded?: boolean;
  disabled?: boolean;
  error?: boolean;
  showStatus?: boolean;
  errorMsg?: string;
  actionChildren?: React.ReactChild;
  headerIcon?: React.ReactNode;
  disableSave?: boolean;
  onSave?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onCancel?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}