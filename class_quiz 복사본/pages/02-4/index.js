import { useState } from "react";
import { RedDev } from "../../styles/index0204";
export default function Page0204() {
  const [email, setEmail] = useState("");
  const [password, setPasssword] = useState("");
  const [password2, setPasssword2] = useState("");

  const [error, setError] = useState("");
  const [error2, setError2] = useState("");

  function emailCheck(event) {
    setEmail(event.target.value);
  }

  function passwordCheck(event) {
    setPasssword(event.target.value);
  }

  function passwordCheck2(event) {
    setPasssword2(event.target.value);
  }

  function onChangeCheck(event) {
    if (email.includes("@") === false) {
      setError("에러입니다.");
    } else {
      setError("");
    }

    if (password !== password2) {
      setError2("에러입니다.");
    } else {
      setError2("");
    }
  }

  return (
    <div>
      이메일: <input type="text" onChange={emailCheck}></input>
      <RedDev>{error}</RedDev>
      비밀번호: <input type="password" onChange={passwordCheck}></input>
      <div></div>
      비밀번호 확인: <input type="password" onChange={passwordCheck2} />
      <RedDev>{error2}</RedDev>
      <button onClick={onChangeCheck}>가입하기</button>
    </div>
  );
}
