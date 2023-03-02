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
  const [imageUrls, setImageUrls] = useState(["", "", ""]);
  const [files, setFiles] = useState<File[]>([]);

  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);

  const [나의함수] = useMutation(나의그래프큐엘셋팅);

  const onClickSubmit = async (): Promise<void> => {
    // 1. uploadFile
    // 1-1) 안좋은 예제 - await를 매번 기다림 => for문 사용해도 마찬가지!
    // const resultFile0 = await uploadFile({ variables: { file: files[0] } });
    // const resultFile1 = await uploadFile({ variables: { file: files[1] } });
    // const resultFile2 = await uploadFile({ variables: { file: files[2] } });
    // const url0 = resultFile0.data?.uploadFile.url;
    // const url1 = resultFile1.data?.uploadFile.url;
    // const url2 = resultFile2.data?.uploadFile.url;
    // const resultUrls = [url0, url1, url2]; //  images: resultUrls,

    // // 1-2) 좋은 예제 - Promsie.all 사용
    // const results = await Promise.all([
    //   uploadFile({ variables: { file: files[0] } }),
    //   uploadFile({ variables: { file: files[1] } }),
    //   uploadFile({ variables: { file: files[2] } }),
    // ]);

    // console.log(results); // [resultFile0, resultFile1, resultFile2] 이렇게 담겨짐
    // const resultUrls = results.map((el) => el.data?.uploadFile.url); // [url0, url1, url2]

    // 1-3) 좋은 예제  - Promise.all 사용 => 리팩토링
    // const files = [File0, file1, file2];
    // files.map((el) => uploadFile({ variables: { file: el } }))
    const results = await Promise.all(
      files.map(async (el) => await uploadFile({ variables: { file: el } }))
    );
    console.log(results); // [resultFile0, resultFile1, resultFile2] 이렇게 담겨짐
    const resultUrls = results.map((el) => el.data?.uploadFile.url); // [url0, url1, url2]

    // 2. createBoard

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

  const onChangeFile =
    (index: number) =>
    async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
      const file = event.target.files?.[0]; // 배열로 들어오는 이유 <input type="fle" multiple /> 일 때, 여러개 드래그 가능!
      // 값이 없을 경우가 있으니 옵셔널체인지 써야함!
      if (file === undefined) return;
      console.log(file);

      // 1. 임시 URL 생성 => (가짜URL - 내 브라우저에서만 접근 가능)
      // const result = URL.createObjectURL(file); // 이거는 지원 안하는 브라우저가 있기 때문에 2번 방법으로 하겠음!
      // console.log(result);

      // 2. 임시 URL 생성 => (진짜URL - 다른 브라우저에서도 접근 가능)
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (event) => {
        console.log(event.target?.result); // 게시판에서 event.target.id를 쓰면 eslint가 잡았던 이유: event.target은 태그만을 가르키지 않음
        if (typeof event.target?.result === "string") {
          const tempUrls = [...imageUrls]; // tempUrls = ["", "", ""]
          tempUrls[index] = event.target?.result; // tempUrls[0]일 경우 // ["강아지.png", "", ""] = "강아지.png"
          setImageUrls(tempUrls); // ImageUrls = ["강아지.png", "", ""]

          const tempFiles = [...files];
          tempFiles[index] = file;
          setFiles(tempFiles);
        }
      };
    };
  return (
    <>
      {/* 멀티풀 트루 여러개 드래그 가능 */}
      <input type="file" onChange={onChangeFile(0)}></input>
      <input type="file" onChange={onChangeFile(1)}></input>
      <input type="file" onChange={onChangeFile(2)}></input>
      <img src={imageUrls[0]}></img>
      <img src={imageUrls[1]}></img>
      <img src={imageUrls[2]}></img>
      {/* <img src={"https:/storage.googleapis.com/" + imageUrl}></img>  */}
      <button onClick={wrapAsync(onClickSubmit)}>게시글 등록하기</button>
    </>
  );
}
