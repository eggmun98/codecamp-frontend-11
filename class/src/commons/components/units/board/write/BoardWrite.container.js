import { useMutation } from "@apollo/client";
import { useState } from "react";
import BoardWriteUI from "./BOardWrite.presenter"; // 중괄호가 없는 애들은 export default 인거는 안적는다
// 왜? default는 하나밖에 못쓰기 때문 즉 디펄트는 한개밖에 없다. 그리고 BoardWriterUI의 이름을 마음대로 바꿔서 쓸수 있음
// 어짜피 하나이기 때문에 이름을 바꿨으면 아래에 return 태그부분도 이름 바꿔줘야함
// ex) import abcdefg from "./BOardWrite.presenter"
// 근데 BoardWrite.presenter에 export default와 export가 두개가 있으면 export는 중괄호를 통해서
// 골라 가져오기 하면 된다.
// export가 너무 많아서 다 적기 귀찮으니 한번에 가져오는 법이 있음 // 특히 스타일 파일 같은거는 편하다.
// ex) import * as QQQ from `./BoardWrite.styles` QQQ는 개발자가 정하는 이름 이러면 모든 export 가져옴

import { 나의그래프큐엘셋팅 } from "./BoardWrite.queries"; // export는 골라서 가져오기 가능 또 다른 export도 가능하다는 뜻

export default function BoardWrite() {
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
        aaa={onClickSubmit} //즉 이것들은 props라는 상자에 담겨짐
        bbb={onChangeWriter} // props = {aaa:onCLickSubmit,
        ccc={onChangeTitle} //           bbb:onChangeWriter,
        ddd={onChangeContents} //   ccc:onChangeTitle  , ddd:onChangeContents  }
      ></BoardWriteUI>{" "}
      // 이렇게 담겨짐
      <div>$$$$$$여기는 컨테이너 입니다.</div>
    </div>
  );
}
