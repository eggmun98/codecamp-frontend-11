import styled from "@emotion/styled";
import { Main } from "next/document";
import { useRouter } from "next/router";

export default function SideBarPage() {
  const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    /* border: 1px solid;  */
    width: 200px;
    height: 708px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    padding: 30px 20px;
    font-family: "SUIT";
  `;

  const LogoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 30px;
    margin-bottom: 30px;
  `;

  const Logo = styled.div`
    width: 21px;
    height: 18px;
    background-image: url("/toplogo.png");
    margin-right: 5.95px;
  `;

  const LgoText = styled.div`
    font-weight: 800;
    font-size: 16px;
  `;

  //
  const LogoWrapper2 = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 20px;
  `;
  const Logo2 = styled.div`
    background-image: url("/ic_list.png");
    width: 20px;
    height: 20px;
    margin-right: 12.5px;
  `;

  const MainText = styled.div`
    font-weight: 700;
    font-size: 14px;
  `;

  //
  const Logo3 = styled.div`
    background-image: url("/Vector-11.png");
    width: 18px;
    height: 18px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-right: 11.66px;
  `;

  const SubText = styled.div`
    font-weight: 700;
    font-size: 14px;
    color: #999999;
  `;

  const router = useRouter();

  const onClickNewButton = () => {
    router.push("/new");
  };

  const onClickListButton = () => {
    router.push("/");
  };

  return (
    <>
      <MainWrapper>
        <LogoWrapper>
          <Logo></Logo>
          <LgoText>TALKR</LgoText>
        </LogoWrapper>
        <LogoWrapper2 onClick={onClickListButton}>
          <Logo2></Logo2>
          <MainText>전체 글 보기</MainText>
        </LogoWrapper2>
        <LogoWrapper2 onClick={onClickNewButton}>
          <Logo3>
            <img src="/Vector-10.png"></img>
          </Logo3>
          <SubText>새 글 작성</SubText>
        </LogoWrapper2>
      </MainWrapper>
    </>
  );
}
