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
  // console.log(data?.fetchBoards);

  const abc = (event) => {
    alert(event.currentTarget.id + "님이 작성한 글입니다.");
  };

  return (
    <div>
      {data?.fetchBoards.map((el) => (
        <div id={el.writer} onClick={abc} key={el.id}>
          <span>
            <input type="checkbox"></input>
          </span>
          <span style={{ margin: "10px" }}>{el.number}</span>
          <span style={{ margin: "10px" }}>{el.title}</span>
          {/* 최상단 부모에게만 아이디값을 주면 writer태그를 클릭하면 작동이 되는데 title 클릭하면 작동이 안됨 왜 title클릭 하니까 writer가 없어서 작동이안됨  */}
          {/* 이것을 해결하는 방법은 1. 자식태그인 number, writer, tilte에 각각 id={el.writer}을 넣어준다.  */}
          {/* 2. event.target.id에서 event.currentTarget.id  커런트 타겟으로 바꾼다. currentTarget은 무조건 태그만 선택 즉 event.target.id로 id가 빨간줄이 생겼을떄 if문을 적었는데 대신 커런트타겟을 적으면 해결됨
           */}
          <span style={{ margin: "10px" }}>{el.writer}</span>
        </div>
      ))}
    </div>
  );
}
