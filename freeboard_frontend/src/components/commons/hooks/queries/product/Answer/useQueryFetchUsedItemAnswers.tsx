import { gql, useQuery } from "@apollo/client";

export const FETCH_USED_ITEM_QUESTIONS_ANSWERS = gql`
  query fetchUseditemQuestionAnswers($useditemQuestionId: ID!) {
    fetchUseditemQuestionAnswers(useditemQuestionId: $useditemQuestionId) {
      _id
      contents
      user {
        _id
        name
      }
    }
  }
`;

export const useQueryFetchUsedItemAnswers = () => {
  const result = useQuery(FETCH_USED_ITEM_QUESTIONS_ANSWERS);

  return result;
};
