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
  padding-bottom: 100px;
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
  margin-bottom: 50px;
`;

export const TwoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 25px;
`;

export const TextStypled = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
`;

export const LowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 50px;

  /* justify-content: space-between;  */
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

export const InputStyled02 = styled.input`
  width: 150px;
  height: 50px;
  /* margin-bottom: 30px;  */
  border: 1px solid #489bb0;
  border-radius: 10px;
  margin-right: 25px;
  padding-left: 10px;
  outline-color: #489bb0;
`;

export const SelectStyled01 = styled.select`
  width: 150px;
  height: 50px;
  /* margin-bottom: 30px;  */
  border: 1px solid #489bb0;
  border-radius: 10px;
  margin-right: 25px;
  padding-left: 10px;
  color: #489bb0;
  outline-color: #489bb0;
`;

export const SelectStyled02 = styled.select`
  width: 500px;
  height: 50px;
  /* margin-bottom: 30px;  */
  border: 1px solid #489bb0;
  border-radius: 10px;
  margin-right: 25px;
  padding-left: 10px;
  color: #489bb0;
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

export default function SignUpPage() {
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
        <OneWrapper>
          <TextStypled>비밀번호 확인</TextStypled>
          <InputStyled01></InputStyled01>
        </OneWrapper>
        <OneWrapper>
          <TextStypled>이름</TextStypled>
          <InputStyled01></InputStyled01>
        </OneWrapper>
        <OneWrapper>
          <TextStypled>생년월일</TextStypled>
          <LowWrapper>
            <InputStyled02 maxLength={4}></InputStyled02>
            <SelectStyled01 id="sel">
              <option disabled={true} selected={true}>
                월
              </option>
              <option>01</option>
              <option>02</option>
              <option>03</option>
              <option>04</option>
              <option>05</option>
              <option>06</option>
              <option>07</option>
              <option>08</option>
              <option>09</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
            </SelectStyled01>
            <InputStyled02 maxLength={2}></InputStyled02>
          </LowWrapper>
          <TwoWrapper>
            <TextStypled>성별</TextStypled>
            <SelectStyled02 id="sel">
              <option disabled={true} selected={true}>
                성별
              </option>
              <option>남자</option>
              <option>여자</option>
              <option>선택안함</option>
            </SelectStyled02>
          </TwoWrapper>
        </OneWrapper>
        <ButtonStyled>가입하기</ButtonStyled>
      </InWrapper>
    </MainWrapper>
  );
}
