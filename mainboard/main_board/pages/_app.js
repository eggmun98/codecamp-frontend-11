import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import LayoutPage from "../src/commons/layout";

export default function App({ Component, pageProps }) {
  const uploadLink = createUploadLink({
    uri: "http://backend-practice.codebootcamp.co.kr/graphql",
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),

    cache: new InMemoryCache(),
  });

  return (
    <div>
      <ApolloProvider client={client}>
        <LayoutPage>
          <Component {...pageProps} />
        </LayoutPage>
      </ApolloProvider>
    </div>
  );
}
