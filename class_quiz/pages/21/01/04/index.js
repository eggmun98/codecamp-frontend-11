import { useState } from "react";

export default function qqqPage() {
  const [state, setState] = useState(0);

  const qqq = () => {
    setState((qwer) => qwer + 1);
  };

  return <div onClick={qqq}>{state}</div>;
}
