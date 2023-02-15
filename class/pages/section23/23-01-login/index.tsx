import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import type { ChangeEvent } from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../src/commons/components/commons/stores";
import type {
  IMutation,
  IMutationLoginUserArgs,
} from "../../../src/commons/types/generated/types";

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser] = useMutation<
    Pick<IMutation, "loginUser">,
    IMutationLoginUserArgs
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
      const result = await loginUser({
        variables: {
          email,
          password,
        },
      });
      const accessToken = result.data?.loginUser.accessToken;
      console.log(accessToken);
      // 2. 받아온 액세스 토큰을 글로벌 스테이트에 저장하기
      if (accessToken === undefined) {
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
        return;
      }
      setAccessToken(accessToken);
      // 3. 로그인 성공 페이지로 이동하기
      void router.push("/section23/23-01-login-success");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return (
    <>
      이메일:
      <input type="text" onChange={onChangeEmail} />
      <div></div>
      비밀번호:
      <input type="password" onChange={onChangePassword} />
      <div></div>
      <button onClick={onClickLogIn}>LOG-IN</button>
    </>
  );
}

// import { useMutation, gql } from "@apollo/client";
// import { useRouter } from "next/router";
// import type { ChangeEvent } from "react";
// import { useState } from "react";
// import { useRecoilState } from "recoil";
// import { accessTokenState } from "../../../src/commons/components/commons/stores";
// import type {
//   IMutation,
//   IMutationLoginUserArgs,
// } from "../../../src/commons/types/generated/types";

// const LOGIN_USER = gql`
//   mutation loginUSer($email: String!, $password: String!) {
//     loginUser(email: $email, password: $password) {
//       accessToken
//     }
//   }
// `;

// export default function LoginPage(): JSX.Element {
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loginUser] = useMutation<
//     Pick<IMutation, "loginUser">,
//     IMutationLoginUserArgs
//   >(LOGIN_USER); // 왼쪽은결과값와 오른쪽은인자값 이다!

//   const [accessToKen, setAccessToken] = useRecoilState(accessTokenState);
//   //   const [, setAccessToken] = useRecoilState(accessTokenState);  // accessToken을 안쓸꺼면 없애도 됨 그대신 컴마는 있어야 함

//   const onChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
//     setEmail(event.currentTarget.value);
//   };

//   const onChangePassword = (event: ChangeEvent<HTMLInputElement>): void => {
//     setPassword(event.currentTarget.value);
//   };

//   const onClickLogin = async (): Promise<void> => {
//     try {
//       // 1. 로그인 뮤테이션 날려서 accessToken 받아오기
//       const result = await loginUser({
//         variables: { email, password },
//       });
//       const accessToken = result.data?.loginUser.accessToken;
//       console.log(accessToken, result);

//       // 2. 받아온 accessToken을 globalState에 저장하기
//       if (accessToKen === undefined) {
//         alert("로그인에 실패하였습니다! 다시 시도해 주세요!");
//         return; // return해야 아래쪽이 실행이 안됨!
//       }
//       setAccessToken(accessToken);

//       // 3. 로그인 성공 페이지로 이동하기
//       void router.push("/section23/23-01-login-success"); // 안기다리니까 void
//     } catch (error) {
//       if (error instanceof Error)
//         // 에러 타입 적으려고 적음!
//         alert(error.message);
//     }
//   };

//   return (
//     <>
//       이메일: <input type="text" onChange={onChangeEmail}></input>
//       비밀번호: <input type="password" onChange={onChangePassword}></input>
//       <button onClick={onClickLogin}>로그인</button>
//     </>
//   );
// }
