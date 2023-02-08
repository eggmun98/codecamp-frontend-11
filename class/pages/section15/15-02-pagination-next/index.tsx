import { useQuery, gql } from "@apollo/client";
import type { MouseEvent } from "react";
import { useState } from "react";
import type {
  IQuery,
  IQueryFetchBoardsArgs,
  IQueryFetchBoardsCountArgs,
} from "../../../src/commons/types/generated/types";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      contents
    }
  }
`;

const FETCH_BOARDS_COUNT = gql`
  query {
    fetchBoardsCount
  }
`;
// 전체 게시글 수는 패치보더카운터

export default function StaticRoutingMovedPage(): JSX.Element {
  const [count, setCount] = useState(1);

  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  const { data: dataBoardsCount } = useQuery<
    Pick<IQuery, "fetchBoardsCount">,
    IQueryFetchBoardsCountArgs
  >(FETCH_BOARDS_COUNT);

  const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10); // 값을 받아 오려면 시간이 걸리는데 어떻게 나누냐 그래서 오류
  // ?? 10을 한 이유는 만약 값을 안받아 왔으면 그냥 1페이지를 보여 달라 즉 10/ 10은 1페이지니까 매스셀 해준 이유는 올림해야 하기 때문에
  // 왜? 15페이지가 최대 페이지일 경우 15/ 10 해서 1.5가 나오니 1.5는 올림해서 2하면 2페이지가 된다.
  // 즉 왼쪽이 있으면 왼쪽 꺼로 10 나누고 그게 없으면 오른쪽 꺼로 10을 나눈다

  console.log(lastPage);

  const onClickPage = (event: MouseEvent<HTMLSpanElement>): void => {
    void refetch({ page: Number(event.currentTarget.id) });
  };

  const onClickPrevPage = (): void => {
    if (count === 1) return;
    setCount(count - 10);
    void refetch({ page: count - 10 });
  };

  const onClickNextPage = (): void => {
    if (count + 10 <= lastPage) {
      setCount(count + 10);
      void refetch({ page: count + 10 });
    }
  };

  return (
    <div>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{ margin: "10px" }}>{el.title}</span>
          <span style={{ margin: "10px" }}>{el.writer}</span>
        </div>
      ))}
      <span onClick={onClickPrevPage}>이전페이지</span>
      {new Array(10).fill(1).map(
        (_, index) =>
          index + count <= lastPage && ( // && 이거는 저 조건에 맞을때만 오른쪽 span태그들 보여줘 뜻임
            <span
              key={index + count}
              id={String(index + count)}
              onClick={onClickPage}
              style={{ margin: "5px" }}
            >
              {index + count}
            </span>
          )
      )}
      <span onClick={onClickNextPage}>다음페이지</span>
    </div>
  );
}
