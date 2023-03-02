import { memo } from "react";

interface IWordProps {
  el: string;
}

function Word(props: IWordProps): JSX.Element {
  console.log("자식이 렌더링 됩니다.", props.el);

  return <span>{props.el}</span>;
}

export default memo(Word);

// 이렇게만 한다면 원래 리렌더링 5개였는데 3개로 줄일 수 있음!!!!
