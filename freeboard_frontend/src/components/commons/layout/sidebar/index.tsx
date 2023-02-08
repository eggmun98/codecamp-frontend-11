import styled from "@emotion/styled";
import { useRouter } from "next/router";

const Wrapper = styled.div`
  width: 15%;
  height: 1920px;
  /* background: #ffd600; */
  /* display: flex; */
  /* flex-direction: column; */
  /* align-items: center; */
  /* padding-left: 762px; */
  background-color: #8f3636;
`;

export default function SideBarPage() {
  // const onClickMyPageButton = () => {
  //   Router.push("/mypage");
  // };ß

  // const onClickBoardButton = () => {
  //   Router.push("/boards");
  // };

  return (
    <>
      <Wrapper></Wrapper>
    </>
  );
}
