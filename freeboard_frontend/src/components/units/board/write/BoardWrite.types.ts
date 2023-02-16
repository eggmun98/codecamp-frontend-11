import { ChangeEvent, MouseEvent } from "react";

interface IBoardWriteUIProps {
  data?: any;
  isEdit: boolean;
  writerCheck?: (event: ChangeEvent<HTMLInputElement>) => void;
  passwordCheck?: (event: ChangeEvent<HTMLInputElement>) => void;
  titleCheck?: (event: ChangeEvent<HTMLInputElement>) => void;
  contentCheck?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickCreateButton: (event: MouseEvent<HTMLButtonElement>) => void;
  onClickUpdateButton: (event: MouseEvent<HTMLButtonElement>) => void;
  addressShowModal: () => void;
  handleComplete: (data: any) => void;
  addressDetailCheck: (event: ChangeEvent<HTMLInputElement>) => void;
  youtubeUrlCheck: (event: ChangeEvent<HTMLInputElement>) => void;
  error1: string;
  error2: string;
  error3: string;
  error4: string;
  zipcode: string;
  isOpen: boolean;
  address: string;
}

interface IBoardWritePageProps {
  data?: any;
  isEdit: boolean;
}

interface IMyVariables {
  title?: string;
  contents?: string;
}
