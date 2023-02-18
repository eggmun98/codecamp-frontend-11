import { gql, useMutation } from "@apollo/client";

const LIKE_BOARD = gql`
  mutation likeBoard($boardId: ID!) {
    likeBoard(boardId: $boardId)
  }
`;

export const useMutationLikeBoard = () => {
  const result = useMutation(LIKE_BOARD);

  return result;
};
