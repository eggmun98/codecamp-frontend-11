import ListUiPage from "./List.presenter";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { FETCH_BOARDS } from "./List.queries";

export default function ListSubPage() {
  const router = useRouter();

  const { data, fetchMore } = useQuery(FETCH_BOARDS);

  const onClickListButton = (event) => {
    router.push(`/board/${event.currentTarget.key}`);
  };

  const onInfiniteScrollButton = () => {
    if (data === undefined) return;
    void fetchMore({
      variables: {
        page: Math.ceil((data?.fetchBoards.length ?? 10) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.fetchBoards === undefined) {
          return {
            fetchBoards: [...prev.fetchBoards],
          };
        }

        return {
          fetchBoards: [...prev.fetchBoards, ...fetchMoreResult.fetchBoards],
        };
      },
    });
  };

  return (
    <>
      <ListUiPage
        data={data}
        onClickListButton={onClickListButton}
        onInfiniteScrollButton={onInfiniteScrollButton}
      ></ListUiPage>
    </>
  );
}
