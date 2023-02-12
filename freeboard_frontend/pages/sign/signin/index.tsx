import styled from "@emotion/styled";

export const MainWrapper = styled.div`
  /* width: 1920px;  
  background-color: #282424;
  color: white;
  overflow: hidden; */
  height: 100vw;
  display: flex;
  flex-direction: column;
  /* justify-content: center;  */
  /* align-items: center; */
  margin-top: 200px;
  margin-left: 650px;
  color: black;
`;

export const InWrapper = styled.div`
  width: 600px;
  /* height: 50vw;  */
  border: 5px solid #489bb0;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  /* align-items: center;  */
  color: #489bb0;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 50px;
`;

export const LogoWrapper = styled.div`
  font-size: 70px;
  font-weight: 700;
  /* color: #489bb0; */
  margin-top: 20px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const OneWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 40px;
`;

export const TextStypled = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
`;

export const InputStyled01 = styled.input`
  width: 500px;
  height: 50px;
  /* margin-bottom: 30px;  */
  border: 1px solid #489bb0;
  border-radius: 10px;
  padding-left: 10px;
  outline-color: #489bb0;
`;

export const ButtonStyled = styled.button`
  width: 500px;
  height: 50px;
  font-size: 20px;
  border: 1px solid #489bb0;
  background-color: #489bb0;
  border-radius: 10px;
  color: white;
  margin-bottom: 20px;
`;

export default function SignInPage() {
  return (
    <MainWrapper>
      <InWrapper>
        <LogoWrapper>Egg Mun</LogoWrapper>
        <OneWrapper>
          <TextStypled>이메일</TextStypled>
          <InputStyled01></InputStyled01>
        </OneWrapper>
        <OneWrapper>
          <TextStypled>비밀번호</TextStypled>
          <InputStyled01></InputStyled01>
        </OneWrapper>
        <ButtonStyled>로그인</ButtonStyled>
      </InWrapper>
    </MainWrapper>
  );
}
