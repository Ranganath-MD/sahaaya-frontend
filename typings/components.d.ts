/* eslint-disable no-unused-vars */
interface IButtonProps {
  // eslint-disable-next-line no-unused-vars
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  color?: string;
  primary?: boolean;
  background?: string;
  loading?: boolean;
  disabled?: boolean;
  isShadow?: boolean;
  bordered?: boolean;
  loadingText?: Text;
  submit?: boolean;
  fullWidth?: boolean;
  minHeight?: string;
}

interface IButtonSpinner {
  primary?: boolean;
}
interface CardProps {
  iconComponent: JSX.Element | null;
  title: string;
  description: string;
}
interface Props {
  window?: () => Window;
  children: React.ReactElement;
}
interface InputProps  {
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
  maxlength?: number;
  label?: string;
  icon?: any;
  width?: string;
  errorMsg?: string;
  value?: string;
  autoFocus?: boolean;
  error?: boolean;
  onBlur?: ((_: React.FocusEvent<HTMLInputElement>) => void) | undefined;
  onChange?: ((_: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void) | undefined;
}