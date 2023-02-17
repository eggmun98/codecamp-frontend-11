import { useForm } from "react-hook-form";
import * as I from "./SignIn.styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./SignIn.validation";
import Input01 from "../../../../commons/input";
import { useSignInMode } from "../../../commons/hooks/customs/useSignInMode";

export default function SignInPage() {
  const { onClickLoginButton } = useSignInMode();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

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
