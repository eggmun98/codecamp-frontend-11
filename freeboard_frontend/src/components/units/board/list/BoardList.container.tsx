import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { FETCH_BOARDS, FETCH_BOARD_COUNT } from "./BoardList.queries";
import BoardListUI from "./BoardList.presenter";
import { MouseEvent, useState } from "react";

export default function BoardListPage() {
  const router = useRouter();

  // 게시글 쿼리
  const { data, refetch } = useQuery(FETCH_BOARDS);

  console.log(refetch);

  // 게시글 갯수 쿼리
  const { data: dataCount } = useQuery(FETCH_BOARD_COUNT);

  // 게시글 들어가는 버튼
  const onClickListButton = (event: MouseEvent<HTMLDivElement>) => {
    router.push(`/boards/board/${event.currentTarget.id}`);
  };

  // 작성하기 가는 버튼
  const onClickWriterButton = () => {
    router.push("/boards/new");
  };

  // const [startPage, setStartPage] = useState(1);
  // const lastPage = Math.ceil(dataCount?.fetchBoardsCount ?? 10) / 10;

  // console.log(dataCount.fetchBoardsCount);

  // const onClickPageButton = (event: MouseEvent<HTMLButtonElement>) => {
  //   refetch({ page: Number(event.currentTarget.id) });
  // };

  // const onClickNextPage = () => {
  //   if (startPage + 10 <= lastPage) {
  //     setStartPage(startPage + 10);
  //     refetch({ page: startPage + 10 });
  //   }
  // };

  // const onClickPrevPage = () => {
  //   if (startPage === 1) return;
  //   setStartPage(startPage - 10);
  //   refetch({ page: startPage - 10 });
  // };

  return (
    <BoardListUI
      refetch={refetch}
      count={dataCount?.fetchBoardsCount}
      onClickListButton={onClickListButton}
      onClickWriterButton={onClickWriterButton}
      data={data}
      dataCount={dataCount}
    ></BoardListUI>
  );
}
