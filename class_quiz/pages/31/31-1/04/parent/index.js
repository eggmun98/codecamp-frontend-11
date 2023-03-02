import { useCallback, useMemo, useState } from "react";
import ChildPage from "../child";

export default function ParentPage() {
  let countLet = 0;
  const [countState, setCountState] = useState(0);

  const State = useMemo(() => {
    console.log(countState + 1);
    setCountState(countState + 1);
  }, []);
  return (
    <>
      <div>카운트(state):{countState} </div>
      <button onClick={State}>카운트(state) +1 올리기</button>
      <ChildPage></ChildPage>
    </>
  );
}
