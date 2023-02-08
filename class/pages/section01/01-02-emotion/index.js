import { MyEmail, MyInput } from "../../../styles/01-02-emotion";

export default function EmotionPage() {
  // 페이지 앞글자는 대부분 대문자 씀
  //여기는 자바스크립트 쓰는 곳

  // 아래는 html 쓰는 곳
  return (
    <div>
      <MyEmail>이메일: </MyEmail>
      <MyInput text="text"></MyInput>
      <MyInput text="text"></MyInput>
      <MyInput text="text"></MyInput>
      <MyInput text="text"></MyInput>
      <MyInput text="text"></MyInput>
      <button>클릭하세요!</button>
      <img src="/next.svg"></img>
    </div>
  );
}
