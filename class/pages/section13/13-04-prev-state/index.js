import { useState } from "react";

export default function CountLetDacumentPage() {
  // let count = 0 // let은 리액트 전용 html에서 변경을 감지하지 못함(따라서, state 써야함)
  const [count, setCount] = useState(0);

  function onClickCountUp() {
    setCount((prev) => prev + 1); // prev는 state의 변수가 임시 저장 공간에 저장한 값을 가져온다. // 처음에는 임시저장소에 값이 없으니 위에 변수선언한 최초값을 가져옴 즉 0
    setCount((prev) => prev + 1); // prev(1) + 1 = 2
    setCount((prev) => prev + 1); // prev(2) + 1 = 3
    setCount((prev) => prev + 1); // prev(3) + 1 = 4
    setCount((prev) => prev + 1); // prev(4) + 1 = 5
  }

  // function onClickCountDown() {
  //   setCount(count - 1);
  // }

  return (
    <div>
      <div>{count}</div>
      <button onClick={onClickCountUp}>카운트 올리기!!!</button>
      {/* <button onClick={onClickCountDown}>카운트 내리기!!!</button>  */}
    </div>
  );
}
