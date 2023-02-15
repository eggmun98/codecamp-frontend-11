import SignInUiPage from "./SignIn.presenter";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../../commons/stores";
import { LOGIN_USER } from "./SignIn.queries";
import { useForm } from "react-hook-form";
import * as I from "./SignIn.styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./SignIn.validation";
import { OmitProps } from "antd/es/transfer/ListBody";
import Input01 from "../../../../commons/input";

export default function SignInPage() {
  const router = useRouter();

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const [login_user] = useMutation(LOGIN_USER);

  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  // const onChangeEmail = (event) => {
  //   setEmail(event.target.value);
  // };

  // const onChangePassword = (event) => {
  //   setPassword(event.target.value);
  // };

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

  return (
    <form onSubmit={handleSubmit(onClickLoginButton)}>
      <I.MainWrapper>
        <I.InWrapper>
          <I.LogoWrapper>Egg Mun</I.LogoWrapper>
          <I.OneWrapper>
            <I.TextStypled>이메일</I.TextStypled>
            <Input01
              type="text"
              register={register("email")}
              placeholder="이메일 입력하세요"
            ></Input01>
            <div style={{ color: "red" }}>
              {formState.errors.email?.message}
            </div>
          </I.OneWrapper>
          <I.OneWrapper>
            <I.TextStypled>비밀번호</I.TextStypled>
            <Input01 type="password" register={register("password")}></Input01>
            <div style={{ color: "red" }}>
              {formState.errors.password?.message}
            </div>
          </I.OneWrapper>
          <I.ButtonStyled>로그인</I.ButtonStyled>
        </I.InWrapper>
      </I.MainWrapper>
    </form>
  );
}
