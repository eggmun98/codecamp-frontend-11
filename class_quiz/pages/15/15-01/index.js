import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import styled from "@emotion/styled";

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

const PageButton = styled.button`
  border: none;
  background-color: white;
  :focus {
    color: blue;
  }
`;

export default function StaticRoutingMovedPage() {
  const { data, refetch } = useQuery(FETCH_BOARDS);
  //   console.log(data?.fetchBoards);

  const { data: dataCount } = useQuery(FETCH_BOARDS_COUNT);

  //   console.log(dataCount);

  const lastPage = Math.ceil((dataCount?.fetchBoardsCount ?? 10) / 10);

  const [count, setCount] = useState(1);
  // const [qqq, setQqq] = useState(false);
  // const [aaa, setAaa] = useState(false);

  const onClickPage = (event) => {
    refetch({ page: Number(event.target.id) });
  };

  const onClickPrevPage = (event) => {
    if (count === 1) return;
    setCount(count - 10);
    refetch({ page: count - 10 });
  };

  const onClickNextPage = (event) => {
    if (count + 10 <= lastPage) {
      setCount(count + 10);
      refetch({ page: count + 10 });
    }
  };

  return (
    <div>
      {data?.fetchBoards.map((el) => (
        <div>
          <span style={{ margin: "10px" }}>{el.title}</span>
          <span style={{ margin: "10px" }}>{el.writer}</span>
        </div>
      ))}
      <button onClick={onClickPrevPage} disabled={count === 1 ? true : false}>
        이전페이지
      </button>
      {new Array(10).fill(1).map(
        (_, index) =>
          index + count <= lastPage && (
            <PageButton
              key={index + count}
              id={String(index + count)}
              onClick={onClickPage}
            >
              {index + count}
            </PageButton>
          )
      )}
      <button
        onClick={onClickNextPage}
        disabled={count + 10 <= lastPage ? false : true}
      >
        다음페이지
      </button>
    </div>
  );
}
