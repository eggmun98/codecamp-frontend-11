import { useRouter } from "next/router";
import { useMutationCreateUser } from "../mutations/board/useMutationCreateUser";

export const useSignUpMode = () => {
  const router = useRouter();
  const [create_user] = useMutationCreateUser();

  const onClickSignUp = async (data) => {
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

  return { onClickSignUp };
};
