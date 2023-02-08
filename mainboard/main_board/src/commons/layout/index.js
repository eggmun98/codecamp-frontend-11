// import SideBarPage from "./sidebar";
import BannerPage from "./banner";
import styled from "@emotion/styled";
import SideBarPage from "./sidebar";
import { useRouter } from "next/router";

const MainWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 30px;
  padding-left: 20px;
  margin: 0px;
  padding-bottom: 0px;
  padding-right: 0px;
  box-sizing: border-box;
`;

const SubWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const HIDDEN = ["/new"];

export default function LayoutPage(props) {
  const router = useRouter();

  const hidden = HIDDEN.includes(router.asPath);

  return (
    <MainWrapper>
      <SideBarPage></SideBarPage>
      <SubWrapper>
        {!hidden && <BannerPage></BannerPage>}
        <div>{props.children}</div>
      </SubWrapper>
    </MainWrapper>
  );
}
