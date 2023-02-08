import { ChangeEvent, MouseEvent } from "react";
import { IQuery } from "../../commons/types/generated/types";
import * as D from "./BoardComment.styles";
import { Rate } from "antd";
import { Button, Modal } from "antd";
import InfiniteScroll from "react-infinite-scroller";
import { Elsie_Swash_Caps } from "@next/font/google";

export default function BoardCommentUI(props) {
  return (
    <D.CommentWrapper>
      <D.CommentTopWrapper>
        <D.CommentTitleBox>
          <D.CommentTitleImg src="/contentimg.png"></D.CommentTitleImg>
          <D.CommentTitle>댓글</D.CommentTitle>
        </D.CommentTitleBox>
        <D.CommentWriterBox>
          <D.CommentWriter
            placeholder="작성자"
            onChange={props.writerCheck}
            value={props.writer}
          ></D.CommentWriter>
          <D.CommentPassword
            placeholder="비밀번호"
            onChange={props.passwordCheck}
            value={props.password}
          ></D.CommentPassword>
          <Rate onChange={props.onStarCheck} value={props.rating}></Rate>
        </D.CommentWriterBox>
        <D.CommentContentBox>
          <D.CommentContent
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
            onChange={props.contentsCheck}
            value={props.contents}
            maxLength={100}
          ></D.CommentContent>
          <D.CommentContentButtonBox>
            <D.CommentContentWriterNumber>
              <D.NumberText>{props.length}</D.NumberText>
              <D.NumberText>/100</D.NumberText>
            </D.CommentContentWriterNumber>
            <D.CommentContentButton onClick={props.onClickCreateCommentsButton}>
              등록하기
            </D.CommentContentButton>
          </D.CommentContentButtonBox>
        </D.CommentContentBox>
      </D.CommentTopWrapper>

      <Modal
        title="비밀번호 입력하세요."
        open={props.isOpen}
        onOk={props.onClickDeleteCommentsButton}
        onCancel={props.passwordShowModal}
      >
        <input
          type="password"
          onChange={props.onPasswordCheck}
          value={props.dePassword}
        ></input>
      </Modal>

      <InfiniteScroll pageStart={0} loadMore={props.onLoadMore} hasMore={true}>
        {props.CommentsData?.fetchBoardComments.map((el, index) =>
          index !== props.myIndex ? (
            <D.ListWrapper key={el._id}>
              <D.ListProfileWrapper>
                <D.ListProfile src="/ProfileImg.png"></D.ListProfile>
              </D.ListProfileWrapper>
              <D.ListRightWrapper>
                <D.ListWriterWrapper>
                  <D.ListWriter>{el.writer}</D.ListWriter>
                  <D.ListStar value={el.rating}></D.ListStar>
                  <div>
                    <D.ListUpdateButton
                      id={String(index)}
                      onClick={props.onClickUpdateCommentsWindowButton}
                    ></D.ListUpdateButton>
                    <D.ListDeleteButton
                      id={el._id}
                      onClick={props.passwordShowModal}
                    ></D.ListDeleteButton>
                  </div>
                </D.ListWriterWrapper>
                <D.ListContent>{el.contents}</D.ListContent>
                <D.ListDate>
                  {el.createdAt.slice(0, 10).replaceAll("-", ".")}
                </D.ListDate>
              </D.ListRightWrapper>
            </D.ListWrapper>
          ) : (
            <D.CommentTopWrapper>
              <D.CommentTitleBox>
                <D.CommentTitleImg src="/contentimg.png"></D.CommentTitleImg>
                <D.CommentTitle>댓글 수정</D.CommentTitle>
              </D.CommentTitleBox>
              <D.CommentWriterBox>
                <D.CommentWriter
                  defaultValue={el.writer}
                  readOnly={el.writer}
                ></D.CommentWriter>
                <D.CommentPassword
                  placeholder="비밀번호"
                  id={el._id}
                  type="text"
                  onChange={props.upPasswordCheck}
                ></D.CommentPassword>
                <Rate
                  onChange={props.setUpRating}
                  // value={props.upRating}
                  defaultValue={el.rating}
                ></Rate>
              </D.CommentWriterBox>
              <D.CommentContentBox>
                <D.CommentContent
                  placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
                  type="text"
                  onChange={props.upContentsCheck}
                  maxLength={100}
                  defaultValue={el.contents}
                ></D.CommentContent>
                <D.CommentContentButtonBox>
                  <D.CommentContentWriterNumber>
                    <D.NumberText defaultValue={props.upLength}>
                      {props.upLengthBoolean
                        ? props.upLength
                        : el.contents.length}
                    </D.NumberText>
                    <D.NumberText>/100</D.NumberText>
                  </D.CommentContentWriterNumber>
                  <D.CommentContentButton
                    id={el._id}
                    onClick={props.onClickUpdateCommentsButton}
                  >
                    수정하기
                  </D.CommentContentButton>
                </D.CommentContentButtonBox>
              </D.CommentContentBox>
            </D.CommentTopWrapper>
          )
        ) ?? <div></div>}
      </InfiniteScroll>
    </D.CommentWrapper>
  );
}
