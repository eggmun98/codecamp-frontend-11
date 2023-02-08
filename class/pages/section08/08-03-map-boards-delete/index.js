import { useQuery, gql, useMutation } from "@apollo/client";

const FETCH_BOARDS = gql`
  query {
    fetchBoards {
      number
      writer
      title
      contents
    }
  }
`;

const DELETE_BOARD = gql`
  mutation deleteBoard($number: Int) {
    deleteBoard(number: $number) {
      message
    }
  }
`;

export default function StaticRoutingMovedPage() {
  const { data } = useQuery(FETCH_BOARDS);
  const [deleteBoard] = useMutation(DELETE_BOARD);

  // console.log(data?.fetchBoards);

  //   const mystyles = {
  //     margin: "10px",
  //   }; // 이런 방법으로 스타일을 줄수 있음 근데 이건 귀찮으니 아래에 보시면 style={{margin: "10px"}} 이렇게 안에 스타일 적용이 가능하게 바뀜

  const onClickDelete = (event) => {
    //  Number(event.target.id); // html에서 가져온거기 떄문에 넘버로 숫자로 바꿔야함
    deleteBoard({
      variables: {
        number: Number(event.target.id),
      },
      refetchQueries: [{ query: FETCH_BOARDS }], //리패치라고 ya데이터를 삭제후 다시 새로운 데이터를 불러옴 즉 최근의 데이터 10개를 불러옴
    });
  };

  return (
    <div>
      {data?.fetchBoards.map((el, index) => (
        <div key={el.number}>
          {" "}
          {/*el.number 대신 index를 키로 사용하면 오류가 발생함 왜? 인덱스 0 을 삭제하면 새로운 데이터가 생성되니 인덱스 0이 또 있음 그래서 체크박스 표시가 안사라짐*/}
          {/* 각 div별로 구분이 가능함 즉 키로 각 div로 구분 가능 그래서 한 데이터를 삭제해도 모든 div삭제 가능 즉 el.number로 키값을 줘야한다. */}
          {/* 인덱스는 게시글을 삭제할 때, 다음 게시글이 올라오면서 기존 인덱스와 동일한 값을 가지게 됨. 즉, 유일하지 않음 */}
          <span>
            <input type="checkbox"></input>
          </span>
          <span style={{ margin: "10px" }}>{el.number}</span>
          <span style={{ margin: "10px" }}>{el.title}</span>
          <span style={{ margin: "10px" }}>{el.writer}</span>
          <span>
            <button id={el.number} onClick={onClickDelete}>
              삭제
            </button>
          </span>
        </div>
      ))}
      {/* <div>1번 게시글로 이동이 완료되었습니다.</div>
      <div>작성자 : {data && data.fetchBoard.writer}</div>{" "}
      <div>제목: {data ? data.fetchBoard.title : "로딩중입니다!!"}</div>{" "}
      <div>내용: {data?.fetchBoard.contents}</div> */}
    </div>
  );
}
