import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
const 나의그래프큐엘셋팅 = gql`
  mutation createBoard($writer: String, $title: String, $contents: String) {
    createBoard(writer: $writer, title: $title, contents: $contents) {
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutationPage() {
  const router = useRouter();

  const [나의함수] = useMutation(나의그래프큐엘셋팅);

  const onClickSubmit = async () => {
    // try {
    //   // try에 있는 내용을 시도하다가 실패하면, 다음에 있는 모든 줄들을 모두 무시하고, catch에 있는 내용이 실행됨
    //   const result = await 나의함수({
    //     variables: {
    //       writer: "훈이",
    //       title: "안녕하세요!!",
    //       contents: "반갑습니다",
    //     },
    //   });
    //   console.log(result.data.createBoard.number);
    //   console.log(result); // 현재 리절트에는 아이디랑 넘버 메세지갇 들어있음
    //   // router.push(
    //   //   "/section05/05-05-dynamic-routing-board-mutation-moved/" +
    //   //     result.data.createBoard.number
    //   // ); 아래 방식이 보기편함 즉 저 변수 부분에 자기가 받은 넘버의 번호가 적혀저 들어가 상세페이지로 이동을함
    //   router.push(
    //     `/section05/05-05-dynamic-routing-board-mutation-moved/${result.data.createBoard.number}`
    //   );
    // } catch (error) {
    //   //  트라이 성공하면 캐치는 진행안함 // 그리고 한줄 부분이 오류가 생기면 거기서 멈추고 바로 캐치부분 실행
    //   alert("error.message");
    // }

    const result = await 나의함수({
      variables: {
        writer: "훈이",
        title: "안녕하세요!!",
        contents: "반갑습니다",
      },
    });
    console.log(result.data.createBoard.number);
    console.log(result); // 현재 리절트에는 아이디랑 넘버 메세지갇 들어있음
    // router.push(
    //   "/section05/05-05-dynamic-routing-board-mutation-moved/" +
    //     result.data.createBoard.number
    // ); 아래 방식이 보기편함 즉 저 변수 부분에 자기가 받은 넘버의 번호가 적혀저 들어가 상세페이지로 이동을함
    router.push(
      `/section05/05-05-dynamic-routing-board-mutation-moved/${result.data.createBoard.number}`
    );
  };

  // 이게 완료되면 상세페이지로 이동한다.

  return <button onClick={onClickSubmit}>graphql-api 요청하기</button>;
}
