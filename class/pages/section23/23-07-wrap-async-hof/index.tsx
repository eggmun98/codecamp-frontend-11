import { useMutation, gql } from "@apollo/client";
import { wrapAsync } from "../../../src/commons/components/commons/libraries/asyncFunc";
const 나의그래프큐엘셋팅 = gql`
  mutation createBoard($writer: String, $title: String, $contents: String) {
    createBoard(writer: $writer, title: $title, contents: $contents) {
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutationPage(): JSX.Element {
  const [나의함수] = useMutation(나의그래프큐엘셋팅);

  const onClickSubmit = async (): Promise<void> => {
    const result = await 나의함수();
    console.log(result);
  };

  // "@typescript-eslint/no-misused-promises": "off", eslintrc의 이것을 해결하기 위해서
  //
  // export const wrapAsync = (asyncFunc: () => Promise<void>) => () => {
  //     void asyncFunc();
  //   };
  // 이렇게 랩함수안에 함수를 감싸준다 그러면 해결이 된다.
  // 함수를 감싸준다고해서 wrapAsync 라고 하였다.
  // asyncFunc()는 비동기 함수이다.
  // 그리고 이것을 다른데서도 써주기 위해서 라이브러리에 이 함수를 만들고
  // import 해왔다.
  // 이게 싫다면 그냥 eslintrc에서 off하면 된다! 그게 아니라면 위의 방식으로 해야 한다!

  return (
    <button onClick={wrapAsync(onClickSubmit)}>graphql-api 요청하기</button>
  );
}
