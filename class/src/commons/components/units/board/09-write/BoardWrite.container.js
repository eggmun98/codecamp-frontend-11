import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import BoardWriteUI from "./BOardWrite.presenter";
import { 나의그래프큐엘셋팅, UPDATE_BOARD } from "./BoardWrite.queries";

export default function BoardWrite(props) {
  const router = useRouter();

  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const [나의함수] = useMutation(나의그래프큐엘셋팅);
  const [updateBoard] = useMutation(UPDATE_BOARD);

  const onClickSubmit = async () => {
    const result = await 나의함수({
      variables: {
        // variables 이게 $ 역할을 함
        writer: writer,
        title: title,
        contents: contents,
      },
    });
    console.log(result);

    router.push(`/section09/09-03-boards/${result.data.createBoard.number}`);
    //  result.data.createBoard.number 게시글 번호
  };

  const onClickUpdate = async () => {
    // 여기서 수정하기 하자
    const result = await updateBoard({
      variables: {
        number: Number(router.query.number), // 09-03-boards/[number]/edit 주소창에서 number를 받아오기 떄문에 문자열이다 그래서 넘버
        writer: writer,
        title: title,
        contents: contents,
      },
    });
    router.push("/section09/09-03-boards/" + result.data.updateBoard.number);
    console.log(result);
    console.log(result.data.updateBoard.number);
  };

  const onChangeWriter = (event) => {
    setWriter(event.target.value);
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const onChangeContents = (event) => {
    setContents(event.target.value);
  };

  return (
    <div>
      <div>$$$$$$$$j여기는 컨테이너 입니다.</div>
      <BoardWriteUI
        onClickSubmit={onClickSubmit}
        onClickUpdate={onClickUpdate}
        onChangeWriter={onChangeWriter}
        onChangeTitle={onChangeTitle}
        onChangeContents={onChangeContents}
        isEdit={props.isEdit}
      ></BoardWriteUI>{" "}
      // 이렇게 담겨짐
      <div>$$$$$$여기는 컨테이너 입니다.</div>
    </div>
  );
}
