import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../../commons/hooks/customs/useAuth";
import { IMutation } from "../../../../commons/types/generated/types";

const RESET_USER_PASSWORD = gql`
  mutation resetUserPassword($password: String!) {
    resetUserPassword(password: $password)
  }
`;

interface IData {
  password: number;
}

export default function PasswordEditPage() {
  useAuth();

  const [reset_user_password] = useMutation(RESET_USER_PASSWORD);
  const { register, handleSubmit } = useForm<IData>();

  const onClickPasswordEdit = async (data: { password: number }) => {
    await reset_user_password({
      variables: {
        password: data.password,
      },
    });
    alert("비밀번호를 변경하였습니다.");
  };

  return (
    <div>
      <div>비밀번호 변경페이지</div>
      <form onSubmit={handleSubmit(onClickPasswordEdit)}>
        <input {...register("password")}></input>
        <button>변경하기</button>
      </form>
    </div>
  );
}
