import { useState } from "react";
import {
  MainDiv,
  SubDiv,
  TopDiv,
  Logo,
  LogoTitle,
  EmailDiv,
  EmailInputBox,
  ErrorStyle,
  LineStyle,
  InputStyle,
  ButtonStyle,
  PasswordDiv,
  PasswordInputBox,
  LoginButton,
  LoginDiv,
  FooterDiv,
  FooterPasswordBox,
  FooterEmail,
  FooterPassword,
  FooterSingUp,
  KkoDiv,
  KkoButton,
  KkoLogo,
  KkoText,
} from "../../styles/index0205";

export default function mainFun() {
  const [email, setEmail] = useState("");
  const [password, setPasssword] = useState("");
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");

  function emailCheck(event) {
    setEmail(event.target.value);
  }

  function passwordCheck(event) {
    setPasssword(event.target.value);
  }

  function onChangeCheck(event) {
    if (email.includes("@") === false) {
      setError("이메일 주소를 다시 입력해주세요.");
    } else {
      setError("");
    }

    if (password.length < 8) {
      setError2(" 8~16자의 영문, 숫자, 특수 문자만 사용 가능합니다.");
    } else {
      setError2("");
    }
  }

  return (
    <MainDiv>
      <SubDiv>
        <TopDiv>
          <Logo src="/add.png"></Logo>
          <LogoTitle>잇츠로드</LogoTitle>
        </TopDiv>

        <EmailDiv>
          <EmailInputBox>
            <InputStyle onChange={emailCheck}></InputStyle>
            <ButtonStyle>X</ButtonStyle>
          </EmailInputBox>
          <LineStyle></LineStyle>
          <ErrorStyle>{error} </ErrorStyle>
        </EmailDiv>

        <PasswordDiv>
          <PasswordInputBox>
            <InputStyle type="password" onChange={passwordCheck}></InputStyle>
            <ButtonStyle>X</ButtonStyle>
          </PasswordInputBox>
          <LineStyle></LineStyle>
          <ErrorStyle>{error2}</ErrorStyle>
        </PasswordDiv>

        <LoginDiv>
          <LoginButton onClick={onChangeCheck}>로그인</LoginButton>
        </LoginDiv>

        <FooterDiv>
          <FooterEmail>이메일 찾기</FooterEmail>
          <FooterPasswordBox>
            <FooterPassword>비밀번호 찾기</FooterPassword>
          </FooterPasswordBox>
          <FooterSingUp>회원가입</FooterSingUp>
        </FooterDiv>

        <KkoDiv>
          <KkoButton>
            <KkoLogo src="/Group.png"></KkoLogo>
            <KkoText>카카오톡으로 로그인</KkoText>
          </KkoButton>
        </KkoDiv>
      </SubDiv>
    </MainDiv>
  );
}
