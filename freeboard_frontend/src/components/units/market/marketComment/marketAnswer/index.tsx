import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

const FETCH_USED_ITEM_QUESTIONS_ANSWERS = gql`
  query fetchUseditemQuestionAnswers($useditemQuestionId: ID!) {
    fetchUseditemQuestionAnswers(useditemQuestionId: $useditemQuestionId) {
      _id
      contents
    }
  }
`;

const DELETE_USED_ITEM_QUESTION_ANSWER = gql`
  mutation deleteUseditemQuestionAnswer($useditemQuestionAnswerId: ID!) {
    deleteUseditemQuestionAnswer(
      useditemQuestionAnswerId: $useditemQuestionAnswerId
    )
  }
`;

const UPDATE_USED_ITEM_QUESTION_ANSWER = gql`
  mutation updateUseditemQuestionAnswer(
    $updateUseditemQuestionAnswerInput: UpdateUseditemQuestionAnswerInput!
    $useditemQuestionAnswerId: ID!
  ) {
    updateUseditemQuestionAnswer(
      updateUseditemQuestionAnswerInput: $updateUseditemQuestionAnswerInput
      useditemQuestionAnswerId: $useditemQuestionAnswerId
    ) {
      _id
    }
  }
`;

export default function MarketAnswerPage(props) {
  const { data } = useQuery(FETCH_USED_ITEM_QUESTIONS_ANSWERS, {
    variables: {
      useditemQuestionId: props.el,
    },
  });

  const [myindex, setMyindex] = useState(-1);

  const [delete_used_item_question_answer] = useMutation(
    DELETE_USED_ITEM_QUESTION_ANSWER
  );
  const [update_used_item_question_answer] = useMutation(
    UPDATE_USED_ITEM_QUESTION_ANSWER
  );

  const { register, handleSubmit } = useForm();

  const router = useRouter();
  // 대댓글 삭제버튼
  const onClickAnswerDelete = async (event) => {
    await delete_used_item_question_answer({
      variables: {
        useditemQuestionAnswerId: event.target.id,
      },
      refetchQueries: [
        {
          query: FETCH_USED_ITEM_QUESTIONS_ANSWERS,
          variables: { useditemId: router.query.number },
        },
      ],
    });
    alert("삭제하였습니다.");
  };

  // 대댓글 수정창 열기 버튼
  const onClickAnswerEdit = (event) => {
    setMyindex(Number(event.target.id));
  };

  // 대댓글 수정하는 버튼
  const onClickAnswerUpdate = async (d, e) => {
    const result = await update_used_item_question_answer({
      variables: {
        updateUseditemQuestionAnswerInput: {
          contents: d.contents,
        },
        useditemQuestionAnswerId: e.target.id,
      },
    });
    setMyindex(-1);
    alert("수정하였습니다.");
  };

  return (
    <div>
      {data?.fetchUseditemQuestionAnswers.map((el, dex) =>
        myindex !== dex ? (
          <div style={{ marginLeft: 30 }}>
            <div>➤{el.contents}</div>
            <button onClick={onClickAnswerDelete} id={el._id}>
              대댓글 삭제하기
            </button>
            <button onClick={onClickAnswerEdit} id={String(dex)}>
              대댓글 수정하기
            </button>
          </div>
        ) : (
          <div>
            대댓글 수정창
            <form onSubmit={handleSubmit(onClickAnswerUpdate)} id={el._id}>
              <input {...register("contents")}></input>
              <button>대댓글 수정하기</button>
            </form>
          </div>
        )
      )}
    </div>
  );
}
