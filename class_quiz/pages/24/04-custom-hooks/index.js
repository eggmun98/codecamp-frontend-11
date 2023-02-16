import { countFun } from "../../../src/commons/components/commons/hocs/countFn";

export default function QuizPage() {
  const { count, onClickCountUp } = countFun();

  return (
    <>
      <div>
        <p>지금의 카운트는 {count} 입니다!</p>
        <button onClick={onClickCountUp}>Count up!</button>
      </div>
    </>
  );
}
