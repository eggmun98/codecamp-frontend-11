import { useState } from "react";

export default function PrevstatePage() {
  const [state, setState] = useState(0);

  function sumAll() {
    setState((qqq) => qqq + 1);
    setState((qqq) => qqq + 2);
    setState((qqq) => qqq + 3);
    setState((qqq) => qqq + 4);
  }

  return (
    <>
      <div>결과는: {state}</div>
      <button onClick={sumAll}>실행!</button>
    </>
  );
}
