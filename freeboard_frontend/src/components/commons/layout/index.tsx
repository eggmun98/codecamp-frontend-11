import BannerPage from "./banner";
import HeaderPage from "./header";
import styled from "@emotion/styled";
import SideBarPage from "./sidebar";
import SubBarPage from "./subbar";
import FooterPage from "./footer";
import { gql } from "@apollo/client";
import { useRouter } from "next/router";

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
  /* background-color: #9fccd7; */
  /* background-color: #131315; */
  /* background-color: rgb(49, 49, 49);  */
  /* background-color: white; */
  color: black;
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
      <HeaderPage></HeaderPage>
      <SideBarPage></SideBarPage>
      <div className="aaa">{props.children}</div>
    </MainDesign>
  );
}
