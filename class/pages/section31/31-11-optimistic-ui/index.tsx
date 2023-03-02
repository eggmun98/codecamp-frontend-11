import { gql, useMutation, useQuery } from "@apollo/client";
import type {
  IMutation,
  IMutationLikeBoardArgs,
  IQuery,
  IQueryFetchBoardArgs,
} from "../../../src/commons/types/generated/types";

export default function OptimisticUipage(): JSX.Element {
  const FETCH_BOARD = gql`
    query fetchBoard($boardId: ID!) {
      fetchBoard(boardId: $boardId) {
        _id
        likeCount
      }
    }
  `;

  const LIKE_BOARD = gql`
    mutation likeBoard($boardId: ID!) {
      likeBoard(boardId: $boardId)
    }
  `;

  const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(
    FETCH_BOARD,
    {
      variables: {
        boardId: "63fdad62aef9f000281b2f13",
      },
    }
  );

  const [likeBoard] = useMutation<
    Pick<IMutation, "likeBoard">,
    IMutationLikeBoardArgs
  >(LIKE_BOARD);

  const onClickLike = async (): Promise<void> => {
    await likeBoard({
      variables: {
        boardId: "63fdad62aef9f000281b2f13",
      },
      //   refetchQueries: [{}]
      optimisticResponse: {
        likeBoard: (data?.fetchBoard.likeCount ?? 0) + 1, // 거짓말을 하고 넘겨준다!
      }, // 이것을 테스트 할때 이거 끄고 해봐 그리고 네트워크를 3g로 해봐 그러면 엄청 늦게 올라간다 즉 느린 컴퓨터에서는 늦게 올라가니
      // 느린 컴퓨터에서도 빨라지게 하기 위해서 이것을 키고 하면 3g라도 빠르다!
      //   optimisticResponse: {
      //     qqq: 10
      //   },
      update: (cache, { data }) => {
        // 여기서 data.qqq 하면 10이 만들어질거임
        cache.writeQuery({
          // 값을 직접 바꾸기 위해서
          query: FETCH_BOARD, // 무슨 쿼리니
          variables: { boardId: "63fdad62aef9f000281b2f13" }, // 무슨 게시글이니
          data: {
            // 캐쉬 안에있는 패치보드를 바꿔치기 하려고 쓰는 거임!!
            fetchBoard: {
              _id: "63fdad62aef9f000281b2f13", // 이것을 기준으로 바꿔치기 할거임 // 필수값
              __typename: "Board", // 리턴 받는 타입 네임 // 이것도 기준이면서 필수값
              likeCount: data?.likeBoard, // 좋아요 갯수를 가져와서 바꿔치기 할꺼임
            },
          },
        });
      },
    });
  };

  return (
    <>
      <div> 현재카운트(좋아요): {data?.fetchBoard.likeCount}</div>
      <button onClick={onClickLike}>좋아요 올리기</button>
    </>
  );
}
