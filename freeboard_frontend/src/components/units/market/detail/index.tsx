import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useMoveToPageMode } from "../../../commons/hooks/customs/useMoveToPageMode";
import { useMutationItemDelete } from "../../../commons/hooks/mutations/product/useMutationItemDelete";
import { useAuth } from "../../../commons/hooks/customs/useAuth";
import Dompurify from "dompurify";
import MarketAnswerPage from "../marketComment/marketAnswer";
import InfiniteScroll from "react-infinite-scroller";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

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
        _id
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
  query fetchUseditemQuestions($useditemId: ID!, $page: Int) {
    fetchUseditemQuestions(useditemId: $useditemId, page: $page) {
      _id
      contents
      user {
        name
      }
    }
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

const TOGGLE_USED_ITEM_PICK = gql`
  mutation toggleUseditemPick($useditemId: ID!) {
    toggleUseditemPick(useditemId: $useditemId)
  }
`;

const CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING = gql`
  mutation createPointTransactionOfBuyingAndSelling($useritemId: ID!) {
    createPointTransactionOfBuyingAndSelling(useritemId: $useritemId) {
      _id
    }
  }
`;

const FETCH_USED_ITEM_QUESTIONS_ANSWERS = gql`
  query fetchUseditemQuestionAnswers($useditemQuestionId: ID!) {
    fetchUseditemQuestionAnswers(useditemQuestionId: $useditemQuestionId) {
      _id
      contents
    }
  }
`;

declare const window: typeof globalThis & {
  kakao?: any;
};

export default function MarketDetailPage(): JSX.Element {
  useAuth();

  const buttonRef = useRef(null);
  const router = useRouter();
  const [create_used_item_question] = useMutation(CREATE_USED_ITEM_QUESION);
  const [delete_used_item_question] = useMutation(DELETE_USED_ITEM_QUESTION);
  const [update_used_item] = useMutation(UPDATE_USED_ITEM_QUESTION);
  const [create_used_item_question_answer] = useMutation(
    CREATE_USED_ITEM_QUESTION_ANSWER
  );
  const [toggle_used_item_pick] = useMutation(TOGGLE_USED_ITEM_PICK);
  const [create_point_transaction_of_buying_and_selling] = useMutation(
    CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING
  );

  const [myIndex, setMyIndex] = useState(-1);
  const [answerIndex, setAnswerIndex] = useState(-1);

  const { onClickMoveToPage } = useMoveToPageMode();
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm();
  const [delete_used_item] = useMutationItemDelete();

  // 상품 게시글 쿼리
  const { data } = useQuery(FETCH_USEDITEM, {
    variables: {
      useditemId: router.query.number,
    },
  });

  // console.log(" 상품 게시글 쿼리:", data.fetchUseditem.seller._id);

  // 상품 댓글 쿼리
  const { data: QuestionsData, fetchMore } = useQuery(
    FETCH_USED_ITEM_QUESTIONS,
    {
      variables: {
        useditemId: router.query.number,
      },
    }
  );

  // console.log(
  //   "퀘스쳔 데이터",
  //   QuestionsData?.fetchUseditemQuestions[0].contents
  // );

  // 상품 찜하기
  const onClickPick = async (): Promise<void> => {
    await toggle_used_item_pick({
      variables: {
        useditemId: router.query.number,
      },
    });
    alert("찜하기 하였습니다.");
  };

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
  const onClickQuestionCreate = async (d: any): Promise<void> => {
    buttonRef.current.click();
    const result = await create_used_item_question({
      variables: {
        createUseditemQuestionInput: {
          contents: d.contents,
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
  const onClickQuestionDelete = async (
    event: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    await delete_used_item_question({
      variables: {
        useditemQuestionId: event.currentTarget.id,
      },
      refetchQueries: [
        {
          query: FETCH_USED_ITEM_QUESTIONS,
          variables: { useditemId: router.query.number },
        },
      ],
    });
    alert("댓글 삭제하였습니다.");
  };

  // 상품 댓글 수정창 열기 버튼
  const onClickQuestionEdit = (event: MouseEvent<HTMLButtonElement>) => {
    setMyIndex(Number(event.currentTarget.id));
  };

  interface IDataEdit {
    contents: string;
  }

  // 상품 댓글 수정하는 버튼
  const onClickQuestionUpdate = async (
    d: IDataEdit,
    event: MouseEvent<HTMLFormElement>
  ): Promise<void> => {
    console.log("이벤트 타겟 아이디", event);

    const result = await update_used_item({
      variables: {
        updateUseditemQuestionInput: {
          contents: d.contents,
        },
        useditemQuestionId: event.target.id,
      },
      refetchQueries: [
        {
          query: FETCH_USED_ITEM_QUESTIONS,
          variables: { useditemId: router.query.number },
        },
      ],
    });
    alert("수정하였습니다.");
    setMyIndex(-1);
  };

  interface IDataQuestion {
    contents: string;
  }
  // 대댓글 작성 버튼
  const onClickAnswerCreate = async (
    data: IDataQuestion,
    event: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    const result = await create_used_item_question_answer({
      variables: {
        createUseditemQuestionAnswerInput: {
          contents: data.contents,
        },
        useditemQuestionId: event.target.id,
      },
      refetchQueries: [
        {
          query: FETCH_USED_ITEM_QUESTIONS_ANSWERS,
          variables: { useditemId: router.query.number },
        },
      ],
    });
    alert("대댓글 달았음");
    setAnswerIndex(-1);
  };

  // 대댓글  창 열기 버튼
  const onClickAnswerWindow = (event: MouseEvent<HTMLButtonElement>) => {
    setAnswerIndex(Number(event.currentTarget.id));
  };

  // 상품 구매 버튼
  const onClickBuy = async (): Promise<void> => {
    await create_point_transaction_of_buying_and_selling({
      variables: {
        useritemId: router.query.number,
      },
    });
    alert("상품을 구매하였습니다.");
  };
  //

  //

  //
  //

  //

  //
  // 카카오 맵 지도
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
            disableDoubleClickZoom: true,
          };

        let map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

        // 주소-좌표 변환 객체를 생성합니다
        let geocoder = new window.kakao.maps.services.Geocoder();

        map.setDraggable(false);
        map.setZoomable(false);

        // 주소로 좌표를 검색합니다
        geocoder.addressSearch(
          data?.fetchUseditem?.useditemAddress?.address,
          function (result: any, status: any) {
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

  // 댓글 무한 스크롤
  const onLoadMore = () => {
    if (QuestionsData === undefined) return;
    fetchMore({
      variables: {
        page:
          Math.ceil((QuestionsData?.fetchUseditemQuestions.length ?? 10) / 10) +
          1,
      }, //10개의 단위로 1페이지로 나누거라~
      updateQuery: (prev, { fetchMoreResult }) => {
        // console.log(prev);
        if (fetchMoreResult.fetchUseditemQuestions === undefined) {
          // 만약 다음 댓글이 없다면 이전 댓글만 보여줘라~
          return {
            fetchUseditemQuestions: [...prev.fetchUseditemQuestions],
          };
        }
        return {
          fetchUseditemQuestions: [
            ...prev.fetchUseditemQuestions,
            ...fetchMoreResult.fetchUseditemQuestions,
          ],
          // 전체 댓글: 이전 댓글들 + 다음 댓글들
        };
      },
    });
    console.log(data);
  };
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true);
  }, []);

  // return <Typography dangerouslySetInnerHTML={{ __html: render && content }} />;

  return (
    <>
      <form style={{ margin: 30 }}>
        <div>작성자: {data?.fetchUseditem.seller.name}</div>
        <div>상품명: {data?.fetchUseditem.name}</div>
        <div>부 상품 명: {data?.fetchUseditem.remarks}</div>
        <div>가격: {data?.fetchUseditem.price}</div>
        {typeof window !== "undefined" && (
          <div
            dangerouslySetInnerHTML={{
              __html: Dompurify.sanitize(
                "상품 설명:" + data?.fetchUseditem.contents
              ),
            }} // render 사용하고 나서부터 Extra attributes from the server: id,style 이런 에러가 뜸
          ></div>
        )}
        {data?.fetchUseditem.images
          ?.filter((el: string) => el)
          .map((el: string) => (
            <div key={uuidv4()}>
              <div>상품 이미지</div>
              <img src={`https://storage.googleapis.com/${el}`}></img>
            </div>
          ))}
        <div id="map" style={{ width: 500, height: 400 }}></div>
      </form>

      <div>
        <button
          onClick={onClickItemDeleteButton}
          style={{ marginLeft: 30, marginRight: 30 }}
        >
          상품 삭제
        </button>
        <Link href="/markets">
          <a style={{ marginRight: 30 }}>상품목록</a>
        </Link>
        <button onClick={onClickBuy} style={{ marginRight: 30 }}>
          구매하기
        </button>
        <button onClick={onClickPick} style={{ marginRight: 30 }}>
          찜하기
        </button>
        {/* <button
          onClick={onClickMoveToPage(
            "/markets/market/" + data?.fetchUseditem._id + "/edit"
          )}
          style={{ marginRight: 30 }}
        >
          상품 수정
        </button> */}
        <Link href={"/markets/market/" + data?.fetchUseditem._id + "/edit"}>
          <a>상품 수정</a>
        </Link>
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
      <InfiniteScroll pageStart={0} loadMore={onLoadMore} hasMore={true}>
        {QuestionsData?.fetchUseditemQuestions.map((el: any, dex: number) =>
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
                  <form
                    onSubmit={handleSubmit(onClickAnswerCreate)}
                    id={el._id}
                  >
                    <input {...register("contents")}></input>
                    <button>대댓글 달기</button>
                  </form>
                </div>
              )}
              <MarketAnswerPage el={el._id}></MarketAnswerPage>{" "}
              {/* 대댓글페이지*/}
            </div>
          ) : (
            <div>
              <form onSubmit={handleSubmit(onClickQuestionUpdate)} id={el._id}>
                <div>댓글 수정창</div>
                <input
                  {...register("contents")}
                  defaultValue={
                    QuestionsData.fetchUseditemQuestions[dex].contents
                  }
                ></input>

                <button id={el._id}>수정하기</button>
              </form>
            </div>
          )
        ) ?? <></>}
      </InfiniteScroll>
    </>
  );
}
