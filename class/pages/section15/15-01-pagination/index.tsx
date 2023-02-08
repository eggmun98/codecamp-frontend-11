import { useQuery, gql } from "@apollo/client";
import type { MouseEvent } from "react";
import type {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/types";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      contents
    }
  }
`;
// refetch쿼리는 뮤테이션 이후에 하는거고
// 그냥 리패치는 언제든지 사용가능 데이터 옆에 리패치 적으면 됨
export default function StaticRoutingMovedPage(): JSX.Element {
  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);
  console.log(data?.fetchBoards);

  const onClickPage = (event: MouseEvent<HTMLSpanElement>): void => {
    // async싱크쓰려면 Promise 타입 써야함
    void refetch({ page: Number(event.currentTarget.id) });
  };

  return (
    <div>
      {data?.fetchBoards.map(
        (
          el // el타입 만드는거 보다는 패치보더에 타입을 만들면 자동으로 빨간줄 사라질거임
        ) => (
          <div key={el._id}>
            <span style={{ margin: "10px" }}>{el.title}</span>
            <span style={{ margin: "10px" }}>{el.writer}</span>
          </div>
        )
      )}
      {new Array(10).fill(1).map(
        // 길이가 10인 새로운 배열을 만들고 그 배열의 인덱스 값에 1씩 넣 어준다.
        (
          _, // 보통 el을 안쓴다면 _언더바로 안쓴다고 표시함 다른 것도 _언더바로 안쓴다고 표시
          index // el 안쓰고 있으니 배열 안에 있는 값이 다른 값이라도 상관 없음 즉 무의미함
        ) => (
          <span key={index + 1} id={String(index + 1)} onClick={onClickPage}>
            {index + 1}
          </span>
        )
      )}
    </div>
  );
}

//
//
//
//
//
//
//
//
//
// 5방식
// import { useQuery, gql } from "@apollo/client";
// import { MouseEvent } from "react";
// import type {
//   IQuery,
//   IQueryFetchBoardsArgs,
// } from "../../../src/commons/types/generated/types";

// const FETCH_BOARDS = gql`
//   query fetchBoards($page: Int) {
//     fetchBoards(page: $page) {
//       _id
//       writer
//       title
//       contents
//     }
//   }
// `;
// // refetch쿼리는 뮤테이션 이후에 하는거고
// // 그냥 리패치는 언제든지 사용가능 데이터 옆에 리패치 적으면 됨
// export default function StaticRoutingMovedPage(): JSX.Element {
//   const { data, refetch } = useQuery<
//     Pick<IQuery, "fetchBoards">,
//     IQueryFetchBoardsArgs
//   >(FETCH_BOARDS);
//   console.log(data?.fetchBoards);

//   const onClickPage = (event: MouseEvent<HTMLSpanElement>): void => {
//     // async싱크쓰려면 Promise 타입 써야함
//     void refetch({ page: Number(event.currentTarget.id) });
//   };

//   return (
//     <div>
//       {data?.fetchBoards.map(
//         (
//           el // el타입 만드는거 보다는 패치보더에 타입을 만들면 자동으로 빨간줄 사라질거임
//         ) => (
//           <div key={el._id}>
//             <span style={{ margin: "10px" }}>{el.title}</span>
//             <span style={{ margin: "10px" }}>{el.writer}</span>
//           </div>
//         )
//       )}
//       {[0, 0, 0, 0, 0, 6, 7, 8, 9, 10].map(
//         (
//           _, // 보통 el을 안쓴다면 _언더바로 안쓴다고 표시함 다른 것도 _언더바로 안쓴다고 표시
//           index // el 안쓰고 있으니 배열 안에 있는 값이 다른 값이라도 상관 없음 즉 무의미함
//         ) => (
//           <span key={index + 1} id={String(index + 1)} onClick={onClickPage}>
//             {index + 1}
//           </span>
//         )
//       )}
//     </div>
//   );
// }

//
//
//
//
//
//
//
//
//
// 4방식
// import { useQuery, gql } from "@apollo/client";
// import { MouseEvent } from "react";
// import type {
//   IQuery,
//   IQueryFetchBoardsArgs,
// } from "../../../src/commons/types/generated/types";

// const FETCH_BOARDS = gql`
//   query fetchBoards($page: Int) {
//     fetchBoards(page: $page) {
//       _id
//       writer
//       title
//       contents
//     }
//   }
// `;
// // refetch쿼리는 뮤테이션 이후에 하는거고
// // 그냥 리패치는 언제든지 사용가능 데이터 옆에 리패치 적으면 됨
// export default function StaticRoutingMovedPage(): JSX.Element {
//   const { data, refetch } = useQuery<
//     Pick<IQuery, "fetchBoards">,
//     IQueryFetchBoardsArgs
//   >(FETCH_BOARDS);
//   console.log(data?.fetchBoards);

//   const onClickPage = (event: MouseEvent<HTMLSpanElement>): void => {
//     // async싱크쓰려면 Promise 타입 써야함
//     void refetch({ page: Number(event.currentTarget.id) });
//   };

//   return (
//     <div>
//       {data?.fetchBoards.map(
//         (
//           el // el타입 만드는거 보다는 패치보더에 타입을 만들면 자동으로 빨간줄 사라질거임
//         ) => (
//           <div key={el._id}>
//             <span style={{ margin: "10px" }}>{el.title}</span>
//             <span style={{ margin: "10px" }}>{el.writer}</span>
//           </div>
//         )
//       )}
//       {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => (
//         <span key={el} id={String(el)} onClick={onClickPage}>
//           {el}
//         </span>
//       ))}
//     </div>
//   );
// }

//
//
//
//
//
//
//
//
//
// 3방식
// import { useQuery, gql } from "@apollo/client";
// import { MouseEvent } from "react";
// import type {
//   IQuery,
//   IQueryFetchBoardsArgs,
// } from "../../../src/commons/types/generated/types";

// const FETCH_BOARDS = gql`
//   query fetchBoards($page: Int) {
//     fetchBoards(page: $page) {
//       _id
//       writer
//       title
//       contents
//     }
//   }
// `;
// // refetch쿼리는 뮤테이션 이후에 하는거고
// // 그냥 리패치는 언제든지 사용가능 데이터 옆에 리패치 적으면 됨
// export default function StaticRoutingMovedPage(): JSX.Element {
//   const { data, refetch } = useQuery<
//     Pick<IQuery, "fetchBoards">,
//     IQueryFetchBoardsArgs
//   >(FETCH_BOARDS);
//   console.log(data?.fetchBoards);

//   const onClickPage = (event: MouseEvent<HTMLSpanElement>): void => {
//     // async싱크쓰려면 Promise 타입 써야함
//     void refetch({ page: Number(event.currentTarget.id) });
//   };

//   return (
//     <div>
//       {data?.fetchBoards.map(
//         (
//           el // el타입 만드는거 보다는 패치보더에 타입을 만들면 자동으로 빨간줄 사라질거임
//         ) => (
//           <div key={el._id}>
//             <span style={{ margin: "10px" }}>{el.title}</span>
//             <span style={{ margin: "10px" }}>{el.writer}</span>
//           </div>
//         )
//       )}
//       <span id="1" onClick={onClickPage}>
//         1
//       </span>
//       <span id="2" onClick={onClickPage}>
//         2
//       </span>
//       <span id="3" onClick={onClickPage}>
//         3
//       </span>
//     </div>
//   );
// }

//
//
//
//
//
//
//
//
// 2방식
// import { useQuery, gql } from "@apollo/client";
// import { MouseEvent } from "react";
// import type {
//   IQuery,
//   IQueryFetchBoardsArgs,
// } from "../../../src/commons/types/generated/types";

// const FETCH_BOARDS = gql`
//   query fetchBoards($page: Int) {
//     fetchBoards(page: $page) {
//       _id
//       writer
//       title
//       contents
//     }
//   }
// `;
// // refetch쿼리는 뮤테이션 이후에 하는거고
// // 그냥 리패치는 언제든지 사용가능 데이터 옆에 리패치 적으면 됨
// export default function StaticRoutingMovedPage(): JSX.Element {
//   const { data, refetch } = useQuery<
//     Pick<IQuery, "fetchBoards">,
//     IQueryFetchBoardsArgs
//   >(FETCH_BOARDS);
//   console.log(data?.fetchBoards);

//   const onClickPage1 = (event: MouseEvent<HTMLSpanElement>): void => {
//     // async싱크쓰려면 Promise 타입 써야함
//     void refetch({ page: Number(event.currentTarget.id) });
//   };

//   const onClickPage2 = (event: MouseEvent<HTMLSpanElement>): void => {
//     void refetch({ page: Number(event.currentTarget.id) });
//   };

//   const onClickPage3 = (event: MouseEvent<HTMLSpanElement>): void => {
//     void refetch({ page: Number(event.currentTarget.id) });
//   };

//   return (
//     <div>
//       {data?.fetchBoards.map(
//         (
//           el // el타입 만드는거 보다는 패치보더에 타입을 만들면 자동으로 빨간줄 사라질거임
//         ) => (
//           <div key={el._id}>
//             <span style={{ margin: "10px" }}>{el.title}</span>
//             <span style={{ margin: "10px" }}>{el.writer}</span>
//           </div>
//         )
//       )}
//       <span id="1" onClick={onClickPage1}>
//         1
//       </span>
//       <span id="2" onClick={onClickPage2}>
//         2
//       </span>
//       <span id="3" onClick={onClickPage3}>
//         3
//       </span>
//     </div>
//   );
// }

//
//
//
//
//
//
//
//
//
//
//
//  첫 방식
// import { useQuery, gql } from "@apollo/client";
// import type {
//   IQuery,
//   IQueryFetchBoardsArgs,
// } from "../../../src/commons/types/generated/types";

// const FETCH_BOARDS = gql`
//   query fetchBoards($page: Int) {
//     fetchBoards(page: $page) {
//       _id
//       writer
//       title
//       contents
//     }
//   }
// `;
// // refetch쿼리는 뮤테이션 이후에 하는거고
// // 그냥 리패치는 언제든지 사용가능 데이터 옆에 리패치 적으면 됨
// export default function StaticRoutingMovedPage(): JSX.Element {
//   const { data, refetch } = useQuery<
//     Pick<IQuery, "fetchBoards">,
//     IQueryFetchBoardsArgs
//   >(FETCH_BOARDS);
//   console.log(data?.fetchBoards);

//   const onClickPage1 = (): void => {
//     // async싱크쓰려면 Promise 타입 써야함
//     void refetch({ page: 1 });
//   };

//   const onClickPage2 = (): void => {
//     void refetch({ page: 5 });
//   };

//   const onClickPage3 = (): void => {
//     void refetch({ page: 10 });
//   };

//   return (
//     <div>
//       {data?.fetchBoards.map(
//         (
//           el // el타입 만드는거 보다는 패치보더에 타입을 만들면 자동으로 빨간줄 사라질거임
//         ) => (
//           <div key={el._id}>
//             <span style={{ margin: "10px" }}>{el.title}</span>
//             <span style={{ margin: "10px" }}>{el.writer}</span>
//           </div>
//         )
//       )}
//       <span onClick={onClickPage1}>1</span>
//       <span onClick={onClickPage2}>2</span>
//       <span onClick={onClickPage3}>3</span>
//     </div>
//   );
// }
