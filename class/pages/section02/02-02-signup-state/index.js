import { useState } from "react";

export default function SignupState() {
  const [email, setEmail] = useState("");
  const [password, setPasssword] = useState("");

  const [emailError, setEmailError] = useState("아직은 에러가 없습니다.");

  function onChangeEmail(event) {
    console.log(event); // 나의 메뉴
    console.log(event.target); // 작동된 태그
    console.log(event.target.value); // 작동된 태그에 입력된 값
    // 이벤트 속성인 onClick, onCHange 이런 이벤트 핸들러 함수들은 사용하게 되면 event라는 매개변수를 불러오게됨

    setEmail(event.target.value);
  }

  function onChangePassword(event) {
    setPasssword(event.target.value);
  }

  function onClickSignup(event) {
    console.log(email);
    console.log(password);

    // 1. 검증하기
    if (email.includes("@") === false) {
      //   alert("이메일이 올바르지 않습니다!! @가 없음!!");
      //   document.getElementById("myerror").innerText =
      //     "이메일이 올바르지 않습니다! @가 없음!"; 위코드는 옛날 방식이다.
      setEmailError("이메일이 올바르지 않습니다! @가 없습니다.");
    } else {
      // 2. 백엔드 컴퓨터 보내주기(백엔드 개발자가 만든 함수, 즉, api)
      // => 나중에

      // 3. 성공알람 보여주기
      alert("회원가입을 축하드립니다.");
    }
  }

  return (
    <div>
      이메일: <input type="text" onChange={onChangeEmail}></input>
      {/* <div id="myerror"></div> 옛날 방식 */}
      <div>{emailError}</div>
      비밀번호: <input type="password" onChange={onChangePassword}></input>
      <button onClick={onClickSignup}>회원가입</button>
    </div>
  );
}
