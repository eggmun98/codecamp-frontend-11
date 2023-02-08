import { useRouter } from "next/router";
import LayoutBanner from "./banner";
import LayoutFooter from "./footer";
import LayoutHeader from "./header";
import LayoutNavigation from "./navigation/idnex";

const HIDDEN_HEADERS = [
  "/section13/13-01-library-icon",
  "/section13/13-02-library-star",
];

interface ILayoutProps {
  children: JSX.Element;
}

export default function Layout(props: ILayoutProps): JSX.Element {
  const router = useRouter();
  console.log("=======");
  console.log(router.asPath);
  console.log("=======");

  const isHiddenHeader = HIDDEN_HEADERS.includes(router.asPath);

  return (
    <>
      {!isHiddenHeader && <LayoutHeader></LayoutHeader>}
      <LayoutBanner></LayoutBanner>
      <LayoutNavigation></LayoutNavigation>
      <div style={{ height: "500px", display: "flex" }}>
        <div style={{ width: "30%", backgroundColor: "orange" }}>사이드바</div>
        <div style={{ width: "70%" }}>{props.children}</div>
      </div>
      <LayoutFooter></LayoutFooter>
    </>
  );
}
