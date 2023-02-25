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
import { accessTokenState, restoreAccessTokenLoadable } from "../stores";
import { onError } from "@apollo/client/link/error";
import { getAccessToken } from "../libraries/getAccessToken";

const GLOBAL_STATE = new InMemoryCache();

interface IApolloSettingProps {
  children: JSX.Element;
}

export default function ApolloSetting(props: IApolloSettingProps): JSX.Element {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState); // [accessToken, setAccessToken] setAccessToken을 안쓰니 지움

  const aaa = useRecoilValueLoadable(restoreAccessTokenLoadable);

  // 1. 프리렌더링 예제 - process.browser 방법
  // if (process.browser) {
  //   // 지금 브라우저니
  //   console.log("나는 지금 브라우저이다!!");
  //   alert("반갑습니다.");
  //   const result = localStorage.getItem("accessToken");
  //   console.log(result);
  //   setAccessToken(result ?? "");
  // } else {
  //   console.log(
  //     "지금은 프론트엔드 서버다!!!(즉, yarn dev로 실행시킨 프로그램 내부이다!"
  //   );
  // }

  // 2. 프리렌더링 예제 = typeof window 방법
  // 너 지금 브라우저니???를 윈도우를 이용하여 알수 있음!!
  // if (typeof window !== "undefined") {
  //   console.log("나는 지금 브라우저다!");
  // } else {
  //   console.log("나는 지금 프론트엔드 서버이다!");
  // }

  // 3. 프리렌더링 무시 - useEffect 방법 // 새로고침 오류 해결하는 과정!!
  useEffect(() => {
    // console.log("나는 지금 브라우저이다!");
    // 1. 기존방식(refreshToken 배우기 이전에)
    // const result = localStorage.getItem("accessToken");
    // setAccessToken(result ?? "");

    // 2. 새로운 방식(refreshToken)
    void aaa.toPromise().then((newAccessToken) => {
      setAccessToken(newAccessToken ?? "");
    });
    // void getAccessToken().then((newAccessToken) => {
    //   setAccessToken(newAccessToken ?? "");
    // });
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
    // 모든 api를 요청할때 마다 헤더부분에 추가한다!
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: "include",
  });

  const client = new ApolloClient({
    // 이 세팅을 저 아폴로프로바이드 태그에 클라이언트 넣어야 모든 자식들 쓸수 있음
    // 여기서 뉴를 하니까 페이지 이동할때마다 실행하는거! // 근데 위의 9번째 줄
    link: ApolloLink.from([errorLink, uploadLink]), // 배열이라서 에어링크가 먼저 와 있어야함
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
//
//
//
//

//

//

//

// 초기 설정
// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   ApolloLink,
// } from "@apollo/client";
// import { createUploadLink } from "apollo-upload-client";

// interface IApolloSettingProps {
//   children: JSX.Element;
// }

// export default function ApolloSetting(props: IApolloSettingProps): JSX.Element {
//   const uploadLink = createUploadLink({
//     uri: "http://backend-practice.codebootcamp.co.kr/graphql",
//   });

//   const client = new ApolloClient({
//     // 여기서 뉴를 하니까 페이지 이동할때마다 실행하는거!
//     link: ApolloLink.from([uploadLink]),
//     // uri: "http://backend-practice.codebootcamp.co.kr/graphql",
//     cache: new InMemoryCache(), // 컴퓨터의 메모리에다가 백엔드에서 받아온 데이터 임시로 저장해 놓기 => 나중에 더 자세히 알아보기
//   });
//   // 그래프큐엘 셋팅

//   // cache: new InMemoryCache() 임시 저장하는 캐쉬 즉 글로벌스테이트가 저장되는 곳

//   // prettier-ignore
//   return  (<ApolloProvider client={client}>
//           {props.children}
//           </ApolloProvider>
//   )
// }

//
//
//
//
//
//
// 2번째 설정
// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   ApolloLink,
// } from "@apollo/client";
// import { createUploadLink } from "apollo-upload-client";
// import { useEffect } from "react";
// import { useRecoilState } from "recoil";
// import { accessTokenState } from "../stores";

// const GLOBAL_STATE = new InMemoryCache();

// interface IApolloSettingProps {
//   children: JSX.Element;
// }

// export default function ApolloSetting(props: IApolloSettingProps): JSX.Element {
//   const [accessToken, setAccessToken] = useRecoilState(accessTokenState); // [accessToken, setAccessToken] setAccessToken을 안쓰니 지움
//   // console.log(accessToken);

//   // 1. 프리렌더링 예제 - process.browser 방법
//   // if (process.browser) {
//   //   // 지금 브라우저니
//   //   console.log("나는 지금 브라우저이다!!");
//   //   alert("반갑습니다.");
//   //   const result = localStorage.getItem("accessToken");
//   //   console.log(result);
//   //   setAccessToken(result ?? "");
//   // } else {
//   //   console.log(
//   //     "지금은 프론트엔드 서버다!!!(즉, yarn dev로 실행시킨 프로그램 내부이다!"
//   //   );
//   // }

//   // 2. 프리렌더링 예제 = typeof window 방법
//   // 너 지금 브라우저니???를 윈도우를 이용하여 알수 있음!!
//   // if (typeof window !== "undefined") {
//   //   console.log("나는 지금 브라우저다!");
//   // } else {
//   //   console.log("나는 지금 프론트엔드 서버이다!");
//   // }

//   // 3. 프리렌더링 무시 - useEffect 방법
//   useEffect(() => {
//     // console.log("나는 지금 브라우저이다!");
//     const result = localStorage.getItem("accessToken");
//     console.log(result);
//     setAccessToken(result ?? "");
//   }, []);

//   const uploadLink = createUploadLink({
//     uri: "http://backend-practice.codebootcamp.co.kr/graphql",
//     headers: { Authorization: `Bearer ${accessToken}` }, // 모든 api를 요청할때 마다 헤더부분에 추가한다!
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
//           {props.children}
//           </ApolloProvider>
//   )
// }
