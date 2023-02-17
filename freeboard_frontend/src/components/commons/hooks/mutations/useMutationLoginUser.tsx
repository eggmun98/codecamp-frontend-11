import { gql, useMutation } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

export const useMutationLoginUser = () => {
  const [login_user] = useMutation(LOGIN_USER);
};
