import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { accessToKenState } from "../../../../src/commons/components/commons/stores";

const LOGIN_USER = gql`
  mutation loginUSer($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login_user] = useMutation(LOGIN_USER);

  const [accessToken, setAccessToken] = useRecoilState(accessToKenState);

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onClickButton = async () => {
    const result = await login_user({
      variables: {
        email: email,
        password: password,
      },
    });
    const accessToken = result.data?.loginUser.accessToken;

    if (accessToken === undefined) {
      alert("로그인에 실패하였습니다");
      return;
    }
    setAccessToken(accessToken);

    router.push("/23/01/01-success");
  };

  return (
    <>
      이메일: <input type="text" onChange={onChangeEmail}></input>
      비밀번호 <input type="password" onChange={onChangePassword}></input>
      <button onClick={onClickButton}>로그인</button>
    </>
  );
}
