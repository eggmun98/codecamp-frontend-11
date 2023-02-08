import { useState } from "react";
import PropsSubPage from "../test2";

export default function PropsMainPage() {
  const [count, setCount] = useState(0);

  const onClickCount = () => {
    setCount(count + 1);
  };

  return (
    <PropsSubPage onClickCount={onClickCount} count={count}></PropsSubPage>
  );
}
