import * as L from "./List.styles";
import InfiniteScroll from "react-infinite-scroller";

export default function ListUiPage(props) {
  return (
    <>
      <L.MainWrapper>
        <InfiniteScroll
          pageStart={0}
          loadMore={props.onInfiniteScrollButton}
          hasMore={true}
          useWindow={false}
        >
          {props.data?.fetchBoards.map((el) => (
            <L.List key={el._id} id={el._id} onClick={props.onClickListButton}>
              <L.Title>{el.title}</L.Title>
              <L.Day> {el.createdAt.slice(0, 10).replaceAll("-", ".")}</L.Day>
            </L.List>
          )) ?? <div></div>}
        </InfiniteScroll>
      </L.MainWrapper>
    </>
  );
}
