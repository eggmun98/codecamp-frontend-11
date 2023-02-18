import BannerPage from "./banner";
import HeaderPage from "./header";
import styled from "@emotion/styled";
import SideBarPage from "./sidebar";
import SubBarPage from "./subbar";
import FooterPage from "./footer";
import Router, { useRouter } from "next/router";
import { gql } from "@apollo/client";

export const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;

export const MainDesign = styled.div`
  width: 100%;
  background-color: #282424;
  /* background-color: rgb(49, 49, 49); */
  color: white;
  display: flex;
  flex-direction: column;
  overflow: hidden; ;
`;

export const RowDesign = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;

export const ColDesign = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  .aaa {
    width: 100%;
  }
`;

export default function LayoutPage(props) {
  const router = useRouter();

  const HIDDEN_LAYOUT = ["/boards", "/mypage"];
  const HIDDEN_SIGN = ["/sign/signup", "/sign/signin"];

  console.log(router);
  const hidden_layout = HIDDEN_LAYOUT.includes(router.asPath);
  const hidden_sign = HIDDEN_SIGN.includes(router.asPath);

  return (
    <MainDesign>
      {!hidden_sign && <HeaderPage></HeaderPage>}
      <RowDesign>
        {!hidden_sign && <SideBarPage></SideBarPage>}
        <ColDesign>
          {!hidden_sign && <BannerPage></BannerPage>}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div className="aaa">{props.children}</div>
            {!hidden_sign && <SubBarPage></SubBarPage>}
          </div>
        </ColDesign>
      </RowDesign>
      {hidden_layout && <FooterPage></FooterPage>}
    </MainDesign>
  );
}
