import { gql, useQuery } from "@apollo/client";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useMoveToPageMode } from "../../../commons/hooks/customs/useMoveToPageMode";
import { useAuth } from "../../../commons/hooks/customs/useAuth";
import _ from "lodash";
import { IBoard } from "../../../commons/types/generated/types";
import * as L from "./liststyles";

const FETCH_USED_ITEMS = gql`
  query fetchUseditems($page: Int, $search: String) {
    fetchUseditems(page: $page, search: $search) {
      _id
      name
      remarks
      contents
      price
      tags
      seller {
        name
      }
      images
    }
  }
`;

const ramen = [
  "/ramen.jpeg",
  "/ramen1.jpeg",
  "/ramen2.jpeg",
  "/ramen3.jpeg",
  "/ramen4.jpeg",
  "/ramen5.jpeg",
  "/ramen6.jpg",
  "/ramen7.jpg",
  "/ramen8.jpeg",
  "/ramen9.jpeg",
  "/ramen10.jpeg",
];

export default function MarKetListPage() {
  useAuth();

  const { data, fetchMore, refetch } = useQuery(FETCH_USED_ITEMS);

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
  };

  // 오늘 본 상품
  const onClickBesket = (basket: IBoard) => () => {
    // 1. 기존에 본 상품 가져오기!
    const baskets: IBoard[] = JSON.parse(
      localStorage.getItem("baskets") ?? "[]"
    );

    // 2. 이미 담겼는지 확인하기!!
    const temp = baskets.filter((el) => el._id === basket._id);
    if (temp.length >= 1) {
      // temp의 길이가 1이상이거나 같다면 오류메세지 띄우기!!
      alert("이미 담으신 물품 ㅇ비니다!!");
      return;
    }

    // const { __typename, ...rest } = baskets.push(basket);
    // 3. 내가 클릭한거 추가하기
    baskets.push(basket);

    // 4. 추가된 상품 저장하기
    localStorage.setItem("baskets", JSON.stringify(baskets));
    // return basket;
  };

  const [baskets, setBaskets] = useState();

  useEffect(() => {
    // Perform localStorage action
    setBaskets(JSON.parse(localStorage.getItem("baskets") ?? "[]"));
  }, []);

  return (
    <L.MainWrapper>
      <L.SearchInput
        type="text"
        onChange={onChangeSearch}
        placeholder="🔎  상품 검색"
      ></L.SearchInput>
      <div>
        <button onClick={onClickMoveToPage("/markets/new")}>상품 등록</button>
        <button>필터</button>
      </div>
      <L.Scroll pageStart={0} loadMore={onLoadMore} hasMore={true}>
        {data?.fetchUseditems.map((el) => (
          <L.ProductWrapper
            id={el._id}
            onClick={onClickMoveToPage("/markets/market/" + el._id)}
            key={el._id}
          >
            <L.ImageWrapper
              src={
                el.images[0]
                  ? `https://storage.googleapis.com/${el.images[0]}`
                  : `${ramen[Math.floor(Math.random() * 10)]}`
              }
            ></L.ImageWrapper>

            <div>{el.name}</div>
            <div>{el.price}원</div>
            <button onClick={onClickBesket(el)}>오늘 본 상품</button>
          </L.ProductWrapper>
        )) ?? <div></div>}
      </L.Scroll>
    </L.MainWrapper>
  );
}
