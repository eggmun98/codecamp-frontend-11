import { gql, useMutation } from "@apollo/client";

const DELETE_USED_ITEM = gql`
  mutation deleteUseditem($useditemId: ID!) {
    deleteUseditem(useditemId: $useditemId)
  }
`;

export const useMutationItemDelete = () => {
  const result = useMutation(DELETE_USED_ITEM);

  return result;
};
