// import "../styles/globals.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import LayoutPage from "../src/components/commons/layout";
import { AppProps } from "next/app";
import { globalStyles } from "../src/components/commons/styles";
import { Global } from "@emotion/react";

export default function App({ Component }: AppProps): JSX.Element {
  const client = new ApolloClient({
    uri: "http://backend-practice.codebootcamp.co.kr/graphql",
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
