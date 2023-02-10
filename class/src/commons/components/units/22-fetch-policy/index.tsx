import { useQuery, gql } from "@apollo/client";
import type {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../../types/generated/types";

const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      _id
      writer
      title
      contents
    }
  }
`;

// 세션 22-1이랑 같이씀!

export default function FetchPolicyExample(): JSX.Element {
  const { data } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS,
    {
      fetchPolicy: "network-only", // 다른 컴포넌트한테 줘도 새거를 준다는 뜻 이거를 안하면 백엔드에 요청안하고 그냥 내가 쓰던거 줌!
    }
  );

  return (
    <div>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{ margin: "10px" }}>{el.title}</span>
          <span style={{ margin: "10px" }}>{el.writer}</span>
        </div>
      ))}
    </div>
  );
}
