import axios from "axios";

export default function QuizPage0402() {
  const onClickSync = async () => {
    const { data } = await axios.get("https://koreanjson.com/users"); //get 안적어도됨
    console.log(data);
  };

  return <button onClick={onClickSync}>REST-APi 요청하기</button>;
}
