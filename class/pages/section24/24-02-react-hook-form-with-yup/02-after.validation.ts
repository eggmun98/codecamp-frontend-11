import * as yup from "yup";

export const schema = yup.object({
  writer: yup.string().required("작성자를 입력해주세요."), // writer이 스트링인지 확인해주고 비어있으면 안돼면 required()를 적어준다.
  title: yup.string().required("제목을 입력해주세요."),
  contents: yup.string().required("내용을 입력해주세요."),

  //   email: yup
  //     .string("이메일은 문자열 형식으로 작성해야 합니다")
  //     .email("이메일 형식에 적합하지 않습니다.") // 이메일 형식을 검사해줌
  //     .required("이메일은 필수 입력입니다."),

  // password: yup
  //   .string()
  //   .min(4, "비밀번호는 최소 4자리 이상으로 입력해 주세요..!") // 최소 자릿수 검사
  //   .max(15, "비밀번호는 최대 15자리로 입력해 주세요..!") // 최대 자릿수 검사
  //   .required("비밀번호는 필수 입력입니다..!"), // yup의 장점이다 이렇게 이프문을 줄일 수 있다!! 즉 유지보수가 좋아지는 장점이 있다!

  // phone: yup
  //   .string()
  //   .matches(/^\d{3}-\d{3,4}-\d{4}$/, "휴대폰 형식에 알맞지 않습니다.") // d는 숫자이고 3자리가 맞는지 또 3또는 4자리가 맞는지 그다음에 4자리가 맞는지 검사! ^시작하고 &끝나는거
  //   .required("휴대폰은 필수 입력입니다.!"),
});
