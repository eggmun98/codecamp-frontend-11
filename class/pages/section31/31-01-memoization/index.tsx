import { useCallback, useMemo, useState } from "react";

export default function MemeizationPage(): JSX.Element {
  console.log("컴포넌트가 렌더링 되었습니다.");

  let countLet = 0;
  const [countState, setCountState] = useState(0);

  //   const aaa = useMemo(() => {
  //     return Math.random() * 100;
  //   }, []);
  // useMemo 원래 형식인데 아래는 소괄호랑 대괄호 생략한거임!!

  // 1. useMemo로 변수 기억하기
  const aaa = useMemo(() => Math.random() * 100, []);
  console.log(aaa);

  // 2. useCallback으로 함수 기억
  const onClickCountLet = useCallback((): void => {
    console.log(countLet + 1);
    countLet += 1;
  }, []);

  //   const onClickCountLet = (): void => {
  //     console.log(countLet + 1);
  //     countLet += 1;
  //   };

  // 3. useCallback 사용시 주의사항 => state 사용시 주의!!
  const onClickCountState = useCallback((): void => {
    // setCountState(countState + 1); // 이렇게 사용하면 콘솔로그에 계속 1 1 1 1 1 1 1로 찍힐거임
    setCountState((prev) => prev + 1);
  }, []);

  //   4. useMemo로 나만의 useCallback 만들어보기 // useMemo의 리턴값이 함수면!!
  //   const onClickCountLet2 = useMemo(() => {
  //     return (): void => {
  //       setCountState((prev) => prev + 1);
  //     };
  //   }, []);

  //   const onClickCountState = (): void => {
  //     console.log(countState + 1);
  //     setCountState(countState + 1);
  //   };
  return (
    <>
      <div>카운트(let): {countLet}</div>
      <button onClick={onClickCountLet}>카운트(let) +1 올리기</button>

      <div>카운트(state):{countState} </div>
      <button onClick={onClickCountState}>카운트(state) +1 올리기</button>

      <div>카운트(state):{countState} </div>

      {/* 로직과 UI가 합쳐져서 헷갈림 => 유지보수 힘듬, 메모이제이션 더 복잡함 */}
      {/* <button 
        onClick={useCallback((): void => {
          setCountState((prev) => prev + 1);
        }, [])}
      >
        카운트(state) +1 올리기
      </button> */}
    </>
  );
}
