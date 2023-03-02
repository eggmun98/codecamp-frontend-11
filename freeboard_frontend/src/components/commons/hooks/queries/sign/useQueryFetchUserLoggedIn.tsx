import { useQuery, gql } from "@apollo/client";

export const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      email
      name
      _id
    }
  }
`;

export const useQueryFetchUserLoggedIn = () => {
  const result = useQuery(FETCH_USER_LOGGED_IN);

  return result;
};
