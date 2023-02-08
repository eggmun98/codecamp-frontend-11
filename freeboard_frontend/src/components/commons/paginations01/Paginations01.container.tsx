import Paginations01UI from "./Paginations01.presenter";
import { useState } from "react";
import type { MouseEvent } from "react";

export default function Paginations01(props): JSX.Element {
  const [startPage, setStartPage] = useState(1);
  const lastPage = Math.ceil(props.count ?? 10) / 10;
  const [activedPage, setActivedPage] = useState(1);

  const onClickPageButton = (event: MouseEvent<HTMLButtonElement>) => {
    const activedPage = Number(event.currentTarget.id);
    setActivedPage(activedPage);
    props.refetch({ page: Number(event.currentTarget.id) });
  };

  const onClickNextPage = () => {
    if (startPage + 10 <= lastPage) {
      setStartPage(startPage + 10);
      setActivedPage(startPage + 10);
      props.refetch({ page: startPage + 10 });
    }
  };

  const onClickPrevPage = () => {
    if (startPage === 1) return;
    setStartPage(startPage - 10);
    setActivedPage(startPage - 10);
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
