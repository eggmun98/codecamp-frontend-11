import * as U from "./SignUp.styles";
import { useForm } from "react-hook-form";
import { useSignUpMode } from "../../../commons/hooks/customs/sign/useSignUpMode";
import { introspectionFromSchema } from "graphql";

interface IData {
  email: string;
  password: string;
  passwordCheck: string;
  name: string;
}

export default function SignUpPage(): JSX.Element {
  const { register, handleSubmit } = useForm<IData>();
  const { onClickSignUp } = useSignUpMode();

  return (
    <form onSubmit={handleSubmit(onClickSignUp)}>
      <U.MainWrapper>
        <U.InWrapper>
          <U.LogoWrapper>Egg Mun</U.LogoWrapper>
          <U.OneWrapper>
            <U.TextStypled>이메일</U.TextStypled>
            <U.InputStyled01
              type="text"
              {...register("email")}
            ></U.InputStyled01>
          </U.OneWrapper>
          <U.OneWrapper>
            <U.TextStypled>비밀번호</U.TextStypled>
            <U.InputStyled01
              type="password"
              {...register("password")}
            ></U.InputStyled01>
          </U.OneWrapper>
          <U.OneWrapper>
            <U.TextStypled>비밀번호 확인</U.TextStypled>
            <U.InputStyled01
              type="password"
              {...register("passwordCheck")}
            ></U.InputStyled01>
          </U.OneWrapper>
          <U.OneWrapper>
            <U.TextStypled>이름</U.TextStypled>
            <U.InputStyled01 {...register("name")}></U.InputStyled01>
          </U.OneWrapper>
          <U.OneWrapper>
            <U.TextStypled>생년월일</U.TextStypled>
            <U.LowWrapper>
              <U.InputStyled02 maxLength={4}></U.InputStyled02>
              <U.SelectStyled01 id="sel">
                <option disabled={true} selected={true}>
                  월
                </option>
                <option>01</option>
                <option>02</option>
                <option>03</option>
                <option>04</option>
                <option>05</option>
                <option>06</option>
                <option>07</option>
                <option>08</option>
                <option>09</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
              </U.SelectStyled01>
              <U.InputStyled02 maxLength={2}></U.InputStyled02>
            </U.LowWrapper>
            <U.TwoWrapper>
              <U.TextStypled>성별</U.TextStypled>
              <U.SelectStyled02 id="sel">
                <option disabled={true} selected={true}>
                  성별
                </option>
                <option>남자</option>
                <option>여자</option>
                <option>선택안함</option>
              </U.SelectStyled02>
            </U.TwoWrapper>
          </U.OneWrapper>
          <U.ButtonStyled>가입하기</U.ButtonStyled>
        </U.InWrapper>
      </U.MainWrapper>
    </form>
  );
}
