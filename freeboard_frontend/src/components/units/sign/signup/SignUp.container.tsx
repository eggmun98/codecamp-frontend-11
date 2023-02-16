import SignUpUiPage from "./SignUp.presenter";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { CREATE_USER } from "./SignUp.queries";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function SignUpPage() {
  const [create_user] = useMutation(CREATE_USER);

  const router = useRouter();

  const { register, handleSubmit, formState } = useForm({});

  const onClickSignUp = async (data) => {
    if (data.password !== data.passwordCheck) {
      alert("비밀번호와 비밀번호 확인이 다릅니다!");
      return;
    }

    console.log(data.email);
    console.log(data.password);
    console.log(data.name);
    const result = await create_user({
      variables: {
        createUserInput: {
          email: data.email,
          password: data.password,
          name: data.name,
        },
      },
    });

    alert("회원가입 되었습니다!!");
    router.push("/boards");
  };

  return (
    <SignUpUiPage
      onClickSignUp={onClickSignUp}
      handleSubmit={handleSubmit}
      register={register}
    ></SignUpUiPage>
  );
}
