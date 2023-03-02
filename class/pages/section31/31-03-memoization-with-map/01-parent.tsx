import { useState } from "react";
import Word from "./02-child";
import { v4 as uuidv4 } from "uuid";

export default function MemoizationParentWithMapPage(): JSX.Element {
  const [data, setData] = useState("철수는 오늘 점심을 맛있게 먹었습니다.");

  const onClickChange = (): void => {
    setData("영희는 오늘 저녁을 맛없게 먹었습니다.");
  };

  return (
    <>
      {/* {data.split(" ").map((el, index) => (
        <Word key={index} el={el}></Word> // 1. memo시, key 또는 el이 변경된 부분만 리렌덩리 됨(즉, "오늘", "먹었습니다"는 제외!!)
      ))} */}

      {data.split(" ").map((el, index) => (
        <Word key={uuidv4()} el={el}></Word> // 잘못 사용된 예 // 키가 계속 바뀌니 항상 리렌더링됨
        // 2. memo를 해도, key 자체가 변겨되어 props로 넘어가므로, 5개 모두 리렌더링 됨
      ))}

      <button onClick={onClickChange}>체인지</button>
    </>
  );
}
