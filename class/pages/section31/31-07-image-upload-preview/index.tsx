// import { gql, useMutation } from "@apollo/client";
import type { ChangeEvent } from "react";
import { useState } from "react";
import { wrapAsync } from "../../../src/commons/components/commons/libraries/asyncFunc";
// import type {
//   IMutation,
//   IMutationUploadFileArgs,
// } from "../../../src/commons/types/generated/types";

// const UPLOAD_FILE = gql`
//   mutation uploadFile($file: Upload!) {
//     uploadFile(file: $file) {
//       url
//     }
//   }
// `;

export default function ImageUploadPage(): JSX.Element {
  const [imageUrl, setImageUrl] = useState("");

  //   const [uploadFile] = useMutation<
  //     Pick<IMutation, "uploadFile">,
  //     IMutationUploadFileArgs
  //   >(UPLOAD_FILE);

  const onChangeFile = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0]; // 배열로 들어오는 이유 <input type="fle" multiple /> 일 때, 여러개 드래그 가능!
    // 값이 없을 경우가 있으니 옵셔널체인지 써야함!
    if (file === undefined) return;
    console.log(file);

    //     const result = await uploadFile({ variables: { file } }); // 변수 파일에 파일을 넣어서 $파일에 전달!
    //     // console.log(result.data?.uploadFile);
    //     setImageUrl(result.data?.uploadFile.url ?? "");

    // 1. 임시 URL 생성 => (가짜URL - 내 브라우저에서만 접근 가능)
    // const result = URL.createObjectURL(file); // 이거는 지원 안하는 브라우저가 있기 때문에 2번 방법으로 하겠음!
    // console.log(result);

    // 2. 임시 URL 생성 => (진짜URL - 다른 브라우저에서도 접근 가능)
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      console.log(event.target?.result); // 게시판에서 event.target.id를 쓰면 eslint가 잡았던 이유: event.target은 태그만을 가르키지 않음
      if (typeof event.target?.result === "string")
        setImageUrl(event.target?.result); // 미리보기를 위해서
    };
  };
  return (
    <>
      {/* 멀티풀 트루 여러개 드래그 가능 */}
      <input type="file" onChange={onChangeFile}></input>
      <img src={imageUrl}></img>

      {/* <img src={"https:/storage.googleapis.com/" + imageUrl}></img>  */}
    </>
  );
}
