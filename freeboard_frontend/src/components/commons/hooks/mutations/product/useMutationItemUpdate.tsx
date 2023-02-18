import { gql, useMutation } from "@apollo/client";

const UPDATE_USED_ITEM = gql`
  mutation updateUseditem(
    $updateUseditemInput: UpdateUseditemInput!
    $useditemId: ID!
  ) {
    updateUseditem(
      updateUseditemInput: $updateUseditemInput
      useditemId: $useditemId
    ) {
      _id
    }
  }
`;

export const useMutationItemUpdate = () => {
  const [update_used_item] = useMutation(UPDATE_USED_ITEM);

  return [update_used_item];
};
