import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../../commons/hooks/customs/useAuth";

const RESET_USER_PASSWORD = gql`
  mutation resetUserPassword($password: String!) {
    resetUserPassword(password: $password)
  }
`;

export default function PasswordEditPage() {
  useAuth();

  const [reset_user_password] = useMutation(RESET_USER_PASSWORD);
  const { register, handleSubmit } = useForm();

  const onClickPasswordEdit = async (data) => {
    console.log(data.password);
    await reset_user_password({
      variables: {
        password: String(data.passowrd),
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
