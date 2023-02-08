import { gql, useMutation } from "@apollo/client";
import type { ChangeEvent } from "react";
import { useRef, useState } from "react";
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
  const fileRef = useRef<HTMLInputElement>(null); // 태그 저장 훅 // 일단 먼저 널값을 넣고 타입에는 인풋타입 넣는다고 말해준다

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

  const onClickImage = (): void => {
    // document.getElementById("파일태그아이디")?.click()  자바스크립트로 할때!!
    fileRef.current?.click();
  };

  return (
    <>
      <div
        style={{ width: "50px", height: "50px", backgroundColor: "gray" }}
        onClick={onClickImage}
      >
        이미지 선택
      </div>
      <input
        style={{ display: "none" }}
        type="file"
        onChange={onChangeFile}
        ref={fileRef}
      ></input>

      <img src={"https:/storage.googleapis.com/" + imageUrl}></img>
    </>
  );
}
