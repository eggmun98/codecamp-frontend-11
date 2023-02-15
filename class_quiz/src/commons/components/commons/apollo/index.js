import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { useRecoilState } from "recoil";
import { accessToKenState } from "../stores";

const GLOBAL_STATE = new InMemoryCache();

export default function ApolloSetting(props) {
  const [accessToken] = useRecoilState(accessToKenState);
  console.log(accessToken);
  const uploadLink = createUploadLink({
    uri: "http://backend-practice.codebootcamp.co.kr/graphql",
    headers: { Authorization: `Bearer ${accessToken}` }, // 모든 api를 요청할때 마다 헤더부분에 추가한다!
  });

  const client = new ApolloClient({
    // 여기서 뉴를 하니까 페이지 이동할때마다 실행하는거! // 근데 위의 9번째 줄
    link: ApolloLink.from([uploadLink]),
    // uri: "http://backend-practice.codebootcamp.co.kr/graphql",
    cache: GLOBAL_STATE, // 이렇게 해줌으로써 페이지 이동될 때마다 그래프큐엘이 실행되는거 막아줌!!
  });
  // 그래프큐엘 셋팅

  // cache: new InMemoryCache() 임시 저장하는 캐쉬 즉 글로벌스테이트가 저장되는 곳

  // prettier-ignore
  return  (<ApolloProvider client={client}>
            {props.children}
            </ApolloProvider>
    )
}

//
