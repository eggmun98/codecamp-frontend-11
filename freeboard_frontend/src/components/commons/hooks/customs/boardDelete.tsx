import { useRouter } from "next/router";
import { useMutationDeleteBoard } from "../mutations/useMutationDeleteBoard";

export const useBoardDeleteMode = () => {
  const router = useRouter();
  const [deleteBoard] = useMutationDeleteBoard();

  const onClickDeleteButton = async () => {
    await deleteBoard({
      variables: {
        boardId: router.query.num,
      },
    });
    router.push("/boards");
  };
  return { onClickDeleteButton };
};
