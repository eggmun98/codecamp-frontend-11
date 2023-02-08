import { gql, useMutation } from "@apollo/client";
import type { ChangeEvent } from "react";
import { useState } from "react";
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

export default function ImageUploadPage(): JSX.Element {
  const [imageUrl, setImageUrl] = useState("");

  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);

  const onChangeFile = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0]; // 배열로 들어오는 이유 <input type="fle" multiple /> 일 때, 여러개 드래그 가능!
    // 값이 없을 경우가 있으니 옵셔널체인지 써야함!

    const result = await uploadFile({ variables: { file } }); // 변수 파일에 파일을 넣어서 $파일에 전달!
    console.log(result.data?.uploadFile);
    setImageUrl(result.data?.uploadFile.url ?? "");
  };
  return (
    <>
      {/* 멀티풀 트루 여러개 드래그 가능 */}
      <input type="file" onChange={onChangeFile}></input>

      <img src={"https:/storage.googleapis.com/" + imageUrl}></img>
    </>
  );
}
