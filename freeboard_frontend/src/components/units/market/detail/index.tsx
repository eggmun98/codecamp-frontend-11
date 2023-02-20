import { gql, useMutation, useQuery } from "@apollo/client";
import { connectFirestoreEmulator } from "firebase/firestore/lite";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { string } from "yup";
import { useMoveToPageMode } from "../../../commons/hooks/customs/useMoveToPageMode";
import { useMutationItemDelete } from "../../../commons/hooks/mutations/product/useMutationItemDelete";
import InfiniteScroll from "react-infinite-scroller";
import { useAuth } from "../../../commons/hooks/customs/useAuth";

const FETCH_USEDITEM = gql`
  query fetchUseditem($useditemId: ID!) {
    fetchUseditem(useditemId: $useditemId) {
      _id
      name
      remarks
      contents
      price
      images
      seller {
        name
      }
      useditemAddress {
        address
      }
    }
  }
`;

const DELETE_USED_ITEM_QUESTION = gql`
  mutation deleteUseditemQuestion($useditemQuestionId: ID!) {
    deleteUseditemQuestion(useditemQuestionId: $useditemQuestionId)
  }
`;

const CREATE_USED_ITEM_QUESION = gql`
  mutation createUseditemQuestion(
    $createUseditemQuestionInput: CreateUseditemQuestionInput!
    $useditemId: ID!
  ) {
    createUseditemQuestion(
      createUseditemQuestionInput: $createUseditemQuestionInput
      useditemId: $useditemId
    ) {
      _id
    }
  }
`;

const CREATE_USED_ITEM_QUESTION_ANSWER = gql`
  mutation createUseditemQuestionAnswer(
    $createUseditemQuestionAnswerInput: CreateUseditemQuestionAnswerInput!
    $useditemQuestionId: ID!
  ) {
    createUseditemQuestionAnswer(
      createUseditemQuestionAnswerInput: $createUseditemQuestionAnswerInput
      useditemQuestionId: $useditemQuestionId
    ) {
      _id
    }
  }
`;

const FETCH_USED_ITEM_QUESTIONS = gql`
  query fetchUseditemQuestions($useditemId: ID!) {
    fetchUseditemQuestions(useditemId: $useditemId) {
      _id
      contents
      user {
        name
      }
    }
  }
`;

const FETCH_USED_ITEM_QUESTIONS_ANSWERS = gql`
  query fetchUseditemQuestionAnswers($useditemQuestionId: ID!) {
    fetchUseditemQuestionAnswers(useditemQuestionId: $useditemQuestionId)
  }
`;

const UPDATE_USED_ITEM_QUESTION = gql`
  mutation updateUseditemQuestion(
    $updateUseditemQuestionInput: UpdateUseditemQuestionInput!
    $useditemQuestionId: ID!
  ) {
    updateUseditemQuestion(
      updateUseditemQuestionInput: $updateUseditemQuestionInput
      useditemQuestionId: $useditemQuestionId
    ) {
      _id
    }
  }
`;

declare const window: typeof globalThis & {
  kakao?: any;
};

export default function MarketDetailPage() {
  useAuth();

  const buttonRef = useRef(null);
  const router = useRouter();
  // console.log("라우터", router);
  const [create_used_item_question] = useMutation(CREATE_USED_ITEM_QUESION);
  const [delete_used_item_question] = useMutation(DELETE_USED_ITEM_QUESTION);
  const [update_used_item] = useMutation(UPDATE_USED_ITEM_QUESTION);
  const [create_used_item_question_answer] = useMutation(
    CREATE_USED_ITEM_QUESTION_ANSWER
  );
  const [myIndex, setMyIndex] = useState(-1);
  const [answerIndex, setAnswerIndex] = useState(-1);

  const { onClickMoveToPage } = useMoveToPageMode();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [delete_used_item] = useMutationItemDelete();

  // 상품 게시글 쿼리
  const { data } = useQuery(FETCH_USEDITEM, {
    variables: {
      useditemId: router.query.number,
    },
  });

  console.log(" 상품 게시글 쿼리:", data);

  // 상품 댓글 쿼리
  const { data: QuestionsData } = useQuery(FETCH_USED_ITEM_QUESTIONS, {
    variables: {
      useditemId: router.query.number,
    },
  });
  const { data: AnswerData } = useQuery(FETCH_USED_ITEM_QUESTIONS_ANSWERS, {
    variables: {
      useditemQuestionId: router.query.number,
    },
  });
  console.log("앤서 데이터", AnswerData);
  console.log("퀘스쳔 데이터", QuestionsData);
  // console.log("라우터", router.query.number);

  // 상품 게시글 삭제 버튼
  const onClickItemDeleteButton = async () => {
    await delete_used_item({
      variables: {
        useditemId: router.query.number,
      },
    });
    alert("글이 삭제되었습니다.");
    router.push("/markets");
  };

  // 상품 댓글 등록 버튼
  const onClickQuestionCreate = async (datas) => {
    buttonRef.current.click();
    console.log("댓글 등록 :", datas);
    const result = await create_used_item_question({
      variables: {
        createUseditemQuestionInput: {
          contents: datas.contents,
        },
        useditemId: router.query.number,
      },
      refetchQueries: [
        {
          query: FETCH_USED_ITEM_QUESTIONS,
          variables: { useditemId: router.query.number },
        },
      ],
    });
  };

  // 상품 댓글 삭제 버튼
  const onClickQuestionDelete = async (event) => {
    await delete_used_item_question({
      variables: {
        useditemQuestionId: event.target.id,
      },
    });
    alert("댓글 삭제하였습니다.");
    // console.log(event.target.id);
  };

  // 상품 댓글 수정창 열기 버튼
  const onClickQuestionEdit = (event) => {
    setMyIndex(Number(event.target.id));
    console.log(Number(event.currentTarget.id));
    // console.log(QuestionsData?.fetchUseditemQuestions);
  };

  // 상품 댓글 수정하는 버튼
  const onClickQuestionUpdate = async (d, event) => {
    // console.log(d);
    console.log("이벤트 타겟 아이디", event);

    const result = await update_used_item({
      variables: {
        updateUseditemQuestionInput: {
          contents: d.contents,
        },
        useditemQuestionId: event.target.id,
      },
    });
    alert("수정하였습니다.");
    setMyIndex(-1);
  };

  // 대댓글 작성 버튼
  const onClickAnswerCreate = async (data, event) => {
    const result = await create_used_item_question_answer({
      variables: {
        createUseditemQuestionAnswerInput: {
          contents: data.contents,
        },
        useditemQuestionId: event.target.id,
      },
    });
    alert("대댓글 달았음");
  };

  // 대댓글  창 열기 버튼
  const onClickAnswerWindow = (event) => {
    setAnswerIndex(Number(event.currentTarget.id));
  };

  //

  //

  //
  //

  //

  //

  useEffect(() => {
    const script = document.createElement("script");

    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=546bab6b1ad8e036b1f679bbb9af2e7c&libraries=services";

    document.head.appendChild(script);

    script.onload = () => {
      // 스크립트 태그를 다운받아 오면은
      window.kakao.maps.load(function () {
        let mapContainer = document.getElementById("map"), // 지도를 표시할 div
          mapOption = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 3, // 지도의 확대 레벨
          };

        let map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

        // 주소-좌표 변환 객체를 생성합니다
        let geocoder = new window.kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(
          data?.fetchUseditem?.useditemAddress?.address,
          function (result, status) {
            // 정상적으로 검색이 완료됐으면
            if (status === window.kakao.maps.services.Status.OK) {
              let coords = new window.kakao.maps.LatLng(
                result[0].y,
                result[0].x
              );

              // 결과값으로 받은 위치를 마커로 표시합니다
              let marker = new window.kakao.maps.Marker({
                map: map,
                position: coords,
              });

              // 인포윈도우로 장소에 대한 설명을 표시합니다
              let infowindow = new window.kakao.maps.InfoWindow({
                content: data?.fetchUseditem?.useditemAddress?.address,
              });
              infowindow.open(map, marker);

              // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
              map.setCenter(coords);
            }
          }
        );
      });
    };
  }, [data?.fetchUseditem?.useditemAddress?.address]);

  return (
    <>
      <form style={{ margin: 30 }}>
        <div>작성자: {data?.fetchUseditem.seller.name}</div>
        <div>상품명: {data?.fetchUseditem.name}</div>
        <div>부 상품 명: {data?.fetchUseditem.remarks}</div>
        <div>가격: {data?.fetchUseditem.price}</div>
        <div>상품 설명: {data?.fetchUseditem.contents}</div>
        {data?.fetchUseditem.images
          ?.filter((el) => el)
          .map((el) => (
            <div>
              <div>상품 이미지</div>
              <img src={`https://storage.googleapis.com/${el}`}></img>
            </div>
          ))}
        <div id="map" style={{ width: 500, height: 400 }}></div>
      </form>

      <div>
        <button onClick={onClickItemDeleteButton} style={{ marginRight: 30 }}>
          상품 삭제
        </button>
        <button style={{ marginRight: 30 }}>상품 목록</button>
        <button
          onClick={onClickMoveToPage(
            "/markets/market/" + data?.fetchUseditem._id + "/edit"
          )}
          style={{ marginRight: 30 }}
        >
          상품 수정
        </button>
      </div>

      <div style={{ margin: "30px" }}>
        <form onSubmit={handleSubmit(onClickQuestionCreate)}>
          <div>댓글 등록</div>
          댓글 내용: <input {...register("contents")}></input>
          <input type="submit" value="인풋창임" />
          <input
            type="button"
            ref={buttonRef}
            onClick={() => reset()}
            value="숨겨진 값 초기화 버튼"
            style={{ display: "none" }}
          />
        </form>
      </div>

      {QuestionsData?.fetchUseditemQuestions.map((el, dex) =>
        myIndex !== dex ? (
          <div key={el._id} style={{ margin: 30 }}>
            <span>이름: {el.user.name} </span>
            <span>댓글 내용: {el.contents}</span>
            <button id={el._id} onClick={onClickQuestionDelete}>
              댓글 삭제
            </button>
            <button id={String(dex)} onClick={onClickQuestionEdit}>
              댓글 수정
            </button>
            <button onClick={onClickAnswerWindow} id={String(dex)}>
              답변 달기
            </button>
            {answerIndex !== dex ? (
              ""
            ) : (
              <div>
                답변창 열렸음
                <form onSubmit={handleSubmit(onClickAnswerCreate)} id={el._id}>
                  <input {...register("contents")}></input>
                  <button>대댓글 달기</button>
                </form>
              </div>
            )}
          </div>
        ) : (
          <div>
            <form onSubmit={handleSubmit(onClickQuestionUpdate)} id={el._id}>
              <div>댓글 수정창</div>
              <input
                {...register("contents")}
                // defaultValue={el.contents}
              ></input>
              <button id={el._id}>수정하기</button>
            </form>
          </div>
        )
      )}
    </>
  );
}

//

//

//

//
// return (
//   <>
//     <form style={{ margin: 30 }}>
//       <div>상품명: {data?.fetchUseditem.name}</div>
//       <div>부 상품 명: {data?.fetchUseditem.remarks}</div>
//       <div>가격: {data?.fetchUseditem.price}</div>
//       <div>상품 설명: {data?.fetchUseditem.contents}</div>
//     </form>
//     <div>
//       <button onClick={onClickItemDeleteButton} style={{ marginRight: 30 }}>
//         상품 삭제
//       </button>
//       <button style={{ marginRight: 30 }}>상품 목록</button>
//       <button
//         onClick={onClickMoveToPage(
//           "/markets/market/" + data?.fetchUseditem._id + "/edit"
//         )}
//         style={{ marginRight: 30 }}
//       >
//         상품 수정
//       </button>
//     </div>
//     <div style={{ margin: "30px" }}>
//       <form onSubmit={handleSubmit(onClickQuestionCreate)}>
//         <div>댓글 등록</div>
//         댓글 내용: <input {...register("contents")}></input>
//         <button>댓글 등록</button>
//       </form>
//     </div>
//     {QuestionsData?.fetchUseditemQuestions.map((el, index) =>
//       myIndex !== index ? (
//         <div key={el._id} style={{ margin: 30 }}>
//           <div>댓글 내용</div>
//           <div>{el.contents}</div>
//           <button id={el._id} onClick={onClickQuestionDelete}>
//             댓글 삭제
//           </button>
//           <button id={String(index)} onClick={onClickQuestionEdit}>
//             댓글 수정
//           </button>
//           <button>답변 달기</button>
//         </div>
//       ) : (
//         <div key={el._id}>
//           <form onSubmit={handleSubmit(onClickQuestionUpdate)}>
//             <div>댓글 수정창</div>
//             <input {...register("contents")}></input>
//             <button id={el._id}>수정하기</button>
//           </form>
//         </div>
//       )
//     )}
//   </>
// );
