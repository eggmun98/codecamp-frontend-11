import * as W from "./Writer.styles";

export default function WriterUiPage(props) {
  return (
    <>
      <W.MainWrapper>
        <W.TopWrapper>
          {props.isEdit ? "게시글 수정" : "새 글 작성"}
        </W.TopWrapper>
        <W.TitleWRapper>
          <W.TitleText>제목</W.TitleText>
          <W.Title
            type="text"
            onChange={props.titleCheck}
            defaultValue={props.data?.fetchBoard.title}
          ></W.Title>
        </W.TitleWRapper>
        <W.ContentsWrapper>
          <W.ContentsText>내용</W.ContentsText>
          <W.Contents
            type="text"
            onChange={props.contentCheck}
            defaultValue={props.data?.fetchBoard.contents}
          ></W.Contents>
        </W.ContentsWrapper>
        <W.ImageWrapper>
          <W.ImageText>이미지</W.ImageText>
          <W.Image></W.Image>
          <W.Image></W.Image>
          <W.Image></W.Image>
        </W.ImageWrapper>
        <W.WriterWrapper>
          <W.WriterText>작성자</W.WriterText>
          <W.Writer
            type="text"
            onChange={props.writerCheck}
            defaultValue={props.data?.fetchBoard.writer}
            readOnly={props.data?.fetchBoard.writer}
            style={{
              color: props.data?.fetchBoard.writer ? "#999999" : "black",
              backgroundColor: props.data?.fetchBoard.writer
                ? "#E5E5E5"
                : "white",
            }}
          ></W.Writer>
          <W.WriterText>비밀번호</W.WriterText>
          <W.Password
            type="password"
            onChange={props.passwordCheck}
          ></W.Password>
        </W.WriterWrapper>
      </W.MainWrapper>
      <W.OutWrapper>
        <W.BottomButtonA
          onClick={
            props.isEdit ? props.onClickUpdateButton : props.onClickCreateButton
          }
        >
          {props.isEdit ? "수정" : "등록"}
        </W.BottomButtonA>
        <W.BottomButtonB
          onClick={
            props.isEdit
              ? props.onClickUpdateCancellationButton
              : props.onClickWriterCancellationButton
          }
        >
          취소
        </W.BottomButtonB>
      </W.OutWrapper>
    </>
  );
}
