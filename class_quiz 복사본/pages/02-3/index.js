import { useState } from "react";

export default function Page0203() {
  const [count, setCount] = useState("");

  function counter() {
    setCount(String(Math.floor(Math.random() * 1000000)).padStart(6, "0"));
  }

  return (
    <div>
      <div>{count}</div>
      <button onClick={counter}>인증번호 전송</button>
    </div>
  );
}
