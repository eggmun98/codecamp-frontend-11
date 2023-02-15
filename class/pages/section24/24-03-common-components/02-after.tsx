import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./02-after.validation";
import { wrapAsync } from "../../../src/commons/components/commons/libraries/asyncFunc";
import Input01 from "../../../src/commons/components/commons/inputs/01";
import Button01 from "../../../src/commons/components/commons/buttons/01";

interface IFormData {
  writer: string;
  title: string;
  contents: string;
  // boardAddress: {
  //   addressDetail: string;
  // };
}

// yup는 검증해주는 도구!

export default function GraphqlMutationPage(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormData>({
    resolver: yupResolver(schema), // 검사할 것을 불러옴
    mode: "onChange", // 언제 검사할 것인지 정함
    //  formState에 에러가 담김
  });

  // const schema = yup.object({ // 이것을 공용으로 사용하기 위해 임폴트 해올거임!
  //   writer: yup.string().required("작성자를 입력해주세요."), // writer이 스트링인지 확인해주고 비어있으면 안돼면 required()를 적어준다.
  //   title: yup.string().required("제목을 입력해주세요."),
  //   contents: yup.string().required("내용을 입력해주세요."),
  // });

  const onClickSubmit = async (data: IFormData): void => {
    console.log(data);
  };

  console.log("리렌더링 되나요?");

  // form태그는 클릭을 하게 되면 폼태그 안에 있는 함수가 실행이 됨
  // handleSubmit은 register로 작성한 데이터를 불러올 수 있음
  // 밑에 빨간줄은 eslintrc 때문에그럼
  return (
    <form onSubmit={wrapAsync(handleSubmit(onClickSubmit))}>
      {" "}
      {/* 새로고침 막으려면 wrapAsync 말고 다른거 가져오거나 eslintrc 끄기 */}
      작성자: <Input01 type="text" register={register("writer")}></Input01>
      <div style={{ color: "red" }}>{errors.writer?.message}</div>
      제목: <Input01 type="text" register={register("title")}></Input01>
      <div style={{ color: "red" }}>{errors.title?.message}</div>
      내용: <Input01 type="password" register={register("contents")} />
      <div style={{ color: "red" }}>{errors.contents?.message}</div>
      <Button01 title="등록하기" isActive={isValid}></Button01>
    </form>
  );
}

/*
    <button type="reset">지우자!!</button>
    <button type="submit">등록하자!!</button> 즉 이 버튼을 누르면 폼태그의 서브밋이 실행
    // 버튼의 기본타입은 서브밋이다! 그래서 버튼에 함수를 넣고 저 폼태그에도 함수를 넣으면 둘다 실행이 됨
    // 즉 버튼의 함수만 실행하고 싶어도 못한다..

  <button type="button" onClick={onClickBasket}>
        장바구니 담기
      </button> // 그래서 버튼 타입에 버튼을 하면 이 버튼에 있는 함수만 실행이 된다!

*/
