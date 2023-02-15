import * as yup from "yup";

export const schema = yup.object({
  email: yup.string().required("작성자를 작성해주세요!"),
  password: yup.string().required("제목을 입력해주세요."),
});
