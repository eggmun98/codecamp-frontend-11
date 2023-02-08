import { gql, useMutation } from "@apollo/client";

import { useState, useRef } from "react";

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

export default function ImageUploadPage() {
  const [imageUrl, setImageUrl] = useState("");

  const [uploadFile] = useMutation(UPLOAD_FILE);

  const fileRef = useRef(null);

  const onChangeFile = async (event) => {
    const file = event.target.files?.[0];

    const result = await uploadFile({ variables: { file } });
    console.log(result.data?.uploadFile);
    setImageUrl(result.data?.uploadFile.url ?? "");
  };

  const onImageButton = () => {
    fileRef.current?.click();
  };

  ////

  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [password, setPassword] = useState("");

  const [나의함수] = useMutation(나의그래프큐엘셋팅);

  const onClickSubmit = async () => {
    const result = await 나의함수({
      variables: {
        createBoardInput: {
          writer,
          title,
          contents,
          password: password,
          images: [imageUrl],
        },
      },
    });
    console.log(result);
    alert("눌러볼게요");
  };

  const onChangeWriter = (event) => {
    setWriter(event.currentTarget.value);
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const onChangeContents = (event) => {
    setContents(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      작성자: <input type="text" onChange={onChangeWriter} />
      제목: <input type="text" onChange={onChangeTitle} />
      내용: <input type="text" onChange={onChangeContents} />
      비밀번호: <input type="text" onChange={onChangePassword} />
      <input type="file" onChange={onChangeFile}></input>
      <img src={"https:/storage.googleapis.com/" + imageUrl} />
      <button style={{ display: "none" }} onClick={onClickSubmit} ref={fileRef}>
        이미지 등록숨겨진 버튼
      </button>
      <button
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: "gray",
          border: "none",
          background: "white",
        }}
        onClick={onImageButton}
      >
        👍🏿
      </button>
    </div>
  );
}

// 작성자: <input type="text"></input>
// 비밀번호: <input type="text"></input>
// 제목: <input type="text"></input>
// 내용: <input type="text"></input>
