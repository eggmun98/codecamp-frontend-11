import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
    .max(8),
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
      작성자: <input type="text" {...register("writer")}></input>
      <div style={{ color: "red" }}>{formState.errors.writer?.message}</div>
      비밀번호: <input type="text" {...register("password")}></input>
      <div style={{ color: "red" }}>{formState.errors.password?.message}</div>
      제목: <input type="text" {...register("title")}></input>
      <div style={{ color: "red" }}>{formState.errors.title?.message}</div>
      입력창: <input type="text" {...register("contents")}></input>
      <div style={{ color: "red" }}>{formState.errors.contents?.message}</div>
      <button type="submit">등록하기</button>
    </form>
  );
}
