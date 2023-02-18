import { gql, useMutation } from "@apollo/client";

const CREATE_USED_ITEM = gql`
  mutation createUseditem($createUseditemInput: CreateUseditemInput!) {
    createUseditem(createUseditemInput: $createUseditemInput) {
      _id
    }
  }
`;

export const useMutationItemCreate = () => {
  const [create_used_item] = useMutation(CREATE_USED_ITEM);

  return [create_used_item];
};
