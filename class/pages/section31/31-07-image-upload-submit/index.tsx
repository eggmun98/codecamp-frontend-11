import { gql, useMutation } from "@apollo/client";
import type { ChangeEvent } from "react";
import { useState } from "react";
import { wrapAsync } from "../../../src/commons/components/commons/libraries/asyncFunc";
import type {
  IMutation,
  IMutationUploadFileArgs,
} from "../../../src/commons/types/generated/types";

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

export default function ImageUploadPage(): JSX.Element {
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState<File>();

  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);

  const [나의함수] = useMutation(나의그래프큐엘셋팅);

  const onChangeFile = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0]; // 배열로 들어오는 이유 <input type="fle" multiple /> 일 때, 여러개 드래그 가능!
    // 값이 없을 경우가 있으니 옵셔널체인지 써야함!
    if (file === undefined) return;
    console.log(file);

    // 1. 임시 URL 생성 => (가짜URL - 내 브라우저에서만 접근 가능)
    // const result = URL.createObjectURL(file); // 이거는 지원 안하는 브라우저가 있기 때문에 2번 방법으로 하겠음!
    // console.log(result);

    // 2. 임시 URL 생성 => (진짜URL - 다른 브라우저에서도 접근 가능) // 이거를 하는 이유는 미리보기 이미지를 보여주기 위해서 하는거다 즉 이미지파일을 서버에 보내기 전에 미리보기 이미지인 임시 url을 받아와서 유저에게 보여주는거다.
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      console.log(event.target?.result); // 게시판에서 event.target.id를 쓰면 eslint가 잡았던 이유: event.target은 태그만을 가르키지 않음
      if (typeof event.target?.result === "string") {
        setImageUrl(event.target?.result); // 미리보기 이미지를를 빠르게 보여주기 위해서 여기에 담는다.
        setFile(file);
      }
    };
  };

  const onClickSubmit = async (): Promise<void> => {
    // 1. uploadFile
    const resultFile = await uploadFile({ variables: { file } }); // 이제 찐 주소를 받아오기 위해서 온체인지에서 file 변수를 뺴서와 작성한다.
    const url = resultFile.data?.uploadFile.url; // 찐 주소를 가져와 url이라는 변수에 담는다.
    console.log("resultFile", resultFile);

    // 2. createBoard

    const result = await 나의함수({
      variables: {
        createBoardInput: {
          writer: "111",
          title: "222",
          contents: "333",
          password: "1234",
          images: [url], // 그리고 url을 여기에 할당을 하여 서버에 보낸다.
        },
      },
    });
    console.log(result);
    alert("게시글을 등록하였습니다.");
  };

  return (
    <>
      {/* 멀티풀 트루 여러개 드래그 가능 */}
      <input type="file" onChange={onChangeFile}></input>
      <img src={imageUrl}></img>

      {/* <img src={"https:/storage.googleapis.com/" + imageUrl}></img>  */}
      <button onClick={wrapAsync(onClickSubmit)}>게시글 등록하기</button>
    </>
  );
}
