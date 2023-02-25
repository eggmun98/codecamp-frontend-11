import { gql, useApolloClient } from "@apollo/client";
import { wrapAsync } from "../../../src/commons/components/commons/libraries/asyncFunc";

const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      email
      name
    }
  }
`;

export default function LoginSuccesssPage(): JSX.Element {
  // data를 원할때 받는 방식
  // 1. 페이지 접속하면 자동으로 data에 받아지고(data는 글로벌 스테이트에 저장) 리렌더링됨
  // const { data } =
  //   useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);

  // 2. 버튼 클릭시 data에 받아지고(data는 글로벌스테이트에 저장), 리렌더링됨
  // const [나의함수, { data }] = useLazyQuery(FETCH_USER_LOGGED_IN);

  // 3. axios처럼 사용하는 방법
  // const client = useApolloClient()
  // client.query({}) === axios.get()

  // 번외 axios 버전의 그래프큐엘 이건 아폴로 세팅에 적는 칸임!! 비교해보려고 가져왔음!!
  // const graphQLClient = new GraphQLClient(
  //   "https://backend-practice.codebootcamp.co.kr/graphql"
  // ); // 지금 graphQLclinet는 axois처럼 쓸수 있는 graphql-request를 깔았기 때문에 쓸수 있는거!
  // await graphQLClient.request(RESTORE_ACCESS_TOKEN);

  const client = useApolloClient();

  const onClickButton = async (): Promise<void> => {
    const result = await client.query({
      query: FETCH_USER_LOGGED_IN,
    });
    console.log("onClickButton result:", result);
  };

  return <button onClick={wrapAsync(onClickButton)}>클릭하세요</button>;
  // return <>{data?.fetchUserLoggedIn.name}님 환영합니다!</>;
}
