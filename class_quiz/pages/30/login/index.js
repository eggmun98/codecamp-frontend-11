import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { accessToKenState } from "../../../src/commons/components/commons/stores";

const LOGIN_USER = gql`
  mutation LoginUSerExample($email: String!, $password: String!) {
    loginUserExample(email: $email, password: $password) {
      accessToken
    }
  }
`;

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login_user] = useMutation(LOGIN_USER);

  const [, setAccessToken] = useRecoilState(accessToKenState);

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
    const accessToken = result.data?.loginUserExample.accessToken;

    if (accessToken === undefined) {
      alert("로그인에 실패하였습니다");
      return;
    }
    setAccessToken(accessToken);
    // localStorage.setItem("accessToken", accessToken);

    router.push("/30/loading");
  };

  return (
    <div>
      이메일: <input type="text" onChange={onChangeEmail}></input>
      비밀번호 <input type="password" onChange={onChangePassword}></input>
      <button onClick={onClickButton}>로그인</button>
    </div>
  );
}
