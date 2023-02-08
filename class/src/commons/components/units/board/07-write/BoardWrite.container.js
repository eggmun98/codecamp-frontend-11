import { useMutation } from "@apollo/client";
import { useState } from "react";
import BoardWriteUI from "./BoardWrite.presenter"; // 중괄호가 없는 애들은 export default 인거는 안적는다
// 왜? default는 하나밖에 못쓰기 때문 즉 디펄트는 한개밖에 없다. 그리고 BoardWriterUI의 이름을 마음대로 바꿔서 쓸수 있음
// 어짜피 하나이기 때문에 이름을 바꿨으면 아래에 return 태그부분도 이름 바꿔줘야함
// ex) import abcdefg from "./BOardWrite.presenter"
// 근데 BoardWrite.presenter에 export default와 export가 두개가 있으면 export는 중괄호를 통해서
// 골라 가져오기 하면 된다.
// export가 너무 많아서 다 적기 귀찮으니 한번에 가져오는 법이 있음 // 특히 스타일 파일 같은거는 편하다.
// ex) import * as QQQ from `./BoardWrite.styles` QQQ는 개발자가 정하는 이름 이러면 모든 export 가져옴

import { 나의그래프큐엘셋팅 } from "./BoardWrite.queries"; // export는 골라서 가져오기 가능 또 다른 export도 가능하다는 뜻

export default function BoardWrite() {
  const [isActive, setIsActive] = useState(false);

  const [writer, setWriter] = useState();
  const [title, setTitle] = useState();
  const [contents, setContents] = useState();

  const [나의함수] = useMutation(나의그래프큐엘셋팅);

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
  };

  const onChangeWriter = (event) => {
    setWriter(event.target.value);
    if (event.target.value && title && contents) {
      setIsActive(true);
    }
  };
  // 먼저 이 함수가 실행이 될텐데
  // a라는 글자를 쳤으면 에이는 임시 저장소에 저장
  // 그리고 밑에 이프문 실행
  // 그러고 나서 writer은 a로 바뀜
  // 그래서 저 함수는 두글자 이상 쳐야 실행이 되는거임
  // 왜? writer이 뒤늦게 글자가 바꼈으니
  // 그러고나서 이프문을 실행을 하니
  // 그래서 if문에 writer대신
  // event.target.value를 넣어야함
  // 즉 if( event.target.value %% title && contents)
  // 이렇게 써야함

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
    if (writer && event.target.value && contents) {
      setIsActive(true);
    }
  };

  const onChangeContents = (event) => {
    setContents(event.target.value);
    if (writer && title && event.target.value) {
      setIsActive(true);
    }
  };

  return (
    <div>
      <div>$$$$$$$$j여기는 컨테이너 입니다.</div>
      <BoardWriteUI
        onClickSubmit={onClickSubmit} //즉 이것들은 props라는 상자에 담겨짐
        onChangeWriter={onChangeWriter} // props = {aaa:onCLickSubmit,
        onChangeTitle={onChangeTitle} //           bbb:onChangeWriter,
        onChangeContents={onChangeContents} //   ccc:onChangeTitle  , ddd:onChangeContents  }
        isActive={isActive}
      ></BoardWriteUI>{" "}
      // 이렇게 담겨짐
      <div>$$$$$$여기는 컨테이너 입니다.</div>
    </div>
  );
}
