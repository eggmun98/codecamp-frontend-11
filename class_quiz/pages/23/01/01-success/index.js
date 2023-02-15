import { useQuery, gql } from "@apollo/client";
import { useRecoilState } from "recoil";
import { accessToKenState } from "../../../../src/commons/components/commons/stores";

const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      email
      name
    }
  }
`;

export default function LoginPage() {
  const [accessToken] = useRecoilState(accessToKenState);
  const { data } = useQuery(FETCH_USER_LOGGED_IN);

  return (
    <>
      <div>{data?.fetchUserLoggedIn.name}님이 접속하였습니다!!</div>
    </>
  );
}
