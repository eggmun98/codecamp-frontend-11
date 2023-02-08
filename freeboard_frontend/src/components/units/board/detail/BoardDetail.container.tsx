import { ChangeEvent, MouseEvent, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import BoardDetailUI from "./BoardDetail.presenter";
import { FETCH_BOARD, DELETE_BOARD } from "./BoardDetail.queries";
import {
  IMutation,
  IMutationCreateBoardArgs,
  IMutationDeleteBoardCommentArgs,
  IQuery,
  IQueryFetchBoardArgs,
} from "../../../commons/types/generated/types";

interface IBoardDetailPage {
  opa: number;
}

export default function BoardDetailPage() {
  const router = useRouter();

  const [opa, setOpa] = useState(0);
  const [up, setUp] = useState(0);
  const [down, setDown] = useState(0);

  // 게시글 쿼리
  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: router.query.num,
    },
  });

  // 뮤테이션 불러오기
  const [deleteBoard] = useMutation(DELETE_BOARD);

  // 현 게시글 삭제하는 버튼
  const onClickDeleteButton = async () => {
    await deleteBoard({
      variables: {
        boardId: router.query.num,
      },
    });
    router.push("/boards"); // 임시로 새로고침
  };

  // 수정페이지로 가는 버튼
  const onClickEditBUtton = () => {
    router.push("/boards/board/" + router.query.num + "/edit");
  };

  // 리스트 페이지로 가는 버튼
  function onClickListButton() {
    router.push("/boards/");
  }

  // 위에 주소 닫기 열기 버튼
  function onPoint() {
    // document.getElementById("happy").style.opacity = 0;
    if (opa === 0) {
      setOpa(1);
    } else if (opa === 1) {
      setOpa(0);
    }
  }

  // 임시로 만든 업 다운 버튼
  function onClickUp() {
    setUp(up + 1);
  }

  function onClickDown() {
    setDown(down + 1);
  }

  return (
    <BoardDetailUI
      opa={opa}
      up={up}
      down={down}
      data={data}
      onPoint={onPoint}
      onClickUp={onClickUp}
      onClickDown={onClickDown}
      onClickListButton={onClickListButton}
      onClickDeleteButton={onClickDeleteButton}
      onClickEditBUtton={onClickEditBUtton}
    ></BoardDetailUI>
  );
}
