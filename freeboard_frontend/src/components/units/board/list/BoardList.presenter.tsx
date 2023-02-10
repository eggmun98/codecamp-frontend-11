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
                {props.qqq * 10 + index - 9}
                {/* 이거를 한 이유는 바로 자식인 페이지네이션콘테이너에서 페이지값을 qqq로 state 끌어오기를
                통하여 * 10을 해줘 그러면 1 *10 하면 10이고 거기에 인덱스를 0~10 중에서 더하여 
                -9를 빼면 번호가 나온다!! 이건 내가 만들었지만 이해를 못했다.. */}
                {/* 추가 설명을 하자면 qqq는 page가 1이면 1이다
              즉 페이지가 9라면 9*10을 통해서 90이라는 번호를 만드는데
              그 9페이지에서는 각 90이라는 번호가 똑같이 들어있을거다
              거기서 똑같은 번호를 방지하기 위해서
              index를 더하여 90 91 92 93 94 95 96 97 98을 해준거다 
              근데 -9를 해준 이유는  페이지는 1부터 시작한다. 그래서 이렇게 안해준다면
               1페이지에서는 페이지가 qqq인 1이고 거기서 *10을 한다면 10부터 시작을 하기 때문에
               -9을 해줘서 1페이지는 1부터 시작하게 되어 9페이지를 가면 80부터 시작하게 된다!     */}
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
            setQqq={props.setQqq} // 이거를 보내는 이유는 페이지네이션에서 페이지값을 받아와서 리스트에서 번호를 불러오기 위해서이다!
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
