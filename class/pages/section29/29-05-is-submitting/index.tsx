import axios from "axios";
import { wrapAsync } from "../../../src/commons/components/commons/libraries/asyncFunc";

export default function RestGetPage(): JSX.Element {
  const [isSubmitting, setIsSubbmiting] = useState(false);

  // 게시글 등록하기 버튼이라고 가정해보자!
  const onClickSync = async (): Promise<void> => {
    setIsSubbmiting(true); // 연타를 막아주기 위해서

    const result = await axios.get("https://koreanjson.com/posts/1");
    console.log(result);
    console.log(result.data.title);

    setIsSubbmiting(false); // 다시 원상복구
  };

  return (
    <button onClick={wrapAsync(onClickSync)} disabled={isSubmitting}>
      rest-api(동기) 요청하기
    </button>
  );
}
