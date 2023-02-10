import { useMutation, gql } from "@apollo/client";
import { useState } from "react";

const sum = gql`
  mutation createBoard($writer: String, $title: String, $contents: String) {
    createBoard(writer: $writer, title: $title, contents: $contents) {
      _id
      number
      message
    }
  }
`;

export default function QuizPage0403() {
  const [qqq] = useMutation(sum);

  const [writer, setWriter] = useState();
  const [title, setTitle] = useState();
  const [contents, setContents] = useState();

  const onClickButton = async () => {
    const abc = await qqq({
      variables: {
        writer: writer, // 왼쪽에 있는게 $writer 인데 variables로 달러표시를 대체해서 생략한거다 그리고 $writer 변수에: 인풋값인 writer을 넣어준거다.
        title: title,
        contents: contents,
      },
    });
    console.log(abc);
  };

  function 작성자(event) {
    setWriter(event.target.value);
  }

  function 제목(event) {
    setTitle(event.target.value);
  }

  function 내용(event) {
    setContents(event.target.value);
  }

  return (
    <div>
      작성자: <input onChange={작성자}></input>
      제목: <input onChange={제목}></input>
      내용: <input onChange={내용}></input>
      <button onClick={onClickButton}>전달하기</button>
    </div>
  );
}
