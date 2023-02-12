import Paginations01UI from "./Paginations01.presenter";
import { useState } from "react";
import type { MouseEvent } from "react";

export default function Paginations01(props): JSX.Element {
  const [startPage, setStartPage] = useState(1);
  const lastPage = Math.ceil(props.count / 10);
  const [activedPage, setActivedPage] = useState(1);
  // props.setLastNumber(lastPage);

  console.log(lastPage);
  const onClickPageButton = (event: MouseEvent<HTMLButtonElement>) => {
    const activedPage = Number(event.currentTarget.id);

    // props.setNumber(Number(event.currentTarget.id)); // setNumber에 페이지 값을 담아서 state 끌어 오르기를 통해서 바로부모한테 전달함
    // 그래서 페이지 번호를 나타낼거임!!
    console.log(Number(event.currentTarget.id));
    setActivedPage(activedPage);
    props.refetch({ page: Number(event.currentTarget.id) });
  };

  const onClickNextPage = () => {
    if (startPage + 10 <= lastPage) {
      setStartPage(startPage + 10);
      setActivedPage(startPage + 10); // 이것을 해준 이유는 페이지가 이동하면서 색깔을 바꾸기 위해서 해줌
      props.setNumber(startPage + 10); // 여기에도 setNumber를 해준 이유는 넥스트페이지버튼은 100게시글 단위로 다음 페이지로 넘어가니 이것도 리패치 같은 느낌을 해줘야함!
      props.refetch({ page: startPage + 10 });
    }
  };

  const onClickPrevPage = () => {
    if (startPage === 1) return;
    setStartPage(startPage - 10);
    setActivedPage(startPage - 10); // 이것도 next 방식과 같음
    props.setNumber(startPage - 10); // nextPage 방식과 같음!
    props.refetch({ page: startPage - 10 });
  };

  return (
    <Paginations01UI
      startPage={startPage}
      lastPage={lastPage}
      activedPage={activedPage}
      onClickPrevPage={onClickPrevPage}
      onClickNextPage={onClickNextPage}
      onClickPageButton={onClickPageButton}
    ></Paginations01UI>
  );
}
