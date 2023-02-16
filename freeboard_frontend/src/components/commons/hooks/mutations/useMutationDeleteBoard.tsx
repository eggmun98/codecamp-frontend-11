import { gql, useMutation } from "@apollo/client";

const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

export const useMutationDeleteBoard = () => {
  const result = useMutation(DELETE_BOARD);

  return result;
};
