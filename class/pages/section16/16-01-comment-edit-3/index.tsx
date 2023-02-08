import { useQuery, gql } from "@apollo/client";
import CommentItem from "../../../src/commons/components/units/16-comment-item/idnex";
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
      contents
    }
  }
`;

export default function StaticRoutingMovedPage(): JSX.Element {
  const { data } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS
  );

  return (
    <div>
      {data?.fetchBoards.map((el) => (
        <CommentItem key={el._id} el={el}></CommentItem>
      ))}
    </div>
  );
}
