import { useMutation, gql } from "@apollo/client";
import { useState } from "react";
import {
  IMutation,
  IMutationCreateBoardArgs,
} from "../../../src/commons/types/generated/types";
const 나의그래프큐엘셋팅 = gql`
  mutation createBoard($writer: String, $title: String, $contents: String) {
    createBoard(writer: $writer, title: $title, contents: $contents) {
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutationPage() {
  // const [counter, setCounter] = useState<number>(0)  스테이트 변수에 타입 적용법

  // const [나의함수] = useMutation<결과타입, 변수타입>(나의그래프큐엘셋팅);
  //결과 타입은 result 변수타입은 variables
  // 아이뮤테인션에서 픽타입으로 크리에트보드만 뽑아오기
  //Args(아규먼트 즉 인자라는 뜻)
  const [나의함수] = useMutation<
    Pick<IMutation, "createBoard">,
    IMutationCreateBoardArgs
  >(나의그래프큐엘셋팅);
  const onClickSubmit = async () => {
    const result = await 나의함수({
      variables: {
        //variables  이게 $ 역할을 함 즉 $대신 variables를 적을 수 있음
        writer: "훈이",
        title: "안녕하세요!!",
        contents: "반갑습니다",
      },
    });
    console.log(result);
  };

  // 한 줄일때는 괄호() 필요없음
  return <button onClick={onClickSubmit}>graphql-api 요청하기</button>;
}
