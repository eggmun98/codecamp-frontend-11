import { useMutation, gql } from "@apollo/client";
import { useState } from "react";

const 나의그래프큐엘셋팅 = gql`
  mutation createBoard($writer: String, $title: String, $contents: String) {
    createBoard(writer: $writer, title: $title, contents: $contents) {
      _id
      number
      message
    }
  }
`;

// 리팩토링 기술~~
export default function GraphqlMutationPage(): void {
  const [inputs, setInputs] = useState({
    writer: "",
    title: "",
    contents: "",
  });

  const [나의함수] = useMutation(나의그래프큐엘셋팅);

  const onClickSubmit = async () => {
    const result = await 나의함수({
      variables: { ...inputs },
    });
    console.log(result);
  };

  const onChangeInputs = (event) => {
    setInputs((prev) => ({
      ...prev, // prev 대신 ...inputs 쓰는게 좋음 prev지우고 왜나하면 유지보수 측면에서 좋음
      [event.target.id]: event.target.value, // 객체의 키에 들어가는 대괄호는 배열이 아님 즉 키가 된다. 대괄호가 없으면 이상함 오류생김
    }));
  };

  // const onChangeTitle = (event) => {
  //   setInputs({
  //     ...inputs
  //     title: event.target.value,
  //   });
  // };

  // const onChangeContents = (event) => {
  //   setInputs({
  //     ...inputs
  //     contents: event.target.value,
  //   });
  // };

  // 한 줄일때는 괄호() 필요 없음
  return (
    <div>
      작성자: <input type="text" id="writer" onChange={onChangeInputs} />
      제목: <input type="text" id="title" onChange={onChangeInputs} />
      내용: <input type="text" id="contents" onChange={onChangeInputs} />
      <button onClick={onClickSubmit}>GRAPHQL-API 요청하기</button>
    </div>
  );
}
