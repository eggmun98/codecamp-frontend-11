import { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

const 나의그래프큐엘셋팅 = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
    }
  }
`;

export default function Quiz3102Page() {
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState();
  const [uploadFile] = useMutation(UPLOAD_FILE);
  const [나의함수] = useMutation(나의그래프큐엘셋팅);

  const onChangeFile = async (event) => {
    const file = event.target.files?.[0];

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      setImageUrl(event.target.result);
      setFile(file);
    };
  };

  const onClickSubmit = async () => {
    const resultFile = await uploadFile({ variables: { file: file } });
    const url = resultFile.data?.uploadFile.url;

    const result = await 나의함수({
      variables: {
        createBoardInput: {
          writer: "111",
          title: "222",
          contents: "333",
          password: "1234",
          images: [url],
        },
      },
    });
    console.log(result);
    alert("게시글을 등록하였습니다.");
  };

  return (
    <>
      <input type="file" onChange={onChangeFile}></input>
      <img src={imageUrl}></img>
      <button onClick={onClickSubmit}>게시글 등록하기</button>
    </>
  );
}
