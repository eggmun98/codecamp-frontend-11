import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMoveToPageMode } from "../../../commons/hooks/customs/useMoveToPageMode";

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
  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      alert("로그인 후 이용 가능합니다.");
      void router.push("/boards");
    }
  }, []);

  const { data } = useQuery(FETCH_USED_ITEMS);
  const router = useRouter();
  console.log("리스트 상품 data: ", data);

  const { onClickMoveToPage } = useMoveToPageMode();
  return (
    <>
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

      <div>
        <button onClick={onClickMoveToPage("/markets/new")}>상품 등록</button>
      </div>
    </>
  );
}
