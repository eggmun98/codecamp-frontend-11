export default function Child1(props: any): JSX.Element {
  function onClickCountUp(): void {
    props.setCount((perv: number) => perv + 1);
  }

  return (
    <div>
      <div>자식1의 카운트: {props.count}</div>
      <button onClick={onClickCountUp}>카운트 올리기!!!</button>
    </div>
  );
}

// 자식컴포넌트1에서 함수를 만들어서 조작
