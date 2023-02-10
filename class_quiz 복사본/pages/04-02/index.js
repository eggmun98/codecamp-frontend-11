import { useMutation, gql } from "@apollo/client";

const myGraphql = gql`
  mutation {
    createBoard(
      writer: "문성진"
      title: "프론트엔드란"
      contents: "유저인터페이스"
    ) {
      _id
      number
      message
    }
  }
`;

export default function Quiz0402() {
  const [myfun] = useMutation(myGraphql);

  const onClickButton = async () => {
    const sum = await myfun();
    console.log(sum);
  };

  return <button onClick={onClickButton}>GRAPHQL-AP요청하기</button>;
}
