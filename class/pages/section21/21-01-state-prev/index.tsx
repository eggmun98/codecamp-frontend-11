import { useState } from "react";

export default function CountLetDacumentPage(): JSX.Element {
  const [count, setCount] = useState(0);

  function onClickCountUp(): void {
    // 1. 화살표함수
    setCount((prev) => prev + 1);

    // 2. 함수선언식
    setCount(function (prev) {
      return prev + 1;
      // 로직 추가 가능
      // if() 등
      // for() 등
      // ...
    });

    // 3. 매개변수 바꾸기
    setCount((qqq) => qqq + 1);
  }

  return (
    <div>
      <div>{count}</div>
      <button onClick={onClickCountUp}>카운트 올리기!!!</button>
    </div>
  );
}
