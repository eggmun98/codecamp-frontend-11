import { gql, useMutation, useQuery } from "@apollo/client";
import { connectFirestoreEmulator } from "firebase/firestore/lite";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { string } from "yup";
import { useMoveToPageMode } from "../../../commons/hooks/customs/useMoveToPageMode";
import { useMutationItemDelete } from "../../../commons/hooks/mutations/product/useMutationItemDelete";

const FETCH_USEDITEM = gql`
  query fetchUseditem($useditemId: ID!) {
    fetchUseditem(useditemId: $useditemId) {
      _id
      name
      remarks
      contents
      price
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

export default function MarketDetailPage() {
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
  const { register, handleSubmit } = useForm();
  const [delete_used_item] = useMutationItemDelete();

  // 상품 게시글 쿼리
  const { data } = useQuery(FETCH_USEDITEM, {
    variables: {
      useditemId: router.query.number,
    },
  });

  // 상품 댓글 쿼리
  const { data: QuestionsData } = useQuery(FETCH_USED_ITEM_QUESTIONS, {
    variables: {
      useditemId: router.query.number,
    },
  });

  // console.log("퀘스쳔 데이터", QuestionsData);

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
    console.log("댓글 등록 :", datas);
    const result = await create_used_item_question({
      variables: {
        createUseditemQuestionInput: {
          contents: datas.contents,
        },
        useditemId: router.query.number,
      },
    });
    alert("댓글이 등록되었습니다.");
    // console.log("result :", result);
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
    // console.log("이벤트 타겟 아이디", event.target.id);

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

  // // 대댓글 작성 버튼
  // const onClickAnswerCreate = async () => {
  //   const result = await create_used_item_question_answer({
  //     variables: {
  //       createUseditemQuestionAnswerInput: {
  //         contents: "",
  //       },
  //       useditemQuestionId: "",
  //     },
  //   });
  // };

  // // 대댓글  창 열기 버튼
  // const onClickAnswerWindow = (event) => {
  //   setAnswerIndex(Number(event.currentTarget.value));
  // };

  return (
    <>
      <form style={{ margin: 30 }}>
        <div>상품명: {data?.fetchUseditem.name}</div>
        <div>부 상품 명: {data?.fetchUseditem.remarks}</div>
        <div>가격: {data?.fetchUseditem.price}</div>
        <div>상품 설명: {data?.fetchUseditem.contents}</div>
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
          <button>댓글 등록</button>
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
