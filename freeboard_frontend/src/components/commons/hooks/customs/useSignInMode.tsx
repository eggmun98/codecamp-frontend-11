import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../../commons/stores";
import { LOGIN_USER } from "../mutations/useMutationLoginUser";

export const useSignInMode = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const router = useRouter();
  const [login_user] = useMutation(LOGIN_USER);
  const onClickLoginButton = async (data) => {
    console.log(data);
    const result = await login_user({
      variables: {
        email: data.email,
        password: data.password,
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

  return { onClickLoginButton };
};
