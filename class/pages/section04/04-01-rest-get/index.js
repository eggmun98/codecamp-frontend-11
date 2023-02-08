import axios from "axios";
import 나만의페이지 from "../../section01/01-01-example";

export default function RestGetPage() {
  function onClickAsync() {
    const result = axios.get("https://koreanjson.com/posts/1");
    console.log(result); // promise
  }

  // async function onClickSync() {
  //   const result = await axios.get("https://koreanjson.com/posts/1");
  //   console.log(result); // 제대로 된 결과 => {title: "", id: ""}

  const onClickSync = async () => {
    const result = await axios.get("https://koreanjson.com/posts/1");
    console.log(result);
    console.log(result.data.title); // "정당의~~"
  }; // 제대로 된 결과 => {title: "", id: ""}

  return (
    <div>
      <button onClick={onClickAsync}>rest-api(비동기) 요청하기</button>
      <button onClick={onClickSync}>rest-api(동기) 요청하기</button>
      <나만의페이지 />
    </div>
  );
}
