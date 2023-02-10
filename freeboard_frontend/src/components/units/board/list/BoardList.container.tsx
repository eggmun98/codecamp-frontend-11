import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { FETCH_BOARDS, FETCH_BOARD_COUNT } from "./BoardList.queries";
import BoardListUI from "./BoardList.presenter";
import { ChangeEvent, MouseEvent, useState } from "react";
import _ from "lodash";

export default function BoardListPage() {
  const router = useRouter();

  const [qqq, setQqq] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [myindex, setMyindex] = useState(1);

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

  const getDebounce = _.debounce((search) => {
    refetch({ page: 1, search: search });
    setKeyword(search);
  }, 500);

  const onChangeSearchButton = (event: ChangeEvent<HTMLInputElement>): void => {
    getDebounce(event.target.value);
  };

  return (
    <BoardListUI
      qqq={qqq}
      refetch={refetch}
      count={dataCount?.fetchBoardsCount}
      onClickListButton={onClickListButton}
      onClickWriterButton={onClickWriterButton}
      data={data}
      dataCount={dataCount}
      onChangeSearchButton={onChangeSearchButton}
      keyword={keyword}
      // myindex={myindex}
      // setMyindex={setMyindex}
    ></BoardListUI>
  );
}
