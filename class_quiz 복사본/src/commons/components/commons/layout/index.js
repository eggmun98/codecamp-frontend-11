import { printIntrospectionSchema } from "graphql";
import BannerPage from "./banner";
import FooterPage from "./footer";
import HeaderPage from "./header";
import NavigationPage from "./navigation";

export default function LayoutPage(props) {
  return (
    <>
      <HeaderPage></HeaderPage>
      <BannerPage></BannerPage>
      <NavigationPage></NavigationPage>
      <div style={{ height: "500px", display: "flex" }}>
        <div style={{ width: "30%", backgroundColor: "red" }}>
          사이드바 입니다.
        </div>
        <div style={{ width: "70%" }}>{props.children}</div>
      </div>
      <FooterPage></FooterPage>
    </>
  );
}
