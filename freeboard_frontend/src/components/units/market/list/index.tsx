import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useMoveToPageMode } from "../../../commons/hooks/customs/useMoveToPageMode";
import InfiniteScroll from "react-infinite-scroller";
import { useAuth } from "../../../commons/hooks/customs/useAuth";
import _ from "lodash";

const FETCH_USED_ITEMS = gql`
  query fetchUseditems($page: Int, $search: String) {
    fetchUseditems(page: $page, search: $search) {
      _id
      name
      remarks
      contents
      price
      tags
    }
  }
`;

export default function MarKetListPage() {
  useAuth();

  const { data, fetchMore, refetch } = useQuery(FETCH_USED_ITEMS);

  console.log(data);
  const { onClickMoveToPage } = useMoveToPageMode();

  const getDebounce = _.debounce((value) => {
    void refetch({ search: value, page: 1 }); //  value는 매개변수
  }, 500); // 0.5초 이내에 추가 입력이 없을 시 마지막 1회 실행 즉 0.5초 이내에 추가 입력이 없을 시 api 요청

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    getDebounce(event.currentTarget.value); // event.currentTarget.value를 매개변수로 저 getDebounce함수에 넣으면 됨!!
  };

  const onLoadMore = () => {
    if (data === undefined) return;
    fetchMore({
      variables: {
        page: Math.ceil((data?.fetchUseditems.length ?? 10) / 10) + 1,
      }, //10개의 단위로 1페이지로 나누거라~
      updateQuery: (prev, { fetchMoreResult }) => {
        // console.log(prev);
        if (fetchMoreResult.fetchUseditems === undefined) {
          // 만약 다음 댓글이 없다면 이전 댓글만 보여줘라~
          return {
            fetchUseditems: [...prev.fetchUseditems],
          };
        }
        return {
          fetchUseditems: [
            ...prev.fetchUseditems,
            ...fetchMoreResult.fetchUseditems,
          ],
          // 전체 댓글: 이전 댓글들 + 다음 댓글들
        };
      },
    });
    console.log(data);
  };

  return (
    <>
      <div>
        <button onClick={onClickMoveToPage("/markets/new")}>상품 등록</button>
      </div>
      검색어입력: <input type="text" onChange={onChangeSearch}></input>
      <InfiniteScroll pageStart={0} loadMore={onLoadMore} hasMore={true}>
        {data?.fetchUseditems.map((el, index) => (
          <div
            id={el._id}
            style={{ marginBottom: "20px" }}
            onClick={onClickMoveToPage("/markets/market/" + el._id)}
          >
            <div>상품 명 : {el.name}</div>
            <div>부 상품 명 : {el.remarks} </div>
            <div>가격: {el.price}</div>
            <div>상품 설명: {el.contents}</div>
          </div>
        ))}
      </InfiniteScroll>
    </>
  );
}
