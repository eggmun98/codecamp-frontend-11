import { useQuery, gql } from "@apollo/client";
import type {
  IBoard,
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

export default function StaticRoutingMovedPage(): JSX.Element {
  const { data } = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS
  );

  const onClickBesket = (basket: IBoard) => () => {
    console.log(basket); // basket은 el임 즉 매개변수로 el을 받아와서 basket에 담는거임!

    // 1. 기존 장바구니 가져오기!
    const baskets: IBoard[] = JSON.parse(
      localStorage.getItem("baskets") ?? "[]"
    ); // JOSN.parse객체나 배열로 바꿔줌 그리고 만약 baskets가 null이라면 문자연 빈배열이라도 만들어줘

    // 2. 이미 담겼는지 확인하기!!
    const temp = baskets.filter((el) => el._id === basket._id); // el._id 와 basket._id가 있으면 필터링 해줘 // 임시 데이터를 담는 변수는 temp라고 씀
    if (temp.length >= 1) {
      // temp의 길이가 1이상이거나 같다면 오류메세지 띄우기!!
      alert("이미 담으신 물품 ㅇ비니다!!");
      return;
    }

    // 3. 내가 클릭한거 추가하기
    // delete basket.__typename; // 좋지 못한 사례 원본 데이터를 건들기 때문에!! 그래서 rest 방식을 이용해야 한다!! // 안전하지 못한 사례
    const { __typename, ...rest } = basket; // 즉 __typename만빼고 rest에 나머지가 담겨질 수 있다! rest이름은 바꿀 수 있음! // 안전한 사례
    baskets.push(basket);

    // 4. 추가된 장바구니 저장하기
    localStorage.setItem("baskets", JSON.stringify(baskets)); // 로컬 스토리지에는 문자열만 받을 수 있기 때문에 객체를 문자열로 변경 후 넣어줘야 한다!
  };

  // 만약 장바구니 페이지에서 가져오기도 만들고 싶다면...? localStorage.getItem 이거는 프리렌더링시 에러가 났음
  // localStorage.getItem() => 프리렌더링시 에러!!
  // 그러면 어떻게? useEffect 사용한다

  return (
    <div>
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{ margin: "10px" }}>{el.title}</span>
          <span style={{ margin: "10px" }}>{el.writer}</span>
          <button onClick={onClickBesket(el)}>장바구니 담기</button>
        </div>
      ))}
    </div>
  );
}
