import { useQuery, gql, useMutation } from "@apollo/client";
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

const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

const 나의그래프큐엘셋팅 = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function StaticRoutingMovedPage(): JSX.Element {
  const { data } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS
  );

  const [deleteBoard] = useMutation(DELETE_BOARD);
  const [나의함수] = useMutation(나의그래프큐엘셋팅);

  interface IPrev {
    __ref: string;
  }

  // 개발자 도구탭에 아폴로에서 캐쉬를 확인할 수 있다!
  const onClickDelete = (boardId: string) => (): void => {
    void deleteBoard({
      variables: { boardId },
      //   refetchQueries: [{ query: FETCH_BOARDS }],
      update(cache, { data }) {
        cache.modify({
          // 캐시수정하는게 modify
          fields: {
            fetchBoards: (prev: IPrev[], { readField }) => {
              const deletedId = data.deleteBoard;
              const filteredPrev = prev.filter(
                (el) => readField("_id", el) !== deletedId
              ); // el._id를 그대로 못불러오니 readField 함수를 이용하여한다 readField("_id", el)뜻은 el에서 _id를 가져온다
              return [...filteredPrev];
              // 이전 값이 prev로 담아져 옴
              //   const deletedId = data.deleteBoard; // 삭제 완료된 ID
              //   const filteredPrev = prev.filter((el) => el._id !== deletedId); // 삭제 안된것들만 다시 돌려줘! // prev안에 el이 객체로 안들어와서 el._id 못쓸거임
              //   return [...filteredPrev]; // 삭제된 id를 제외한 나머지 9개만 리턴!!
            },
          },
        });
      },
    });
  };

  const onClickSubmit = (): void => {
    // 등록할 때 마다 개발자도구 아폴로 탭 캐쉬탭에 추가 될거임!
    const result = 나의함수({
      variables: {
        createBoardInput: {
          writer: "철수",
          title: "제목입니다.",
          contents: "내용입니다",
          password: "1234",
        },
      },
      //   update(cache, response){
      //response를 구조분해할당으로 {data}로 받는거임
      //   }

      update(cache, { data }) {
        cache.modify({
          fields: {
            // data.createBoard // 요 안에 있는게 {} 이고, {writer:"철수", ...} 이객체를 불러온다. // 최신 데이터를 불러온다
            fetchBoards: (prev) => {
              // prev는 기존꺼 3개 // 패치보더스에서 prev에 기존꺼3 개를 담고
              // return [...prev, data.createBoard] // ...prev는 기존꺼 다시 돌려줌 그리고 data.createBoard 추가한거
              return [data.createBoard, ...prev]; // data.createBoard를 앞에 써줌으로써 최신꺼를 앞으로 불러옴
            },
          },
        });
      },
    });
    console.log(result);
  };

  return (
    <div>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{ margin: "10px" }}>{el.title}</span>
          <span style={{ margin: "10px" }}>{el.writer}</span>
          <button onClick={onClickDelete(el._id)}>삭제하기</button>
        </div>
      ))}
      <button onClick={onClickSubmit}>등록하기</button>
    </div>
  );
}

// 노원두 멘토님이 쓴 코드
// import { useQuery, gql, useMutation } from "@apollo/client";
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

// const DELETE_BOARD = gql`
//   mutation deleteBoard($boardId: ID!) {
//     deleteBoard(boardId: $boardId)
//   }
// `;

// const 나의그래프큐엘셋팅 = gql`
//   mutation createBoard($createBoardInput: CreateBoardInput!) {
//     createBoard(createBoardInput: $createBoardInput) {
//       _id
//       writer
//       title
//       contents
//     }
//   }
// `;

// export default function StaticRoutingMovedPage(): JSX.Element {
//   const { data } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
//     FETCH_BOARDS
//   );

//   const [deleteBoard] = useMutation(DELETE_BOARD);
//   const [나의함수] = useMutation(나의그래프큐엘셋팅);

//   interface IPrev {
//     __ref: string;
//   }

//   const onClickDelete = (boardId: string) => (): void => {
//     void deleteBoard({
//       variables: { boardId },
//       //   refetchQueries: [{ query: FETCH_BOARDS }],
//       update(cache, { data }) {
//         cache.modify({
//           fields: {
//             fetchBoards: (prev: IPrev[], { readField }) => {
//               console.log(prev);
//               const deletedId = data.deleteBoard; // 삭제 완료된 ID
//               const filteredPrev = prev.filter(
//                 (el) => readField("_id", el) !== deletedId
//               );
//               return [...filteredPrev]; // 삭제된ID를 제외한 나머지 9개만 리턴
//             },
//           },
//         });
//       },
//     });
//   };
//   const onClickSubmit = (): void => {
//     void 나의함수({
//       variables: {
//         createBoardInput: {
//           writer: "철수",
//           password: "1234",
//           title: "제목입니다~~",
//           contents: "내용입니다@@@",
//         },
//       },
//       //   refetchQueries: [{ query: FETCH_BOARDS }],
//       update(cache, { data }) {
//         cache.modify({
//           fields: {
//             fetchBoards: (prev) => {
//               return [data.createBoard, ...prev];
//             },
//           },
//         });
//       },
//     });
//   };

//   return (
//     <div>
//       {data?.fetchBoards.map((el) => (
//         <div key={el._id}>
//           <span style={{ margin: "10px" }}>{el.title}</span>
//           <span style={{ margin: "10px" }}>{el.writer}</span>
//           <button onClick={onClickDelete(el._id)}>삭제하기</button>
//         </div>
//       ))}
//       <button onClick={onClickSubmit}>등록하기</button>
//     </div>
//   );
// }
