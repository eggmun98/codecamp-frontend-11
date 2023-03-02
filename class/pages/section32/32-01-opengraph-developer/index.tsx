// 개발자일때 => 디스코드, 카카오톡, 슬랙 등..

import axios from "axios";
import { wrapAsync } from "../../../src/commons/components/commons/libraries/asyncFunc";

export default function OpengraphDeveloperPage(): JSX.Element {
  const onClickEnter = async (): Promise<void> => {
    // 1. 채팅데이터에 주소가 있는지 찾기(ex, http~~로 시작하는 것)
    // 2. 해당 주소로 스크래핑하기
    const result = await axios.get(
      "http://localhost:3000/section32/32-01-opengraph-provider"
    ); // CORS가 허용된 사이트들만 가능 CORS:
    console.log(result.data);

    // 3. 메타태그에서 오픈그래프(op:) 찾기
    console.log(
      result.data.split("<meta").filter((el: string) => el.includes("og:"))
    );

    const qqq = result.data
      .split("<meta")
      .filter((el: string) => el.includes("og:"));

    console.log(qqq[0].split("og:"));
  };

  return (
    <>
      <button onClick={wrapAsync(onClickEnter)}>채팅 입력 후 엔터치기!!</button>
    </>
  );
}
