import { useState } from "react";

export default function Page0202() {
  const [count, setCount] = useState(0);

  function counter() {
    setCount(count + 1);
  }

  return (
    <div>
      <div>{count}</div>
      <button onClick={counter}>카운트증가</button>
    </div>
  );
}
