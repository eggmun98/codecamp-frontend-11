import { useRouter } from "next/router";
import { useMutationLikeBoard } from "../mutations/useMutationLikeBoard";
import { FETCH_BOARD } from "../queries/useQueryFetchBoard";

export const useBoardLikeMode = () => {
  const router = useRouter();
  const [like_board] = useMutationLikeBoard();

  // 게시판 좋아요 버튼
  const onClickLikeButton = () => {
    const result = like_board({
      variables: { boardId: router.query.num },
      refetchQueries: [
        {
          query: FETCH_BOARD,
          variables: { boardId: router.query.num },
        },
      ],
    });
  };
  return { onClickLikeButton };
};
