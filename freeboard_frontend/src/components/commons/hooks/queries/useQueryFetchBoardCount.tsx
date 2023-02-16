import { gql, useQuery } from "@apollo/client";

const FETCH_BOARD_COUNT = gql`
  query {
    fetchBoardsCount
  }
`;

export const useQueryFetchBoarCount = () => {
  const result = useQuery(FETCH_BOARD_COUNT);
  return result;
};
