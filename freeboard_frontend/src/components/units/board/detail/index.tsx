import * as D from "./BoardDetail.styles";
import { useRouter } from "next/router";
import { useMoveToPageMode } from "../../../commons/hooks/customs/useMoveToPageMode";
import { useQueryFetchBoard } from "../../../commons/hooks/queries/board/useQueryFetchBoard";
import { useBoardDeleteMode } from "../../../commons/hooks/customs/useBoardDeleteMode";
import { useBoardLikeMode } from "../../../commons/hooks/customs/useBoardLikeMode";
import { useBoardDisLikeMode } from "../../../commons/hooks/customs/useBoardDIsLikeMode";
import { onPointMode } from "../../../commons/hooks/customs/onPointMode";

export default function BoardDetailUI() {
  const router = useRouter();
  const { onClickMoveToPage } = useMoveToPageMode();
  const { onClickDeleteButton } = useBoardDeleteMode();
  const { onClickLikeButton } = useBoardLikeMode();
  const { onClickDisLikeButton } = useBoardDisLikeMode();
  const { data } = useQueryFetchBoard();
  const { onPoint, opa } = onPointMode();

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
              <D.Writer>{data?.fetchBoard.writer}</D.Writer>
              <D.Date>
                Date:
                {data?.fetchBoard.createdAt.slice(0, 10).replaceAll("-", ".")}
              </D.Date>
            </D.RightBox>
          </D.LeftWrapper>
          <D.RightWrapper>
            <D.TopWrapper id="happy" style={{ opacity: opa }}>
              <div> {data?.fetchBoard?.boardAddress?.address}</div>
              <div>{data?.fetchBoard?.boardAddress?.addressDetail} </div>
            </D.TopWrapper>
            <D.BottomWrapper>
              <D.Point1 src="/point1.png"></D.Point1>
              <D.Point2 src="/point2.png" onClick={onPoint}></D.Point2>
            </D.BottomWrapper>
          </D.RightWrapper>
        </D.WriterWrapper>
        <D.SubJectWrapper>
          <D.SubJect>{data?.fetchBoard.title}</D.SubJect>
        </D.SubJectWrapper>
        {/* <D.ImageBox src="/img1.png"></D.ImageBox>  */}
        <D.ImageWrapper>
          {data?.fetchBoard.images
            ?.filter((el) => el)
            .map((el) => (
              <D.ImageBox
                key={el}
                src={`https://storage.googleapis.com/${el}`}
              />
            ))}
        </D.ImageWrapper>
        <D.ContentsWrapper>
          <D.Contents>{data?.fetchBoard.contents}</D.Contents>
        </D.ContentsWrapper>
        <D.YoutubeWrapper>
          <D.Youtube
            url={data?.fetchBoard.youtubeUrl}
            width="486px"
            height="240px"
          ></D.Youtube>
        </D.YoutubeWrapper>
        <D.UpDownWrapper>
          <D.UpBox>
            <D.UpButton onClick={onClickLikeButton}></D.UpButton>
            <D.UpText>{data?.fetchBoard.likeCount}</D.UpText>
          </D.UpBox>
          <D.DownBox>
            <D.DownButton onClick={onClickDisLikeButton}></D.DownButton>
            <D.DownText>{data?.fetchBoard.dislikeCount}</D.DownText>
          </D.DownBox>
        </D.UpDownWrapper>
      </D.Wrapper>

      <D.MiddleWrapper>
        <D.MiddleWrapperButton onClick={onClickMoveToPage("/boards/")}>
          목록으로
        </D.MiddleWrapperButton>
        <D.MiddleWrapperButton
          onClick={onClickMoveToPage(
            "/boards/board/" + router.query.num + "/edit"
          )}
        >
          수정하기
        </D.MiddleWrapperButton>
        <D.MiddleWrapperButton onClick={onClickDeleteButton}>
          삭제하기
        </D.MiddleWrapperButton>
      </D.MiddleWrapper>
    </D.OutWrapper>
  );
}
