import { gql, useMutation } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
    }
  }
`;

export const useMutationCreateUser = () => {
  const result = useMutation(CREATE_USER);

  return result;
};
