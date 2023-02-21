import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { useState } from "react";

declare const window: typeof globalThis & {
  IMP: any;
}; // 윈도우 안에 IMP 타입을 정해주는거임 즉 카카오 맵 라이브러리도 똑같음

export default function PaymentPage(): JSX.Element {
  const [qqq, setQqq] = useState(0);
  let aaa: number = 0;

  const router = useRouter();

  const onClickqqq = (event) => {
    if (qqq === 0) {
      alert("결제금액을선택하세요ㄴ");
    }
    setQqq(Number(event.target.id));
  };
  console.log(qqq);

  const onClickPayment = (): void => {
    const IMP = window.IMP; // 생략 가능
    IMP.init("imp56788813"); // 예: imp00000000a

    IMP.request_pay(
      {
        // param
        pg: "kakaopay",
        pay_method: "card",
        // merchant_uid: "ORD20180131-0000011",  // 주석하면 주문번호가 자동으로 랜덤으로 바뀜 // 실무에서는 주문번호를 만들어야함
        name: "갤럭시s23",
        amount: qqq,
        buyer_email: "gildong@gmail.com",
        buyer_name: "홍길동",
        buyer_tel: "010-4242-4242",
        buyer_addr: "서울특별시 강남구 신사동",
        buyer_postcode: "01181",
        m_redirect_url: "http://localhost:3000/section28/28-01-payment", // 모바일에서는 결제시 주소가 바뀜, 따라서 결제 끝나고, 돌아갈 주소 입력해야함
      },
      (rsp: any) => {
        // callback
        if (rsp.success === true) {
          // 결제 성공 시 로직,
          console.log(rsp);
          router.push("/quiz28/last");

          // 백엔드에 결제 관련 데이터 넘겨주기!! => 뮤테이션 실행하기 // createPointTransactionOfLoading( 요청할때 아임포트 키를 넣어야함
        } else {
          // 결제 실패 시 로직,
        }
      }
    );
  };

  return (
    <>
      {/* jQuery */}{" "}
      <Script
        type="text/javascript"
        src="https://code.jquery.com/jquery-1.12.4.min.js"
      ></Script>
      {/* iamport.payment.js */}
      <Script src="https://cdn.iamport.kr/v1/iamport.js"></Script>
      <div>안녕</div>
      <div>
        100원
        <input type="radio" name="aa" id="100" onClick={onClickqqq}></input>
        500원
        <input type="radio" name="aa" id="500" onClick={onClickqqq}></input>
        1000원
        <input type="radio" name="aa" id="1000" onClick={onClickqqq}></input>
        2000원
        <input type="radio" name="aa" id="2000" onClick={onClickqqq}></input>
        5000원
        <input type="radio" name="aa" id="5000" onClick={onClickqqq}></input>
      </div>
      <button onClick={onClickPayment}>결제하기</button>;
    </>
  );
}

// imp56788813
