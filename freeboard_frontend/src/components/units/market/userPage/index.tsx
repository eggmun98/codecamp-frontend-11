import { gql, useMutation, useQuery } from "@apollo/client";
import { pick } from "lodash";
import { useRouter } from "next/router";
import Script from "next/script";
import { ChangeEvent, useEffect, useState } from "react";
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

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
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
      name
      remarks
      contents
      price
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      _id
    }
  }
`;

const FETCH_USED_ITEM_COUNT_IPICKED = gql`
  query fetchUseditemsCountIPicked {
    fetchUseditemsCountIPicked
  }
`;

declare const window: typeof globalThis & {
  IMP: any;
}; // 윈도우 안에 IMP 타입을 정해주는거임 즉 카카오 맵 라이브러리도 똑같음

export default function UserPage() {
  useAuth();
  const { data } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);

  interface abc {
    name: string;
    point: string;
  }
  const { register, handleSubmit } = useForm<abc>();

  const { onClickMoveToPage } = useMoveToPageMode();

  const [create_point_transaction_of_loading] = useMutation(
    CREATE_POINT_TRANSACTION_OF_LOADING
  );
  const [upload_file] = useMutation(UPLOAD_FILE);

  const { data: PickData } = useQuery(FETCH_USED_ITEMSL_PICKED, {
    variables: { search: "" },
  });

  const { data: CountData } = useQuery(FETCH_USED_ITEM_COUNT_IPICKED);

  const [image, setImage] = useState("");

  const router = useRouter();

  const [update_user] = useMutation(UPDATE_USER);

  const onClickPoint = async (u: string) => {
    await create_point_transaction_of_loading({
      variables: {
        impUid: u,
      },
    });
    alert("충전하였습니다.");
  };

  const onChangeImageUpload = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0];
    const result = await upload_file({
      variables: { file: file },
    });
  };
  // interface IDatas {
  //   point: string;
  // }

  const onClickProfile = async (data: { name: string }) => {
    const result = await update_user({
      variables: {
        updateUserInput: {
          picture: image,
          name: data.name,
        },
      },
    });
    alert("프로필을 수정하였습니다.");
  };

  const onClickPayment = (datas: { point: string }): void => {
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
          router.push("/");

          onClickPoint(rsp.imp_uid);
        } else {
          // 결제 실패 시 로직,
        }
      }
    );
  };

  // interface Pers

  // // 오늘 본 상품 불러오기
  interface qqq {
    name: string;
    price: number;
  }

  const [aaa, setAaa] = useState<qqq[]>();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const getDataLocalStorage = () => {
        let localData = JSON.parse(localStorage.getItem("baskets") ?? "");
        setAaa(localData);
      };
      getDataLocalStorage();
    }
  }, [aaa]);
  // console.log("aaa는 무엇인가", aaa?.length);
  // useEffect(() => {
  //   const arr = new Array(10).fill("sdfdsf").localStorage.getItem("baskets");
  //   console.log(
  //     arr.filter((el) => el.includes("name")),
  //     "하하하하하"
  //   );
  // }, []);

  return (
    <div>
      <div> {data?.fetchUserLoggedIn.name}님의 페이지 입니다.</div>
      <button style={{ marginBottom: 30 }}>프로필 수정하기</button>
      <form onSubmit={handleSubmit(onClickProfile)}>
        <input {...register("name")}></input>
        <input type="file" onChange={onChangeImageUpload}></input>
        <button>프로필 수정하기</button>
      </form>

      <button onClick={onClickMoveToPage("/markets/userPage/passwordEdit")}>
        비밀번호 변경하기
      </button>
      <div> 프로필 사진</div>
      <div> 이름: </div>
      <div> 가입 날짜:</div>
      <div>포인트: {data?.fetchUserLoggedIn.userPoint?.amount}원 있습니다.</div>
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
        {PickData?.fetchUseditemsIPicked.map(
          (el: { name: string; contents: string }) => (
            <div>
              <div>{el.name}</div>
              <div>{el.contents}</div>
            </div>
          )
        )}
      </div>

      <div>
        <div>오늘 본 목록</div>

        {aaa && (
          <>
            <div>
              <div>이름: {aaa[aaa.length - 1].name}</div>
              <div>가격: {aaa[aaa.length - 1].price}</div>
            </div>
            <div>
              <div>이름: {aaa[aaa.length - 2].name}</div>
              <div>가격: {aaa[aaa.length - 2].price}</div>
            </div>
            <div>
              <div>이름: {aaa[aaa.length - 3].name}</div>
              <div>가격: {aaa[aaa.length - 3].price}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
