import { useState } from "react";
import * as S from "../../../styles/qqq";

export default function qqqPage() {
  const [count, setCount] = useState(0);
  const [ee, setEe] = useState("");

  const onClickOn = (event) => {
    if (event.target.id === "e") {
      alert("e버튼 통과");
    }
    if (event.target.id === "d") {
      alert("d버튼 통과");
    }
  };

  return (
    <div>
      <S.qqqButtonOff id="a" onClick={onClickOn}>
        <img src="/qqqon.png"></img>
      </S.qqqButtonOff>
      <S.qqqButtonOff id="b" onClick={onClickOn}>
        <img src="/qqqon.png"></img>
      </S.qqqButtonOff>
      <S.qqqButtonOff id="c" onClick={onClickOn}>
        <img src="/qqqon.png"></img>
      </S.qqqButtonOff>
      <S.qqqButtonOff id="d" onClick={onClickOn}>
        <img src="/qqqon.png"></img>
      </S.qqqButtonOff>
      <S.qqqButtonOff id="e" onClick={onClickOn}>
        <img src="/qqqon.png"></img>
      </S.qqqButtonOff>
    </div>
  );
}
