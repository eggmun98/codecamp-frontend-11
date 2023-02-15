import { useQuery, gql } from "@apollo/client";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../src/commons/components/commons/stores";
import type { IQuery } from "../../../src/commons/types/generated/types";

const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      email
      name
    }
  }
`;

export default function LoginSuccesssPage(): JSX.Element {
  // const [accessToken] = useRecoilState(accessTokenState);
  const { data } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);

  console.log(accessToken);
  console.log(data);

  return <>{data?.fetchUserLoggedIn.name}님 환영합니다!</>;
}
