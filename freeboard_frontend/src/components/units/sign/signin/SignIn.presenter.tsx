import * as I from "./SignIn.styles";

export default function SignInUiPage(props) {
  return (
    <I.MainWrapper>
      <I.InWrapper>
        <I.LogoWrapper>Egg Mun</I.LogoWrapper>
        <I.OneWrapper>
          <I.TextStypled>이메일</I.TextStypled>
          <I.InputStyled01 onChange={props.onChangeEmail}></I.InputStyled01>
        </I.OneWrapper>
        <I.OneWrapper>
          <I.TextStypled>비밀번호</I.TextStypled>
          <I.InputStyled01
            onChange={props.onChangePassword}
            type="password"
          ></I.InputStyled01>
        </I.OneWrapper>
        <I.ButtonStyled onClick={props.onClickLoginButton}>
          로그인
        </I.ButtonStyled>
      </I.InWrapper>
    </I.MainWrapper>
  );
}
