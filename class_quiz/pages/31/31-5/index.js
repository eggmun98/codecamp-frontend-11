import { gql, useMutation, useQuery } from "@apollo/client";

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

export default function Quiz3105() {
  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: "63fdad62aef9f000281b2f13",
    },
  });
  console.log(data);
  const [like_board] = useMutation(LIKE_BOARD);

  const onClickLike = async () => {
    await like_board({
      variables: {
        boardId: "63fdad62aef9f000281b2f13",
      },

      update: (cache, { data }) => {
        cache.writeQuery({
          query: FETCH_BOARD,
          variables: {
            boardId: "63fdad62aef9f000281b2f13",
          },
          data: {
            fetchBoard: {
              _id: "63fdad62aef9f000281b2f13",
              __typenmae: "Board",
              likeCount: data?.likeBoard,
            },
          },
        });
      },
    });
  };

  return (
    <>
      <div>카운터 수 : {data?.fetchBoard.likeCount} </div>
      <button onClick={onClickLike}>카운터 올리기</button>
    </>
  );
}
