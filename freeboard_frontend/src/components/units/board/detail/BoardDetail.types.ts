import { ChangeEvent, MouseEvent } from "react";
import { IQuery } from "../../../commons/types/generated/types";

export interface IBoardDetailUI {
  CommentsData?: Pick<IQuery, "fetchBoardComments">;
  data?: Pick<IQuery, "fetchBoard">;
  onClickListButton: () => void;
  onClickEditBUtton: () => void;
  onClickDeleteButton: () => void;
  onClickCreateCommentsButton: () => void;
  onClickDeleteCommentsButton: (event: MouseEvent<HTMLDivElement>) => void;
  writerCheck: (event: ChangeEvent<HTMLInputElement>) => void;
  passwordCheck: (event: ChangeEvent<HTMLInputElement>) => void;
  contentsCheck: (event: ChangeEvent<HTMLInputElement>) => void;
  writer: string | number;
  password: string;
  contents: string | number;
  length: number;
  up: number;
  down: number;
  opa: number;
  onClickUp: () => void;
  onClickDown: () => void;
  onPoint: () => void;
  onClickLikeButton: () => void;
  onClickDisLikeButton: () => void;
}
