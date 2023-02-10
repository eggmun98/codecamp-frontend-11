import { useEffect, useRef, useState } from "react";

export default function useRefPage() {
  const qqq = useRef(null);
  const onChangeFn = () => {
    qqq.current.click();
  };

  useEffect(() => {
    qqq.current.focus();
  }, []);

  return (
    <>
      비밀번호를 입력하세요!
      <input type="text" onChange={onChangeFn} ref={qqq}></input>
    </>
  );
}
