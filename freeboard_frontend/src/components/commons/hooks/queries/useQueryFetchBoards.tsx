import { gql, useQuery } from "@apollo/client";
import { IQuery, IQueryFetchBoardArgs } from "../../types/generated/types";
export const FETCH_BOARDS = gql`
  query fetchBoards($page: Int, $search: String) {
    fetchBoards(page: $page, search: $search) {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;

export const useQueryFetchBoards = () => {
  const result = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardArgs>(
    FETCH_BOARDS
  );

  return result;
};
