import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";

const Wrapper = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 0px;
  /* background-color: #5321d0;  */
  background-color: #282424;

  /* background-color: #2a2626; */
`;

// const titlemove = keyframes`
//   0% {
//     font-size: 60px;
//   }

//   90% {
//     font-size: 20px;
//   }

//   100% {
//     font-size: 35px;
//   }
// `;

const logomove = keyframes`
  0%{
    transform: translate(0px, 0px)
  }
  30%{
    transform: translate(0px, -20px)
  }
  40%{
    transform: translate(0px, 0)
  }
  50%{
    transform: translate(0px, -10px)
  }
  60%{
    transform: translate(0px,  0px)
  }
  70%{
    transform: translate(0px, -10px)
  }
 
  80%{
    transform: translate(0px, 0px)
  }
  90%{
    transform: translate(0px, -10px)
  }
  

  100%{
    transform: translate(0px, 0px)
  }


`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const LogoImg = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 12px;
  margin-top: 25px;
  animation: ${logomove} 1s ease-out alternate;
`;

const LogoTitle = styled.div`
  font-size: 30px;
  font-weight: 700;
  color: white;

  margin-top: 50px;
`;

const RightWrapper = styled.div`
  margin-top: 50px;
`;

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
