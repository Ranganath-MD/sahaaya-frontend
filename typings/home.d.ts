interface IFormInput {
  username?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}
interface IStepProps {
  renderImage: () => string | undefined;
  step?: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}
interface IPanelProps {
  id: string;
  step: number;
  title: string;
  panel: string;
  description: string;
}

interface IStepProps {
  renderImage: () => string | undefined;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}
interface ISeoProps {
  title: string | undefined;
  description?: string;
}