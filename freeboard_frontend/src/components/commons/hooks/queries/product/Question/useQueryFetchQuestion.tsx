import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

export const FETCH_USED_ITEM_QUESTIONS = gql`
  query fetchUseditemQuestions($useditemId: ID!, $page: Int) {
    fetchUseditemQuestions(useditemId: $useditemId, page: $page) {
      _id
      contents
      user {
        name
        _id
      }
    }
  }
`;

export const useQueryFetchQuestion = () => {
  const router = useRouter();
  const result = useQuery(FETCH_USED_ITEM_QUESTIONS, {
    variables: {
      useditemId: router.query.number,
    },
  });
  return result;
};
