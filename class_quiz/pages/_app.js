// import "../styles/globals.css";
// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   ApolloLink,
// } from "@apollo/client";
import LayoutPage from "../src/commons/components/commons/layout";
import { Global } from "@emotion/react";
import { globalStyles } from "../src/commons/styles/globalStyles";
import { RecoilRoot } from "recoil";
import ApolloSetting from "../src/commons/components/commons/apollo";
// import '../styles/globals.css'

export default function App({ Component }) {
  return (
    <div>
      <RecoilRoot>
        <ApolloSetting>
          <Global styles={globalStyles} />
          <LayoutPage>
            <Component />
          </LayoutPage>
        </ApolloSetting>
      </RecoilRoot>
    </div>
  );
}
