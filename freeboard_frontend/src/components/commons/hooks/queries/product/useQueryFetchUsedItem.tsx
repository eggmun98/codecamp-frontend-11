import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

export const FETCH_USEDITEM = gql`
  query fetchUseditem($useditemId: ID!) {
    fetchUseditem(useditemId: $useditemId) {
      _id
      name
      remarks
      contents
      price
      images
      tags
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

export const useQueryFetchUsedItem = () => {
  const router = useRouter();
  const result = useQuery(FETCH_USEDITEM, {
    variables: {
      useditemId: router.query.number,
    },
  });
  return result;
};
