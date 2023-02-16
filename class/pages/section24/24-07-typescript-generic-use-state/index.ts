// 제공자
export function useState<S>(초기값: S): [S, (변경값: S) => void] {
  // 초기값에 10넣으면 S는 넘버타입으로 철수넣으면 S는 스트링타입으로
  let state = 초기값;
  const setState = (변경값: S): void => {
    state = 변경값;
    console.log(`${state}에서 ${변경값}으로 값을 변경하겠습니다!!`); // 1. state 변경하기
    console.log(`변경된${변경값}을 사용해서 컴포넌트를 리렌더링 하겠습니다!!`); // 2. 해당 컴포넌트를 리렌더링 시키기(render함수)
  };
  return [state, setState];
}

// 사용자
const [count, setCount] = useState(10); // any타입 이였으면 리턴타입이 뭔지 몰랐다!
