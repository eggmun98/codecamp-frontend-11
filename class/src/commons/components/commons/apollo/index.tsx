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
  // console.log(accessToken);

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

  // 3. 프리렌더링 무시 - useEffect 방법
  useEffect(() => {
    // console.log("나는 지금 브라우저이다!");
    const result = localStorage.getItem("accessToken");
    console.log(result);
    setAccessToken(result ?? "");
  }, []);

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
//
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
