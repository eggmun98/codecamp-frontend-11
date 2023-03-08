import { gql, useMutation } from "@apollo/client";
import { query } from "firebase/firestore/lite";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { getAccessToken } from "../../../../../commons/libraries/getAccessToken";
import { accessTokenState } from "../../../../../commons/stores";

import { LOGIN_USER } from "../../mutations/board/useMutationLoginUser";
import {
  FETCH_USER_LOGGED_IN,
  useQueryFetchUserLoggedIn,
} from "../../queries/sign/useQueryFetchUserLoggedIn";

const LOGIN_USER_EXAMPLE = gql`
  mutation LoginUserExample($email: String!, $password: String!) {
    loginUserExample(email: $email, password: $password) {
      accessToken
    }
  }
`;

export const useSignInMode = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const router = useRouter();
  const [login_user] = useMutation(LOGIN_USER);
  const [login_User_Example] = useMutation(LOGIN_USER_EXAMPLE);

  useEffect(() => {
    getAccessToken();
  });

  const onClickLoginButton = async (data): Promise<void> => {
    console.log(data);
    const result = await login_User_Example({
      variables: {
        email: data.email,
        password: data.password,
      },
      refetchQueries: [
        {
          query: FETCH_USER_LOGGED_IN,
        },
      ],
    });
    const accessToken = result.data?.loginUserExample.accessToken;
    console.log("@@@@@@@@@@@@", accessToken);

    if (accessToken === undefined) {
      alert("로그인에 실패하였습니다. 다시 시도해주세요!");
      return;
    }
    setAccessToken(accessToken);
    // localStorage.setItem("accessToken", accessToken);

    router.push("/markets");
  };

  return { onClickLoginButton };
};

// export const useSignInMode = () => {
//   const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
//   const router = useRouter();
//   const [login_user] = useMutation(LOGIN_USER);
//
//   const onClickLoginButton = async (data) => {
//     console.log(data);
//     const result = await login_user({
//       variables: {
//         email: data.email,
//         password: data.password,
//       },
//     });
//     const accessToken = result.data?.loginUser.accessToken;
//     console.log(accessToken);

//     if (accessToken === undefined) {
//       alert("로그인에 실패하였습니다. 다시 시도해주세요!");
//       return;
//     }
//     setAccessToken(accessToken);
//     localStorage.setItem("accessToken", accessToken);
//     router.push("/boards");
//   };

//   return { onClickLoginButton };
// };
