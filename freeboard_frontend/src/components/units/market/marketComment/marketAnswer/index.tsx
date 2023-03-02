import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FETCH_USED_ITEM_QUESTIONS_ANSWERS,
  useQueryFetchUsedItemAnswers,
} from "../../../../commons/hooks/queries/product/Answer/useQueryFetchUsedItemAnswers";
import { IQuery } from "../../../../commons/types/generated/types";

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

interface IProps {
  el: string[];
  data: {
    fetchUserLoggedIn: {
      _id: string;
    };
  };
}

interface IMarketAnswer {
  // onClickAnswerDelete?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickAnswerUpdate: (event: ChangeEvent<HTMLFormElement>) => void;
}

export default function MarketAnswerPage(props: IProps) {
  const { data } = useQuery<Pick<IQuery, "fetchUseditemQuestionAnswers">>(
    FETCH_USED_ITEM_QUESTIONS_ANSWERS,
    {
      variables: {
        useditemQuestionId: props.el,
      },
    }
  );

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
  const onClickAnswerDelete = async (event: ChangeEvent<HTMLButtonElement>) => {
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
  const onClickAnswerEdit = (event: ChangeEvent<HTMLInputElement>) => {
    setMyindex(Number(event.target.id));
  };

  interface IDataEdit {
    contents: string;
  }

  // 대댓글 수정하는 버튼
  const onClickAnswerUpdate = async (
    d: IDataEdit,
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
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

  interface IEl {
    user: {
      name: string;
      _id: string;
    };
    _id: string;
    contents: string;
  }
  return (
    <div>
      {data?.fetchUseditemQuestionAnswers.map((el: IEl, dex: number) =>
        myindex !== dex ? (
          <div style={{ marginLeft: 30 }}>
            <div>➤ {el.user.name}</div>
            <div> {el.contents}</div>
            {props.data.fetchUserLoggedIn._id === el.user._id ? (
              <>
                <button onClick={onClickAnswerDelete} id={el._id}>
                  대댓글 삭제하기
                </button>
                <button onClick={onClickAnswerEdit} id={String(dex)}>
                  대댓글 수정하기
                </button>
              </>
            ) : (
              <></>
            )}
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
