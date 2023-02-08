// import { ImageWrapper, MainWrapper, TopWrapper } from "./Detail.styles";
import * as D from "./Detail.styles";

export default function DetailUiPage(props) {
  return (
    <>
      <D.MainWrapper>
        <D.TopWrapper>{props.data?.fetchBoard.title}</D.TopWrapper>
        <D.ImageWrapper>
          <D.Image src="/image01.png"></D.Image>
          <D.Image src="/image02.png"></D.Image>
          <D.Image src="/image03.png"></D.Image>
        </D.ImageWrapper>
        <D.Wrapper>
          <D.Profile></D.Profile>
          <D.Writer>{props.data?.fetchBoard.writer}</D.Writer>
          <D.Contents>{props.data?.fetchBoard.contents}</D.Contents>
        </D.Wrapper>
      </D.MainWrapper>
      <D.OutWrapper2>
        <D.BottomButtonA2 onClick={props.onClickListButton}>
          글목록
        </D.BottomButtonA2>
        <D.BottomButtonB2 onClick={props.onClickEditBUtton}>
          수정
        </D.BottomButtonB2>
        <D.BottomButtonB2 onClick={props.onClickDeleteButton}>
          삭제
        </D.BottomButtonB2>
      </D.OutWrapper2>
    </>
  );
}
