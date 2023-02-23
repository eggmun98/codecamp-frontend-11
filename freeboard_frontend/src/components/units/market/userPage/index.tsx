import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Script from "next/script";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../commons/hooks/customs/useAuth";
import { useMoveToPageMode } from "../../../commons/hooks/customs/useMoveToPageMode";
import { IQuery } from "../../../commons/types/generated/types";

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

declare const window: typeof globalThis & {
  IMP: any;
}; // 윈도우 안에 IMP 타입을 정해주는거임 즉 카카오 맵 라이브러리도 똑같음

export default function UserPage() {
  useAuth();
  const { data } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);

  const { register, handleSubmit } = useForm();

  const { onClickMoveToPage } = useMoveToPageMode();

  const [create_pint_transaction_of_loading] = useMutation(
    CREATE_POINT_TRANSACTION_OF_LOADING
  );

  const router = useRouter();

  // const onClickPoint = async (q) => {
  //   const result = await create_pint_transaction_of_loading({
  //     variables: {
  //       amount: Number(q),
  //     },
  //   });
  //   alert("충전하였습니다.");
  // };

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
          console.log(rsp);
          router.push("/markets/userPage");
          const onClickPoint = async (datas) => {
            const result = await create_pint_transaction_of_loading({
              variables: {
                impUid: "imp_417165449155",
              },
            });
            alert("충전하였습니다.");
          };
          onClickPoint(datas.point);

          // 백엔드에 결제 관련 데이터 넘겨주기!! => 뮤테이션 실행하기 // createPointTransactionOfLoading( 요청할때 아임포트 키를 넣어야함
        } else {
          // 결제 실패 시 로직,
        }
      }
    );
  };

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
    </div>
  );
}
