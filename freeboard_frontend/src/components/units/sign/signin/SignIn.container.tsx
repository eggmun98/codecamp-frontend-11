import SignInUiPage from "./SignIn.presenter";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../../commons/stores";
import { LOGIN_USER } from "./SignIn.queries";

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
    <SignInUiPage
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
      onClickLoginButton={onClickLoginButton}
    ></SignInUiPage>
  );
}
