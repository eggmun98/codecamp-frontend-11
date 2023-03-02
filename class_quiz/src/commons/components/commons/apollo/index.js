import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  fromPromise,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { useEffect } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { accessToKenState, restoreAccessTokenLoadable } from "../stores";
import { onError } from "@apollo/client/link/error";
import { getAccessToken } from "../libraries/getAccessToken";

const GLOBAL_STATE = new InMemoryCache();

export default function ApolloSetting(props) {
  const [accessToken, setAccessToken] = useRecoilState(accessToKenState); // [accessToken, setAccessToken] setAccessToken을 안쓰니 지움

  const aaa = useRecoilValueLoadable(restoreAccessTokenLoadable);

  useEffect(() => {
    void aaa.toPromise().then((newAccessToken) => {
      setAccessToken(newAccessToken ?? "");
    });
  }, []);

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (typeof graphQLErrors !== "undefined") {
      for (const err of graphQLErrors) {
        if (err.extensions.code === "UNAUTHENTICATED") {
          return fromPromise(
            getAccessToken().then((newAccessToken) => {
              setAccessToken(newAccessToken ?? "");

              operation.setContext({
                headers: {
                  ...operation.getContext().headers,
                  Authorization: `Bearer ${newAccessToken}`,
                },
              });
            })
          ).flatMap(() => forward(operation));
        }
      }
    }
  });

  const uploadLink = createUploadLink({
    uri: "https://backend-practice.codebootcamp.co.kr/graphql",

    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: "include",
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink]),

    cache: GLOBAL_STATE,
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}

//

//

//

//

//

//

//
// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   ApolloLink,
//   fromPromise,
// } from "@apollo/client";
// import { createUploadLink } from "apollo-upload-client";
// import { useRecoilState } from "recoil";
// import { onError } from "@apollo/client/link/error";

// import { accessToKenState } from "../stores";
// import { getAccessToken } from "../libraries/getAccessToken";

// const GLOBAL_STATE = new InMemoryCache();

// export default function ApolloSetting(props) {
//   const [accessToken, setAccessToken] = useRecoilState(accessToKenState);

//   const errorLink = onError(({ graphQLErrors, operation, forward }) => {
//     if (typeof graphQLErrors !== "undefined") {
//       for (const err of graphQLErrors) {
//         if (err.extensions.code === "UNAUTHENTICATED") {
//           return fromPromise(
//             getAccessToken().then((newAccessToken) => {
//               setAccessToken(newAccessToken ?? "");

//               operation.setContext({
//                 headers: {
//                   ...operation.getContext().headers,
//                   Authorization: `Bearer ${newAccessToken}`,
//                 },
//               });
//             })
//           ).flatMap(() => forward(operation));
//         }
//       }
//     }
//   });

//   const uploadLink = createUploadLink({
//     uri: "https://backend-practice.codebootcamp.co.kr/graphql",
//     headers: { Authorization: `Bearer ${accessToken}` }, // 모든 api를 요청할때 마다 헤더부분에 추가한다!
//     credentials: "include",
//   });

//   const client = new ApolloClient({
//     // 여기서 뉴를 하니까 페이지 이동할때마다 실행하는거! // 근데 위의 9번째 줄
//     link: ApolloLink.from([uploadLink]),
//     // uri: "http://backend-practice.codebootcamp.co.kr/graphql",
//     cache: GLOBAL_STATE, // 이렇게 해줌으로써 페이지 이동될 때마다 그래프큐엘이 실행되는거 막아줌!!
//   });
//   // 그래프큐엘 셋팅

//   // cache: new InMemoryCache() 임시 저장하는 캐쉬 즉 글로벌스테이트가 저장되는 곳

//   // prettier-ignore
//   return  (<ApolloProvider client={client}>
//             {props.children}
//             </ApolloProvider>
//     )
// }

// //
