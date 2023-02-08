import { useQuery, gql } from "@apollo/client";
import Checkbox from "./checkbox";

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

  // const abc = (event) => {
  //   alert(event.currentTarget.id + "님이 작성한 글입니다.");
  // };

  const qqq1 = () => {
    alert("qqq1");
  };

  const qqq4 = () => {
    alert("qqq4");
  };
  return (
    <div>
      {data?.fetchBoards.map((el) => (
        <div id={el.writer} onClick={qqq1}>
          <Checkbox></Checkbox>
          <span style={{ margin: "10px" }} onClick={qqq4}>
            {el.number}
          </span>
          <span style={{ margin: "10px" }}>{el.title}</span>

          <span style={{ margin: "10px" }}>{el.writer}</span>
        </div>
      ))}
    </div>
  );
}
