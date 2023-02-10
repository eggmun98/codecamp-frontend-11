import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import FetchPolicyExample from "../../../src/commons/components/units/22-fetch-policy";
import type {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/types";

const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      _id
      writer
      title
    }
  }
`;
// const FETCH_BOARDS = gql`
//   query fetchBoards {
//     fetchBoards {
//       _id
//       writer
//       title
//       contents 여기서 이게 다르 컴포넌트의 gql이라고 치자 근데 위에 gql은 콘텐츠가 없네?
//     }
//   }
// `;

export default function StaticRoutingMovedPage(): JSX.Element {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const { data } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS
  );

  // 1. 새로운 컴포넌트 등장시에도 글로벌 스테이트 값이 유지가되는지??
  const onClickIsOpen = (): void => {
    setIsOpen(true);
  };

  // 2. 새로운 페이지 이동시에도 글로벌 스테이트 값이 유지되는지??
  const onClickMove = (): void => {
    void router.push("/section22/22-01-fetch-policy-moved");
  };

  return (
    <div>
      <button onClick={onClickIsOpen}>
        1. 버튼을 클릭하면 새로운 컴포넌트가 나타납니다!!
      </button>
      {isOpen && <FetchPolicyExample></FetchPolicyExample>}

      <button onClick={onClickMove}>
        {" "}
        2. 버튼을 클릭하면 페이지가 이동됩니다!!
        {/* */}
      </button>
    </div>
  );
}
