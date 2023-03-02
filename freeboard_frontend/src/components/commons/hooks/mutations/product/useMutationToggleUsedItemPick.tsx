import { useMutation, gql } from "@apollo/client";

const TOGGLE_USED_ITEM_PICK = gql`
  mutation toggleUseditemPick($useditemId: ID!) {
    toggleUseditemPick(useditemId: $useditemId)
  }
`;

export const useMutationToggleUsedItemPick = () => {
  const [toggle_used_item_pick] = useMutation(TOGGLE_USED_ITEM_PICK);

  return [toggle_used_item_pick];
};
