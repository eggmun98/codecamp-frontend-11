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
  const [imageUrls, setImageUrls] = useState(["", "", ""]);
  const [files, setFiles] = useState([]);
  const [uploadFile] = useMutation(UPLOAD_FILE);
  const [나의함수] = useMutation(나의그래프큐엘셋팅);

  const onChangeFile = (index) => (event) => {
    const file = event.target.files?.[0];

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      const tempUrls = [...imageUrls];
      tempUrls[index] = event.target.result;
      setImageUrls(tempUrls);

      const tempFile = [...files];
      tempFile[index] = file;
      setFiles(tempFile);
    };
  };

  const onClickSubmit = async () => {
    // const resultFile = await uploadFile({ variables: { file: file } });
    // const url = resultFile.data?.uploadFile.url;

    const resultFile0 = await uploadFile({ variables: { file: files[0] } });
    const resultFile1 = await uploadFile({ variables: { file: files[1] } });
    const resultFile2 = await uploadFile({ variables: { file: files[2] } });
    const url0 = resultFile0.data?.uploadFile.url;
    const url1 = resultFile1.data?.uploadFile.url;
    const url2 = resultFile2.data?.uploadFile.url;
    const resultUrls = [url0, url1, url2];

    const result = await 나의함수({
      variables: {
        createBoardInput: {
          writer: "111",
          title: "222",
          contents: "333",
          password: "1234",
          images: resultUrls,
        },
      },
    });
    console.log(result);
    alert("게시글을 등록하였습니다.");
  };

  return (
    <div>
      <input type="file" onChange={onChangeFile(0)}></input>
      <input type="file" onChange={onChangeFile(1)}></input>
      <input type="file" onChange={onChangeFile(2)}></input>
      <img src={imageUrls[0]}></img>
      <img src={imageUrls[1]}></img>
      <img src={imageUrls[2]}></img>
      <button onClick={onClickSubmit}>게시글 등록하기</button>
    </div>
  );
}
