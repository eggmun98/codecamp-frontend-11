import { useQuery, gql } from "@apollo/client";

const FETCH_BOARD = gql`
  query {
    fetchBoard(number: 1) {
      number
      writer
      title
      contents
    }
  }
`;

export default function StaticRoutingMovedPage() {
  const { data } = useQuery(FETCH_BOARD); // 유크쿼리는 요청이 들어오면 바로 데이터를 가져옴
  // 데이터를 요청했는데 그동안은 data  변수는 언디파인드 상태다. 근데 그동안 데이터를 받는동안  언디파인드니 밑에 작성자, 제목, 내용이 안뜨는거다
  // 그래서 미리 작성자, 제목, 내용 html 글자만 미리 띄우고 나중에 데이터를 가져오는거다.
  // 근데 두번 그려짐 hmtl 한번 변수 데이터를 한번
  console.log(data);

  return (
    <div>
      <div>1번 게시글로 이동이 완료되었습니다.</div>
      <div>작성자 : {data && data.fetchBoard.writer}</div>{" "}
      {/* data 데이터가 있으면 그리고 없으면 그리지마  이게 바로 && 뜻이다. 즉 두번 그리는거 그래서 비동기로 작동해야한다.*/}
      {/*  근데 data && 없이 data.fetchBoard.title 만 적으면 오류가 생김 두번을 안그리고 그래서*/}
      <div>제목: {data ? data.fetchBoard.title : "로딩중입니다!!"}</div>{" "}
      {/* 위에는 삼항연산자다 이방식으로도 가능하다. 즉 왼쪽이 펄스면 맨오른쪽꺼 실행 왼쪽이 트루시면 가운대꺼 실행*/}
      <div>내용: {data?.fetchBoard.contents}</div>
      {/* data && 대신 ?. 적는 방식을 옵셔널 체이닝(optional-chaining 방식이라고 한다.
        즉 &&을 간단하게 쓸수 있다. */}
    </div>
  );
}
