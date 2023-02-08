import { Component, useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { StoreWriter } from "@apollo/client/cache/inmemory/writeToStore";

export default function FunctionalCounterPage(): JSX.Element {
  // 클래스형을 함수형으로 바꾸는 과정!!

  const [count, setCount] = useState(0);
  const router = useRouter();

  // componentDidMount와 동일
  useEffect(() => {
    console.log("그려지고 나서 실행");
  }, []);
  // 배열이 있는 이유는 처음 한번만 실행이 되고 즉 배열안에 들어간 값이 바꼈을떄 재실행이 됨
  // 즉 배열이 없으면 아무거나 바껴도 실행이 됨 즉 []안에 count를 넣어보면 count 값이 바뀔 떄 실행이 됨
  // 즉 []는 의존성배열(dependency-array)디펜드시 어웨이라고 한다!!

  // componentDidMount + componentDidUpdate와 동일 즉 한번 그려지고 나서  바로 DidUpdate실행
  useEffect(() => {
    console.log("변경되고 나서 실행!!");
  });

  useEffect(() => {
    // componentWillUnmount와 동일
    return () => {
      console.log("사라지기 전에 실행");
    };
  }, []);

  // 1. useEffect 하나로 합치기!!
  useEffect(() => {
    console.log("그려지고 나서 실행");
    return () => {
      console.log("사라지기 전에 실행");
    };
  });

  // useEffect는 결국엔 랜더링 되고나서 실행이 되는거

  // 2. useEffect 잘못된 사용법 // 추가 렌더링이 되버려서 안좋음 왜? 카운터를 실행 했어 근데
  // useEffect(() => {
  //   setCount((prev) => prev +1);  // 이러면 계속 렌더링이 되버려서 무한 루프에 빠지게 됨
  // }, [count]);                // 왜? count가 값이 변경이 되면 setCount도 다시 리렌더링 되고 이렇게 무한 루프

  const onClickCountUp = (): void => {
    setCount(1);
  };

  const onClickMove = (): void => {
    void router.push("/");
  };

  console.log("나는 언제 실행되게~?"); // 콘솔로그 찍어보면 useEffect보다 먼저 찍혀 있을거임
  // 왜? useEffect는 랜덩링 되고 나서 실행이 되기 때문에

  return (
    <>
      <div>{count}</div>
      <button onClick={onClickCountUp}>카운트 올리기!!</button>
      <button onClick={onClickMove}>나가기!!</button>
    </>
  );
}
