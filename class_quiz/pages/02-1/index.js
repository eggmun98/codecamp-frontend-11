import { useState } from "react";

export default function Page0102() {
  const [name, setName] = useState("안녕하세요");

  function abc() {
    setName("반갑습니다.");
  }

  return <button onClick={abc}>{name}</button>;
}
