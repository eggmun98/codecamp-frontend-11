import { gql, useMutation, useQuery } from "@apollo/client";
import { pick } from "lodash";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../commons/hooks/customs/useAuth";
import { useMoveToPageMode } from "../../../commons/hooks/customs/useMoveToPageMode";
import { IMutation, IQuery } from "../../../commons/types/generated/types";

const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      email
      name
      userPoint {
        amount
      }
    }
  }
`;

const CREATE_POINT_TRANSACTION_OF_LOADING = gql`
  mutation createPointTransactionOfLoading($impUid: ID!) {
    createPointTransactionOfLoading(impUid: $impUid) {
      _id
    }
  }
`;

const FETCH_USED_ITEMSL_PICKED = gql`
  query fetchUseditemsIPicked($search: String, $page: Int) {
    fetchUseditemsIPicked(search: $search, page: $page) {
      _id
    }
  }
`;

declare const window: typeof globalThis & {
  IMP: any;
}; // 윈도우 안에 IMP 타입을 정해주는거임 즉 카카오 맵 라이브러리도 똑같음

export default function UserPage() {
  useAuth();
  const { data } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);
  console.log("유즈드쿼리인", data);

  const { register, handleSubmit } = useForm();

  const { onClickMoveToPage } = useMoveToPageMode();

  const [create_pint_transaction_of_loading] = useMutation(
    CREATE_POINT_TRANSACTION_OF_LOADING
  );
  console.log(create_pint_transaction_of_loading);

  const { data: PickData } = useQuery(FETCH_USED_ITEMSL_PICKED);

  console.log("PickData입니다", PickData);

  const router = useRouter();

  console.log;

  const onClickPoint = async (u: string) => {
    const result = await create_pint_transaction_of_loading({
      variables: {
        impUid: u,
      },
    });
    alert("충전하였습니다.");
  };

  // interface IDatas {
  //   point: string;
  // }
  const onClickPayment = (datas): void => {
    const IMP = window.IMP; // 생략 가능
    IMP.init("imp49910675"); // 예: imp00000000a

    IMP.request_pay(
      {
        // param
        pg: "kakaopay",
        pay_method: "card",
        // merchant_uid: "ORD20180131-0000011",  // 주석하면 주문번호가 자동으로 랜덤으로 바뀜 // 실무에서는 주문번호를 만들어야함
        name: "갤럭시s10",
        amount: datas.point,
        buyer_email: data?.fetchUserLoggedIn.email,
        buyer_name: data?.fetchUserLoggedIn.name,
        buyer_tel: "010-4242-4242",
        buyer_addr: "서울특별시 강남구 신사동",
        buyer_postcode: "01181",
        // m_redirect_url: "",  // 모바일에서는 결제시 주소가 바뀜, 따라서 결제 끝나고, 돌아갈 주소 입력해야함
      },
      (rsp: any) => {
        // callback
        if (rsp.success === true) {
          // 결제 성공 시 로직,
          console.log("rep", rsp);
          router.push("/markets/userPage");

          onClickPoint(rsp.imp_uid);
        } else {
          // 결제 실패 시 로직,
        }
      }
    );
  };
  let qqq = "";
  const [aaa, setAaa] = useState();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const getDataLocalStorage = (name) => {
        let localData = JSON.parse(localStorage.getItem(name));
        return localData;
      };

      let localData = getDataLocalStorage("baskets");
      qqq = localData;
      setAaa(localData);
    }
  }, []);

  return (
    <div>
      <div> {data?.fetchUserLoggedIn.name}님의 페이지 입니다.</div>
      <button onClick={onClickMoveToPage("/markets/userPage/passwordEdit")}>
        비밀번호 변경하기
      </button>
      <div> 프로필 사진</div>
      <div> 이름: </div>
      <div> 가입 날짜:</div>
      <div>
        {" "}
        포인트: {data?.fetchUserLoggedIn.userPoint?.amount}원 있습니다.
      </div>
      <div> 이메일: </div>

      <Script
        type="text/javascript"
        src="https://code.jquery.com/jquery-1.12.4.min.js"
      ></Script>
      <Script src="https://cdn.iamport.kr/v1/iamport.js"></Script>
      <form onSubmit={handleSubmit(onClickPayment)}>
        충전 금액:<input {...register("point")}></input>
        <button>충전하기</button>
      </form>

      <div style={{ marginBottom: 30 }}>
        <div>찜한 목록</div>
      </div>

      <div>
        <div>오늘 본 목록</div>

        {aaa &&
          aaa.map((el) => (
            <div>
              <div>이름: {el.name}</div>
              <div>가격: {el.price}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
