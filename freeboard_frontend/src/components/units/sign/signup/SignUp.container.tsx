import SignUpUiPage from "./SignUp.presenter";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { CREATE_USER } from "./SignUp.queries";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");

  const [create_user] = useMutation(CREATE_USER);

  const router = useRouter();

  const emailUp = (event) => {
    setEmail(event.target.value);
  };

  const passwordUp = (event) => {
    setPassword(event.target.value);
  };

  const passwordUpCheck = (event) => {
    setPasswordCheck(event.target.value);
  };

  const nameUp = (event) => {
    setName(event.target.value);
  };

  // email: email,
  // password: password,
  // name: name,
  const onClickSignUp = async () => {
    if (password !== passwordCheck) {
      alert("비밀번호와 비밀번호 확인이 다릅니다!");
      return;
    }
    const result = await create_user({
      variables: {
        createUserInput: {
          email: email,
          password: password,
          name: name,
        },
      },
    });
    alert("회원가입 되었습니다!!");
    router.push("/boards");
  };

  return (
    <SignUpUiPage
      emailUp={emailUp}
      passwordUp={passwordUp}
      passwordUpCheck={passwordUpCheck}
      nameUp={nameUp}
      onClickSignUp={onClickSignUp}
    ></SignUpUiPage>
  );
}
