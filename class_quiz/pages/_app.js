// import "../styles/globals.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client";
import LayoutPage from "../src/commons/components/commons/layout";
import { Global } from "@emotion/react";
import { globalStyles } from "../src/commons/styles/globalStyles";
import { createUploadLink } from "apollo-upload-client";

export default function App({ Component, pageProps }) {
  const uploadLink = createUploadLink({
    uri: "http://backend-practice.codebootcamp.co.kr/graphql",
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    // uri: "http://backend-practice.codebootcamp.co.kr/graphql",
    cache: new InMemoryCache(), // 컴퓨터의 메모리에다가 백엔드에서 받아온 데이터 임시로 저장해 놓기 => 나중에 더 자세히 알아보기
  });

  return (
    <div>
      <ApolloProvider client={client}>
        <Global styles={globalStyles} />
        <LayoutPage>
          <Component {...pageProps} />
        </LayoutPage>
      </ApolloProvider>
    </div>
  );
}
