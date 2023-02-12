// import "../styles/globals.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client";
import LayoutPage from "../src/components/commons/layout";
import { AppProps } from "next/app";
import { globalStyles } from "../src/components/commons/styles";
import { Global } from "@emotion/react";
import { createUploadLink } from "apollo-upload-client";

export default function App({ Component }: AppProps): JSX.Element {
  const uploadLink = createUploadLink({
    uri: "http://backend-practice.codebootcamp.co.kr/graphql",
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Global styles={globalStyles} />
      <LayoutPage>
        <Component />
      </LayoutPage>
    </ApolloProvider>
  );
}
