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
import { v4 as uuidv4 } from "uuid";

interface IBoardListUI {
  onClickWriterButton: () => void;
  onClickListButton: (event: MouseEvent<HTMLDivElement>) => void;
  data?: Pick<IQuery, "fetchBoards">;
}

export default function BoardListUI(props) {
  const getDot = (str: string) => {
    return str.length <= 8 ? str : `${str.slice(0, 8)}...`;
  }; // 일정 글자 수 넘어가면 ...으로 보이게 하는거임!!
  return (
    <L.Wrapper>
      <L.MainTalbe>
        <thead>
          <tr>
            <L.TableHead
              style={{ width: "10%", textAlign: "start", paddingLeft: "50px" }}
            >
              번호
            </L.TableHead>
            <L.TableHead style={{ width: "60%", textAlign: "start" }}>
              제목
            </L.TableHead>
            <L.TableHead style={{ width: "10%", textAlign: "start" }}>
              작성자
            </L.TableHead>
            <L.TableHead style={{ width: "20%", textAlign: "start" }}>
              날짜
            </L.TableHead>
          </tr>
        </thead>
        {props.data?.fetchBoards.map((el, index) => (
          <tbody key={index}>
            <tr>
              <L.TableData style={{ textAlign: "start", paddingLeft: "50px" }}>
                {index}
              </L.TableData>
              <L.TableData
                style={{ textAlign: "start" }}
                id={el._id}
                onClick={props.onClickListButton}
              >
                {el.title
                  .replaceAll(props.keyword, `@#$${props.keyword}@#$`)
                  .split("@#$")
                  .map((el) => (
                    <span
                      key={uuidv4()}
                      style={{
                        color: el === props.keyword ? "#8f3636" : "white",
                      }}
                    >
                      {el}
                    </span>
                  ))}
              </L.TableData>
              <L.TableData style={{ textAlign: "start" }}>
                {getDot(el.writer)}
              </L.TableData>
              <L.TableData style={{ textAlign: "start" }}>
                {el.createdAt.slice(0, 10).replaceAll("-", ".")}
              </L.TableData>
            </tr>
          </tbody>
        ))}
      </L.MainTalbe>
      <div style={{ width: "100%", display: "row", justifyContent: "row" }}>
        <L.ListWrapper>
          <Paginations01
            refetch={props.refetch}
            count={props.count}
            // setMyindex={props.setMyindex}
          ></Paginations01>
          {/* <L.WriterButton onClick={props.onClickWriterButton}>
            게시물 등록하기
          </L.WriterButton> */}
          <input
            type="text"
            onChange={props.onChangeSearchButton}
            style={{ outlineColor: "#8f3636" }}
          ></input>
        </L.ListWrapper>
        {/* 
        <L.WriterWrapper>
          <L.WriterButton onClick={props.onClickWriterButton}>
            게시물 등록하기
          </L.WriterButton>
        </L.WriterWrapper> */}
      </div>
    </L.Wrapper>
  );
}
