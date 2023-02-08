import { useQuery, gql } from "@apollo/client";
import type {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/types";
import InfiniteScroll from "react-infinite-scroller";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      contents
    }
  }
`;
// 패치모어는 기존꺼 냅두고 추가로 더 패치하는거
export default function StaticRoutingMovedPage(): JSX.Element {
  const { data, fetchMore } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);
  // console.log(data?.fetchBoards.length);

  const onLoadMore = (): void => {
    if (data === undefined) return;
    void fetchMore({
      variables: {
        page: Math.ceil((data?.fetchBoards.length ?? 10) / 10) + 1, // ...fetchMoreResult.fetchBoards
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        // 업데이트 쿼리는 계속 업데이트 해준다!
        // 여기서 prev는 위에 data를 가져온거고 fetchMoreResult는 새로운 data다 즉 다음 데이터인 다음 페이지이다!
        console.log(prev.fetchBoards);
        if (fetchMoreResult.fetchBoards === undefined) {
          // 만약 마지막 페이지 일 경우는 이전 게시글을 불러온다!!
          return {
            fetchBoards: [...prev.fetchBoards],
          };
        }

        return {
          fetchBoards: [...prev.fetchBoards, ...fetchMoreResult.fetchBoards], // 업데이트한 패치보더를 40개로 바꿔치기 해줘
        }; // 그래서 전체게시글은 이전 게시글 수 + 다음 게시글을 더한거다!
      },
    });
  };
  // prev.fetchBoards 여기에 10개담음
  // ?? <div></div>는 infiniteScoll가 자식이 필요한데 data가 없을때 자식이 없으니 ?? <div></div>라도 줘서 빈값이라도 줘서 자식을 만들어 주는거
  return (
    <div>
      <InfiniteScroll pageStart={0} loadMore={onLoadMore} hasMore={true}>
        {data?.fetchBoards.map((el) => (
          <div key={el._id}>
            <span style={{ margin: "10px" }}>{el.title}</span>
            <span style={{ margin: "10px" }}>{el.writer}</span>
          </div>
        )) ?? <div></div>}
      </InfiniteScroll>
    </div>
  );
}
