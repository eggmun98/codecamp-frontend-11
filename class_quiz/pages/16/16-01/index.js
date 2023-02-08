import { useQuery, gql } from "@apollo/client";
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
// refetch쿼리는 뮤테이션 이후에 하는거고
// 그냥 리패치는 언제든지 사용가능 데이터 옆에 리패치 적으면 됨
export default function StaticRoutingMovedPage() {
  const { data, fetchMore } = useQuery(FETCH_BOARDS);
  console.log(data?.fetchBoards);

  const onLoadMore = () => {
    if (data === undefined) return;
    fetchMore({
      variables: {
        page: Math.ceil(data?.fetchBoards.length ?? 10 / 10) + 1,
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
    <div style={{ height: "100%", overflow: "auto" }}>
      <InfiniteScroll
        pageStart={0}
        loadMore={onLoadMore}
        hasMore={true}
        useWindow={false}
      >
        {data?.fetchBoards.map((el) => (
          <div key={el._id}>
            <span style={{ margin: "10px" }}>{el.title}</span>
            <span style={{ margin: "10px" }}>{el.writer}</span>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}
