import styled from "@emotion/styled";

export const MainDiv = styled.div`
  width: 640px;
  margin: 100px;
  border: 1px solid black;
  background-image: url("/img-bg.png");
`;

export const BackgroundDiv = styled.img`
  width: 640px;
  height: 1138px;
`;

export const SubDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 640px;
  height: 1138px;
  padding: 0px 50px 0px 50px;
`;

export const TopDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 224px;
`;

export const Logo = styled.img`
  width: 66px;
  height: 82px;
`;

export const LogoTitle = styled.div`
  padding-top: 23px;
  font-style: normal;
  font-weight: 700;
  font-size: 60px;
  color: white;
`;

export const EmailDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 144px;
`;

export const EmailInputBox = styled.div``;

export const PasswordDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 38px;
`;

export const PasswordInputBox = styled.div`
  width: 100%;
`;

export const LoginDiv = styled.div`
  padding-top: 20px;
`;
export const LoginButton = styled.button`
  width: 540px;
  height: 76px;
  border: 1px solid transparent;
  background: #ff1b6d;
  opacity: 0.6;
  border-radius: 38px;
  font-weight: 700;
  font-size: 26px;
  color: #ffffff;
`;

export const FooterDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 38px;
`;

export const FooterPasswordBox = styled.div`
  border-left: 1px solid white;
  border-right: 1px solid white;
  padding: 0px 30px;
`;

export const FooterEmail = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  color: white;
  padding-right: 20px;
`;

export const FooterPassword = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  color: white;
`;

export const FooterSingUp = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  color: white;
  padding-left: 20px;
`;

export const KkoDiv = styled.div`
  padding-top: 59px;
`;

export const KkoButton = styled.button`
  width: 540px;
  height: 76px;
  opacity: 0.6;
  border: 2px solid #fae100;
  border-radius: 38px;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const KkoText = styled.div`
  padding-left: 30px;
  font-weight: 700;
  font-size: 26px;
  color: #ffe100;
  opacity: 1;
`;

export const KkoLogo = styled.img``;

// 공용 인풋창과 공용 버튼 에러 텍스트
export const InputStyle = styled.input`
  width: 96%;
  border: none;
  background: transparent;
  color: white;
  font-weight: 400;
  font-size: 24px;
`;
export const ButtonStyle = styled.button`
  border: 2px solid transparent;
  border-radius: 50%;
  background-color: gray;
  width: 20px;
  height: 20px;
`;

export const LineStyle = styled.div`
  width: 540px;
  border-bottom: 1px solid #7d7d7d;
  padding-top: 7px;
`;
export const ErrorStyle = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: #ff1b6d;
  padding-top: 5px;
`;
