import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input01 from "../../../src/commons/components/commons/inputs/01";
import Button01 from "../../../src/commons/components/commons/buttons/01";

// 페이지 이름은 맨앞에 숫자가 되면 안된다
const schema = yup.object({
  writer: yup
    .string()
    .required("작성자를 입력해주세요.")
    .max(5, "5자리 이내로 써주세요"),
  title: yup.string().required("제목을 작성해주세요."),
  contents: yup
    .string()
    .required("내용을 작성해주세요,")
    .min(100, "100자 이상입력해주세요")
    .max(1000, "1000자 이상입력해주세요"),
  password: yup
    .string()
    .required("비밀번호를 작성해주세요")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[~!@#$%^&*()-=_+])[^\s]*$/,
      "특수문자 영문 숫자"
    )
    .max(8, " 8자리까지 입력가능합니다"),
});
export default function ReactHookForm01() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onClickSubmit = async (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onClickSubmit)}>
      작성자: <Input01 type="text" register={register("writer")}></Input01>
      <div style={{ color: "red" }}>{formState.errors.writer?.message}</div>
      비밀번호:{" "}
      <Input01 type="password" register={register("password")}></Input01>
      <div style={{ color: "red" }}>{formState.errors.password?.message}</div>
      제목: <Input01 type="text" register={register("title")}></Input01>
      <div style={{ color: "red" }}>{formState.errors.title?.message}</div>
      입력창: <Input01 type="text" register={register("contents")}></Input01>
      <div style={{ color: "red" }}>{formState.errors.contents?.message}</div>
      <Button01 title="등록하기" isActive={formState.isValid}></Button01>
    </form>
  );
}
