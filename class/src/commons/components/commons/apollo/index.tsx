import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const GLOBAL_STATE = new InMemoryCache();

interface IApolloSettingProps {
  children: JSX.Element;
}

export default function ApolloSetting(props: IApolloSettingProps): JSX.Element {
  const uploadLink = createUploadLink({
    uri: "http://backend-practice.codebootcamp.co.kr/graphql",
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
