import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState, ChangeEvent } from "react";
import BoardWriteUI from "./BoardWrite.presenter";
import { 나의그래프큐엘셋팅, UPDATE_BOARD } from "./BoardWrite.queries";
import { IBoardWriteProps, IMyVariables } from "./boardWrite.types";

// 체인이벤트는 온 체인지 했을떄의 타입을 알아서 정해줌

export default function BoardWrite(props: IBoardWriteProps) {
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

    router.push(
      `/section10/10-04-typescript-boards/${result.data.createBoard.number}`
    );
    //  result.data.createBoard.number 게시글 번호
  };

  const onClickUpdate = async () => {
    const myVariables: IMyVariables = {
      number: Number(router.query.number),
    };

    if (writer) {
      myVariables.writer = writer;
    }
    if (title) {
      myVariables.title = title;
    }
    if (contents) {
      myVariables.contents = contents;
    }

    const result = await updateBoard({
      variables: myVariables,
    });
    router.push(
      "/section10/10-04-typescript-boards/" + result.data.updateBoard.number
    );
    console.log(result);
    console.log(result.data.updateBoard.number);
  };

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  // html인풋태그가 체인지 됐을떄의 타입이ㅏㄷ. 그게 바로 체인이벤트 html인풋태그이다.
  const onChangeContents = (event: ChangeEvent<HTMLInputElement>) => {
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
        data={props.data} // undefined 이거나, data 이거나 둘 중 하나 ? 왜 작성자 페이지에는 data가 없어서
      ></BoardWriteUI>{" "}
      // 이렇게 담겨짐
      <div>$$$$$$여기는 컨테이너 입니다.</div>
    </div>
  );
}
