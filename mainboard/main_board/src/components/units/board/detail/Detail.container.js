import { useRouter } from "next/router";
import DetailUiPage from "./Detail.presenter";
import { useQuery, useMutation } from "@apollo/client";
import { FETCH_BOARD, DELETE_BOARD } from "./Detail.queries";

export default function DetailPage() {
  const router = useRouter();

  const [deleteBoard] = useMutation(DELETE_BOARD);

  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: router.query.number,
    },
  });

  // const { data } = useQuery(FETCH_BOARD);

  const onClickDeleteButton = async () => {
    await deleteBoard({
      variables: {
        boardId: router.query.number,
      },
    });
    router.push("/");
  };

  const onClickListButton = () => {
    router.push("/");
  };

  const onClickEditBUtton = () => {
    router.push("/board/" + router.query.number + "/edit");
  };
  return (
    <>
      <DetailUiPage
        data={data}
        onClickDeleteButton={onClickDeleteButton}
        onClickListButton={onClickListButton}
        onClickEditBUtton={onClickEditBUtton}
      ></DetailUiPage>
    </>
  );
}
