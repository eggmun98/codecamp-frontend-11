import { useQuery, gql } from "@apollo/client";
import type { ChangeEvent, MouseEvent } from "react";
import type {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/types";
// import { useState } from "react";
import _ from "lodash";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int, $search: String) {
    fetchBoards(page: $page, search: $search) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function StaticRoutingMovedPage(): JSX.Element {
  // const [search, setSearch] = useState("");

  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  const onClickPage = (event: MouseEvent<HTMLSpanElement>): void => {
    void refetch({ page: Number(event.currentTarget.id) });
  };

  const getDebounce = _.debounce((value) => {
    void refetch({ search: value, page: 1 }); //  value는 매개변수
  }, 500); // 0.5초 이내에 추가 입력이 없을 시 마지막 1회 실행 즉 0.5초 이내에 추가 입력이 없을 시 api 요청

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    getDebounce(event.currentTarget.value); // event.currentTarget.value를 매개변수로 저 getDebounce함수에 넣으면 됨!!
  };

  return (
    <div>
      검색어입력: <input type="text" onChange={onChangeSearch}></input>
      {/* <button onClick={onClickSearch}>검색확인</button>  */}
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{ margin: "10px" }}>{el.title}</span>
          <span style={{ margin: "10px" }}>{el.writer}</span>
        </div>
      ))}
      {new Array(10).fill(1).map((_, index) => (
        <span key={index + 1} id={String(index + 1)} onClick={onClickPage}>
          {index + 1}
        </span>
      ))}
    </div>
  );
}

//
//
//
//
// 아래 방법은 채팅을 칠때 마다 계속 api가 불러오는 문제점이 있음
//
//  이 위 코드랑 아래코드들은 버튼없이 검색하는거임!

// import { useQuery, gql } from "@apollo/client";
// import type { ChangeEvent, MouseEvent } from "react";
// import type {
//   IQuery,
//   IQueryFetchBoardsArgs,
// } from "../../../src/commons/types/generated/types";
// import { useState } from "react";
// const FETCH_BOARDS = gql`
//   query fetchBoards($page: Int, $search: String) {
//     fetchBoards(page: $page, search: $search) {
//       _id
//       writer
//       title
//       contents
//     }
//   }
// `;

// export default function StaticRoutingMovedPage(): JSX.Element {
//   const [search, setSearch] = useState("");

//   const { data, refetch } = useQuery<
//     Pick<IQuery, "fetchBoards">,
//     IQueryFetchBoardsArgs
//   >(FETCH_BOARDS);

//   const onClickPage = (event: MouseEvent<HTMLSpanElement>): void => {
//     // 검색에서 refetch할 때, search 검색어가 refetch에 이미 저장되어 있는 상태이므로 추가로 search 포함되지 않아도 됨
//     void refetch({ page: Number(event.currentTarget.id) });
//   };

//   const onChangeSearch = (event: ChangeEvent<HTMLInputElement>): void => {
//     // setSearch(event.currentTarget.value);
//     void refetch({ search: event.currentTarget.value, page: 1 });
//   };

//   // const onClickSearch = (): void => {
//   //   void refetch({
//   //     search: search,
//   //     page: 1,
//   //   });
//   // };

//   //   const onClickSearch = (): void => {
//   //     refetch({
//   //         search: search
//   //     });
//   //   }; // 만약 이상태에서 검색을 하게된다면 즉 만약 3페이지에서 점심이라는 단어를 검색을하면 3페이지에

//   return (
//     <div>
//       검색어입력: <input type="text" onChange={onChangeSearch}></input>
//       {/* <button onClick={onClickSearch}>검색확인</button>  */}
//       {data?.fetchBoards.map((el) => (
//         <div key={el._id}>
//           <span style={{ margin: "10px" }}>{el.title}</span>
//           <span style={{ margin: "10px" }}>{el.writer}</span>
//         </div>
//       ))}
//       {new Array(10).fill(1).map((_, index) => (
//         <span key={index + 1} id={String(index + 1)} onClick={onClickPage}>
//           {index + 1}
//         </span>
//       ))}
//     </div>
//   );
// }
