import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../stores";

const GLOBAL_STATE = new InMemoryCache();

interface IApolloSettingProps {
  children: JSX.Element;
}

export default function ApolloSetting(props: IApolloSettingProps): JSX.Element {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState); // [accessToken, setAccessToken] setAccessToken을 안쓰니 지움

  useEffect(() => {
    // console.log("나는 지금 브라우저이다!");
    const result = localStorage.getItem("accessToken");
    console.log(result);
    setAccessToken(result ?? "");
  }, []);

  const uploadLink = createUploadLink({
    uri: "http://backend-practice.codebootcamp.co.kr/graphql",
    headers: { Authorization: `Bearer ${accessToken}` }, // 모든 api를 요청할때 마다 헤더부분에 api를 추가하기 위해 작성!
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    // uri: "http://backend-practice.codebootcamp.co.kr/graphql",
    cache: GLOBAL_STATE, // 이렇게 해줌으로써 페이지 이동될 때마다 그래프큐엘이 실행되는거 막아줌!!
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
