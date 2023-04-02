export interface Props {
  setError: React.Dispatch<React.SetStateAction<Error | null>>;
  open: boolean;
  handleClose: () => void;
  data: any;
  error: Error | null;
}
