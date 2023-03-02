import { useRouter } from "next/router";
import { useMutationDisLikeBoard } from "../../mutations/board/useMutationBoardDisLike";
import { FETCH_BOARD } from "../../queries/board/useQueryFetchBoard";

export const useBoardDisLikeMode = () => {
  const router = useRouter();
  const [dislike_board] = useMutationDisLikeBoard();

  // 게시판 싫어요 버튼
  const onClickDisLikeButton = () => {
    const result = dislike_board({
      variables: { boardId: router.query.num },
      refetchQueries: [
        {
          query: FETCH_BOARD,
          variables: { boardId: router.query.num },
        },
      ],
    });
  };
  return { onClickDisLikeButton };
};
