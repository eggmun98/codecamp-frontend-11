import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import type { ChangeEvent } from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { wrapAsync } from "../../../src/commons/components/commons/libraries/asyncFunc";
import { accessTokenState } from "../../../src/commons/components/commons/stores";
import type {
  IMutation,
  IMutationLoginUserExampleArgs,
} from "../../../src/commons/types/generated/types";

const LOGIN_USER = gql`
  mutation LoginUserExample($email: String!, $password: String!) {
    loginUserExample(email: $email, password: $password) {
      accessToken
    }
  }
`;

export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUserExample] = useMutation<
    Pick<IMutation, "loginUserExample">,
    IMutationLoginUserExampleArgs
  >(LOGIN_USER);

  const [, setAccessToken] = useRecoilState(accessTokenState);

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };
  const onClickLogIn = async (): Promise<void> => {
    try {
      // 1. 로그인 뮤테이션 날려서 액세스 토큰 받아오기
      const result = await loginUserExample({
        variables: {
          email,
          password,
        },
      });
      const accessToken = result.data?.loginUserExample.accessToken;
      console.log(accessToken);
      // 2. 받아온 액세스 토큰을 글로벌 스테이트에 저장하기
      if (accessToken === undefined) {
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
        return;
      }
      setAccessToken(accessToken);
      // 3. 로그인 성공 페이지로 이동하기
      void router.push("/section30/30-01-login-refreshtoken-success");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  // wrapAsync로 감사쭈는 이유는 비동기라서!!
  return (
    <>
      이메일:
      <input type="text" onChange={onChangeEmail} />
      <div></div>
      비밀번호:
      <input type="password" onChange={onChangePassword} />
      <div></div>
      <button onClick={wrapAsync(onClickLogIn)}>LOG-IN</button>
    </>
  );
}
