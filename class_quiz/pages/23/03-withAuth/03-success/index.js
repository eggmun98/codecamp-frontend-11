import { useQuery, gql } from "@apollo/client";
import { withAuth } from "../../../../src/commons/components/commons/hocs/withAuth";

const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      email
      name
    }
  }
`;

function LoginPage() {
  const { data } = useQuery(FETCH_USER_LOGGED_IN);
  console.log(data);

  return (
    <>
      <div>{data?.fetchUserLoggedIn.name}님이 접속하였습니다!!</div>
    </>
  );
}

export default withAuth(LoginPage);
