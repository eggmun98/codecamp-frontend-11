// import {
//   Wrapper,
//   MainTalbe,
//   TableHead,
//   TableData,
//   WriterWrapper,
//   WriterButton,
// } from "./BoardList.styles";
import { MouseEvent } from "react";
import Paginations01 from "../../../commons/paginations01/Paginations01.container";
import { IQuery } from "../../../commons/types/generated/types";
import * as L from "./BoardList.styles";

interface IBoardListUI {
  onClickWriterButton: () => void;
  onClickListButton: (event: MouseEvent<HTMLDivElement>) => void;
  data?: Pick<IQuery, "fetchBoards">;
}

export default function BoardListUI(props) {
  return (
    <L.Wrapper>
      <L.MainTalbe>
        <thead>
          <tr>
            <L.TableHead>번호</L.TableHead>
            <L.TableHead>제목</L.TableHead>
            <L.TableHead>작성자</L.TableHead>
            <L.TableHead>날짜</L.TableHead>
          </tr>
        </thead>
        {props.data?.fetchBoards.map((el) => (
          <tbody key={el._id}>
            <tr>
              <L.TableData>1</L.TableData>
              <L.TableData id={el._id} onClick={props.onClickListButton}>
                {el.title}
              </L.TableData>
              <L.TableData>{el.writer}</L.TableData>
              <L.TableData>
                {el.createdAt.slice(0, 10).replaceAll("-", ".")}
              </L.TableData>
            </tr>
          </tbody>
        ))}
      </L.MainTalbe>
      <L.ListWrapper>
        <Paginations01
          refetch={props.refetch}
          count={props.count}
        ></Paginations01>
      </L.ListWrapper>

      <L.WriterWrapper>
        <L.WriterButton onClick={props.onClickWriterButton}>
          게시물 등록하기
        </L.WriterButton>
      </L.WriterWrapper>
    </L.Wrapper>
  );
}
