import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  fromPromise,
} from "@apollo/client";
import Operation from "antd/es/transfer/operation";
import { createUploadLink } from "apollo-upload-client";
import { useEffect } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { getAccessToken } from "../libraries/getAccessToken";
import { accessTokenState, restoreAccessTokenLoadable } from "../stores";
import { onError } from "@apollo/client/link/error";

const GLOBAL_STATE = new InMemoryCache();

interface IApolloSettingProps {
  children: JSX.Element;
}

export default function ApolloSetting(props: IApolloSettingProps): JSX.Element {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState); // [accessToken, setAccessToken] setAccessToken을 안쓰니 지움

  const aaa = useRecoilValueLoadable(restoreAccessTokenLoadable);

  useEffect(() => {
    // const result = localStorage.getItem("accessToken");
    // console.log(result);
    // setAccessToken(result ?? "");
    void aaa.toPromise().then((newAccessToken) => {
      console.log(newAccessToken, "apollo");
      setAccessToken(newAccessToken ?? "");
    });
  }, []);

  // operation 방금 실패한 쿼리, forward: 실패한 쿼리를 다시 재시도해주는거
  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    // 1. 에러를 캐치
    if (typeof graphQLErrors !== "undefined") {
      for (const err of graphQLErrors) {
        // 1-2 해당 에러가 토큰만료 에러인지 체크(UNAUTHENTICATED)
        if (err.extensions.code === "UNAUTHENTICATED") {
          return fromPromise(
            // 2. refreshToken으로 accessToken을 재발급 받기
            getAccessToken().then((newAccessToken) => {
              // 토큰 함수를 임포트해옴
              setAccessToken(newAccessToken ?? ""); // 새로운 어세스토큰을 넣어줌!

              // 3. 재발급 받은 accessToken으로 방금 실패한 쿼리의 정보 수정하기
              // if (typeof newAccessToken !== "string") return;
              operation.setContext({
                // 실패한 쿼리를 변경하겠다.
                headers: {
                  ...operation.getContext().headers, // 방금 실패한 쿼리의 헤더를 가져오겠다. => // Authorization: Bearer sdfjdslakjk => 만료된 토큰이 추가되어 있는 상태
                  Authorization: `Bearer ${newAccessToken}`, // 3-2 토큰만 새걸로 바꿔치기
                },
              });
            })
          ).flatMap(() => forward(operation)); // 3-3 방금 수정한 쿼리 재요청하기 // api가 다시 요청이됨
        }
      }
    }
  });

  const uploadLink = createUploadLink({
    uri: "https://backend-practice.codebootcamp.co.kr/graphql",
    headers: { Authorization: `Bearer ${accessToken}` }, // 모든 api를 요청할때 마다 헤더부분에 api를 추가하기 위해 작성!
    credentials: "include",
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink]),
    // uri: "http://backend-practice.codebootcamp.co.kr/graphql",
    cache: GLOBAL_STATE, // 이렇게 해줌으로써 페이지 이동될 때마다 그래프큐엘이 실행되는거 막아줌!!
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
