import styled from "@emotion/styled";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../src/commons/stores";

export const MainWrapper = styled.div`
  height: 100vw;
  display: flex;
  flex-direction: column;
  margin-top: 200px;
  margin-left: 650px;
  color: black;
`;

export const InWrapper = styled.div`
  width: 600px;
  border: 5px solid #489bb0;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  color: #489bb0;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 50px;
`;

export const LogoWrapper = styled.div`
  font-size: 70px;
  font-weight: 700;
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

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login_user] = useMutation(LOGIN_USER);

  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onClickLoginButton = async () => {
    const result = await login_user({
      variables: {
        email: email,
        password: password,
      },
    });
    const accessToken = result.data?.loginUser.accessToken;
    console.log(accessToken);

    if (accessToken === undefined) {
      alert("로그인에 실패하였습니다. 다시 시도해주세요!");
      return;
    }
    setAccessToken(accessToken);
    router.push("/boards");
  };

  return (
    <MainWrapper>
      <InWrapper>
        <LogoWrapper>Egg Mun</LogoWrapper>
        <OneWrapper>
          <TextStypled>이메일</TextStypled>
          <InputStyled01 onChange={onChangeEmail}></InputStyled01>
        </OneWrapper>
        <OneWrapper>
          <TextStypled>비밀번호</TextStypled>
          <InputStyled01
            onChange={onChangePassword}
            type="password"
          ></InputStyled01>
        </OneWrapper>
        <ButtonStyled onClick={onClickLoginButton}>로그인</ButtonStyled>
      </InWrapper>
    </MainWrapper>
  );
}
