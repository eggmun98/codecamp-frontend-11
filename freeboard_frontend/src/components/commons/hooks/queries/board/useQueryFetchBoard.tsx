import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
export const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      dislikeCount
      boardAddress {
        zipcode
        address
        addressDetail
      }
      images
      createdAt
    }
  }
`;
export const useQueryFetchBoard = () => {
  const router = useRouter();
  const result = useQuery(FETCH_BOARD, {
    variables: {
      boardId: router.query.num,
    },
  });
  return result;
};
