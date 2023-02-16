import * as yup from "yup";

export const schema = yup.object({
  writer: yup.string().required("작성자를 작성해주세요"),
  title: yup.string().required("제목을 작성해주세요"),
  password: yup.string().required("비밀번호를 작성해주세요"),
  contents: yup.string().required("내용을 작성해주세요"),
});
