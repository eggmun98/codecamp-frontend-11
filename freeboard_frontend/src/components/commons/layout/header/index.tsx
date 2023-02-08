import styled from "@emotion/styled";

const Wrapper = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 360px;
  padding-right: 360px;
  padding-top: 50px;
  /* background-color: #5321d0;  */
  background-color: #282424;
  /* background-color: #2a2626; */
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const LogoImg = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 12px;
`;

const LogoTitle = styled.div`
  font-size: 38px;
  font-weight: 700;
  color: white;
`;

const RightWrapper = styled.div``;

const Login = styled.button`
  font-weight: 700;
  font-size: 16px;
  border: none;
  outline: none;
  color: white;
  background-color: #282424;
`;

const SighUp = styled.button`
  padding: 10px 16px;
  font-weight: 700;
  font-size: 16px;
  color: white;
  margin-left: 20px;
  background-color: #282424;
  border: none;
`;

export default function HeaderPage() {
  return (
    <>
      <Wrapper>
        <LeftWrapper>
          <LogoImg src="/header/myLogo.png"></LogoImg>
          <LogoTitle>Egg Mun</LogoTitle>
        </LeftWrapper>
        <RightWrapper>
          <Login>로그인</Login>
          <SighUp>회원가입</SighUp>
        </RightWrapper>
      </Wrapper>
    </>
  );
}
