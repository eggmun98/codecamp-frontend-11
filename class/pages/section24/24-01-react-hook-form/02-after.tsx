import { useForm } from "react-hook-form";

interface IFormData {
  writer: string;
  title: string;
  contents: string;
  boardAddress: {
    addressDetail: string;
  };
}

export default function GraphqlMutationPage(): JSX.Element {
  const { register, handleSubmit } = useForm<IFormData>();

  const onClickSubmit = async (data: IFormData): void => {
    console.log(data);
  };

  console.log("리렌더링 되나요?");

  // form태그는 클릭을 하게 되면 폼태그 안에 있는 함수가 실행이 됨
  // handleSubmit은 register로 작성한 데이터를 불러올 수 있음
  // 밑에 빨간줄은 eslintrc 때문에그럼
  return (
    <form onSubmit={handleSubmit(onClickSubmit)}>
      작성자: <input type="text" {...register("writer")} />
      제목: <input type="text" {...register("title")} />
      내용: <input type="text" {...register("contents")} />
      주소: <input type="text" {...register("boardAddress.addressDetail")} />
      <button type="submit">GRAPHQL-API 요청하기</button>
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
