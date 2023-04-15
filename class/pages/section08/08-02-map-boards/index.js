import { useQuery, gql } from "@apollo/client";

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

export default function StaticRoutingMovedPage() {
  const { data } = useQuery(FETCH_BOARDS);
  console.log(data?.fetchBoards);

  //   const mystyles = {
  //     margin: "10px",
  //   }; // 이런 방법으로 스타일을 줄수 있음 근데 이건 귀찮으니 아래에 보시면 style={{margin: "10px"}} 이렇게 안에 스타일 적용이 가능하게 바뀜

  return (
    <div>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span>
            <input type="checkbox"></input>
          </span>
          <span style={{ margin: "10px" }}>{el.number}</span>
          <span style={{ margin: "10px" }}>{el.title}</span>
          <span style={{ margin: "10px" }}>{el.writer}</span>
        </div>
      ))}
      {/* <div>1번 게시글로 이동이 완료되었습니다.</div>
      <div>작성자 : {data && data.fetchBoard.writer}</div>{" "}
      <div>제목: {data ? data.fetchBoard.title : "로딩중입니다!!"}</div>{" "}
      <div>내용: {data?.fetchBoard.contents}</div> */}
    </div>
  );
}
