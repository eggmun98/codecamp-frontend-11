import { useQuery, gql } from "@apollo/client";
import type { ChangeEvent, MouseEvent } from "react";
import type {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/types";
// import { useState } from "react";
import _ from "lodash";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int, $search: String) {
    fetchBoards(page: $page, search: $search) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function StaticRoutingMovedPage(): JSX.Element {
  // const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");

  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  const onClickPage = (event: MouseEvent<HTMLSpanElement>): void => {
    void refetch({ page: Number(event.currentTarget.id) });
  };

  const getDebounce = _.debounce((value) => {
    void refetch({ search: value, page: 1 }); //  value는 매개변수
    setKeyword(value);
  }, 500); // 0.5초 이내에 추가 입력이 없을 시 마지막 1회 실행 즉 0.5초 이내에 추가 입력이 없을 시 api 요청

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    getDebounce(event.currentTarget.value); // event.currentTarget.value를 매개변수로 저 getDebounce함수에 넣으면 됨!!
  };

  return (
    <div>
      검색어입력: <input type="text" onChange={onChangeSearch}></input>
      {/* <button onClick={onClickSearch}>검색확인</button>  */}
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{ margin: "10px" }}>
            {el.title
              .replaceAll(keyword, `@#$${keyword}@#$`)
              .split("@#$")
              .map((el) => (
                <span
                  key={uuidv4()}
                  style={{ color: el === keyword ? "red" : "black" }}
                >
                  {el}
                </span>
              ))}
          </span>
          <span style={{ margin: "10px" }}>{el.writer}</span>
        </div>
      ))}
      {new Array(10).fill(1).map((_, index) => (
        <span key={index + 1} id={String(index + 1)} onClick={onClickPage}>
          {index + 1}
        </span>
      ))}
    </div>
  );
}
