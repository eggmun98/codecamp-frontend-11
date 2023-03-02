import { useQuery, gql, useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import type { MouseEvent } from "react";
import { wrapAsync } from "../../../src/commons/components/commons/libraries/asyncFunc";
import type {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/types";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
    }
  }
`;

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function StaticRoutingMovedPage(): JSX.Element {
  const { data } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS
  );

  const router = useRouter();
  const client = useApolloClient();

  const prefetchBoard = (boardId: string) => async () => {
    await client.query({
      query: FETCH_BOARD,
      variables: { boardId },
    });
  }; // 이 함수가 결국엔 마우스를 올리면 해당 아이디에 맞는 데이터를 패치해서 가져옴!!
  // 결국엔 미리 받아오므로써 그 페이지를 이동했을때 빨라짐!!
  // 근데 이런식으로도 빨라지기는 하는데 필요없는 것들도 받아와서 문제다
  // 그래서 로대쉬를 써서 속도를 늦춰서 받는게 좋다!
  // 즉 겟디바운싱을 하자!

  const onClickMove = (boardId: string) => () => {
    void router.push(`/section31/31-10-data-prefetch-moved/${boardId}`);
  };

  return (
    <div>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span
            style={{ margin: "10px" }}
            onMouseOver={prefetchBoard(el._id)}
            onClick={onClickMove(el._id)}
          >
            {/* 마우스를 올리면 데이터를 미리 가져옴! */}
            {el.title}
          </span>
          <span style={{ margin: "10px" }}>{el.writer}</span>
        </div>
      ))}
    </div>
  );
}
