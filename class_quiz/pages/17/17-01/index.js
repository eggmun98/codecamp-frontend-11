import { useEffect, useState } from "react";
import Router from "next/router";

export default function qqqPage() {
  const [isChanged, setIsChanged] = useState(false);

  // 변경 버튼
  const onClickB = () => {
    setIsChanged(true);
  };

  // 이동 버튼
  const onClickA = () => {
    Router.push("/");
  };

  // 5번 랜더링이 되고나서 경고 메세지
  useEffect(() => {
    alert("Rendered!");
  }, []);

  // 6번 변경 버튼을 클릭하면 경고메세지 나오기
  useEffect(() => {
    alert("Changed!!");
  }, [isChanged]);

  // 7번 이동 버튼 클릭후 경고메세지 바이 출력
  useEffect(() => {
    return () => {
      alert("Bye!!");
    };
  }, []);

  return (
    <>
      <button onClick={onClickB}>변경</button>
      <button onClick={onClickA}>이동</button>
    </>
  );
}
