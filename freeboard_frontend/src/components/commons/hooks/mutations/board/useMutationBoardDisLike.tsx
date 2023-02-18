import { gql, useMutation } from "@apollo/client";

const DISLIKE_BOARD = gql`
  mutation dislikeBoard($boardId: ID!) {
    dislikeBoard(boardId: $boardId)
  }
`;

export const useMutationDisLikeBoard = () => {
  const result = useMutation(DISLIKE_BOARD);

  return result;
};
