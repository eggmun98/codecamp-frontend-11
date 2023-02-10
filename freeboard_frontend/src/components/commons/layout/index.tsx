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
  width: 1920px;
  background-color: #282424;
  /* background-color: rgb(49, 49, 49); */
  color: white;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const RowDesign = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;

export const ColDesign = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
`;

export default function LayoutPage(props) {
  const router = useRouter();

  const HIDDEN_LAYOUT = ["/boards", "/mypage"];

  console.log(router);
  const hidden_layout = HIDDEN_LAYOUT.includes(router.asPath);

  return (
    <MainDesign>
      <HeaderPage></HeaderPage>
      <RowDesign>
        {hidden_layout && <SideBarPage></SideBarPage>}
        <ColDesign>
          <BannerPage></BannerPage>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div>{props.children}</div>
            {hidden_layout && <SubBarPage></SubBarPage>}
          </div>
        </ColDesign>
      </RowDesign>
      {hidden_layout && <FooterPage></FooterPage>}
    </MainDesign>
  );
}
