// import '../styles/globals.css'
import { Global } from "@emotion/react";
import type { AppProps } from "next/app"; // type을 붙여줘야한다. 굳이 할 필요 없으면 룰에 에러 적으면됨
import ApolloSetting from "../src/commons/components/commons/apollo";
import Layout from "../src/commons/components/commons/layout";
import { globalStyles } from "../src/commons/styles/globalStyles";
import { RecoilRoot } from "recoil";

export default function App({ Component }: AppProps): JSX.Element {
  // 아래의 컴포넌트에서 위에 변수 client(그래프큐엘 셋팅)을 쓸수 있게
  // 즉 모든 페이지에서 그래프큐엘을 쓸수 있따는거
  return (
    <div>
      <div>======여기는_app.js 컴포넌트 시작부분 입니다.================</div>
      <RecoilRoot>
        <ApolloSetting>
          <>
            <Global styles={globalStyles} />
            <Layout>
              <Component />
            </Layout>
          </>
        </ApolloSetting>
      </RecoilRoot>

      <div>======여기는_app.js 컴포넌트 마지막부분 입니다.================</div>
    </div>
  );
}
