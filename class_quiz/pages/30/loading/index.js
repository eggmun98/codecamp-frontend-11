import { useQuery, gql, useApolloClient } from "@apollo/client";

const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      email
      name
    }
  }
`;

export default function LoginPage() {
  const client = useApolloClient();

  const onClickButton = async () => {
    const result = await client.query({
      query: FETCH_USER_LOGGED_IN,
    });
  };

  const { data } = useQuery(FETCH_USER_LOGGED_IN);
  console.log(data);

  return (
    <>
      <button onClick={onClickButton}>클릭하세요</button>
    </>
  );
}
