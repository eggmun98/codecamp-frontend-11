import { ChangeEvent, MouseEvent } from "react";
import { IQuery } from "../../../commons/types/generated/types";
import { FETCH_BOARD } from "./BoardDetail.queries";
import * as D from "./BoardDetail.styles";
import { Rate } from "antd";
import { Button, Modal } from "antd";
import InfiniteScroll from "react-infinite-scroller";

interface IBoardDetailUI {
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
}

export default function BoardDetailUI(props) {
  return (
    <D.OutWrapper>
      <D.Wrapper>
        <D.WriterWrapper>
          <D.LeftWrapper>
            <D.LeftBox>
              <D.Profile
                src="/profile.png
              "
              ></D.Profile>
            </D.LeftBox>

            <D.RightBox>
              <D.Writer>
                {props.data?.fetchBoard.writer}
                {/* {props.CommentsData?.fetchBoardComments[0]?.writer} */}
              </D.Writer>
              <D.Date>
                Date:
                {props.data?.fetchBoard.createdAt
                  .slice(0, 10)
                  .replaceAll("-", ".")}
              </D.Date>
            </D.RightBox>
          </D.LeftWrapper>
          <D.RightWrapper>
            <D.TopWrapper id="happy" style={{ opacity: props.opa }}>
              <div> {props.data?.fetchBoard?.boardAddress?.address}</div>
              <div>{props.data?.fetchBoard?.boardAddress?.addressDetail} </div>
            </D.TopWrapper>
            <D.BottomWrapper>
              <D.Point1 src="/point1.png"></D.Point1>
              <D.Point2 src="/point2.png" onClick={props.onPoint}></D.Point2>
            </D.BottomWrapper>
          </D.RightWrapper>
        </D.WriterWrapper>
        <D.SubJectWrapper>
          <D.SubJect>{props.data?.fetchBoard.title}</D.SubJect>
        </D.SubJectWrapper>
        <D.ImageWrapper>
          <D.ImageBox src="/img1.png"></D.ImageBox>
        </D.ImageWrapper>
        <D.ContentsWrapper>
          <D.Contents>{props.data?.fetchBoard.contents}</D.Contents>
        </D.ContentsWrapper>
        <D.YoutubeWrapper>
          <D.Youtube
            url={props.data?.fetchBoard.youtubeUrl}
            width="486px"
            height="240px"
          ></D.Youtube>
        </D.YoutubeWrapper>
        <D.UpDownWrapper>
          <D.UpBox>
            <D.UpButton onClick={props.onClickLikeButton}></D.UpButton>
            <D.UpText>{props.data?.fetchBoard.likeCount}</D.UpText>
          </D.UpBox>
          <D.DownBox>
            <D.DownButton onClick={props.onClickDisLikeButton}></D.DownButton>
            <D.DownText>{props.data?.fetchBoard.dislikeCount}</D.DownText>
          </D.DownBox>
        </D.UpDownWrapper>
      </D.Wrapper>

      <D.MiddleWrapper>
        <D.MiddleWrapperButton onClick={props.onClickListButton}>
          목록으로
        </D.MiddleWrapperButton>
        <D.MiddleWrapperButton onClick={props.onClickEditBUtton}>
          수정하기
        </D.MiddleWrapperButton>
        <D.MiddleWrapperButton onClick={props.onClickDeleteButton}>
          삭제하기
        </D.MiddleWrapperButton>
      </D.MiddleWrapper>
    </D.OutWrapper>
  );
}
