import { gql, useMutation } from "@apollo/client";
import type { ChangeEvent } from "react";
import { useRef, useState } from "react";
import { checkValidationFile } from "../../../src/commons/components/commons/libraries/validationFile";
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
  const fileRef = useRef<HTMLInputElement>(null);

  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);

  const onChangeFile = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0];

    const isValid = checkValidationFile(file);
    if (!isValid) return; // isValid가 펄스면 리턴 트루면 계속 아래줄 실행!

    // 밑에 이프문들은 앞으로 계속 사용할 것이다!! 그래서 공용파일에 나둬서 계속 쓸수 있께 할거임
    // if (typeof file === "undefined") {
    //   alert("파일이 없습니다!");
    //   return;
    // }

    // if (file.size > 5 * 1024 * 1024) {
    //   // byte가  1024개가 모이면 kb kb가 1024개가 모이면 mb 그래서 5를 곱해준거임 5MB
    //   alert("파일 용량이 너무 큽니다. (제한: 5MB 까지 가능)");
    //   return;
    // }

    // if (!file.type.includes("jpeg") && !file.type.includes("png")) {
    //   alert("jpeg 또는 png 파일만 업로드 가능합니다!");
    //   return;
    // }

    const result = await uploadFile({ variables: { file } });
    console.log(result.data?.uploadFile);
    setImageUrl(result.data?.uploadFile.url ?? "");
  };

  const onClickImage = (): void => {
    fileRef.current?.click();
  };
  //   accept="image/jpeg,image/png" 이프문 안써도 태그에 이거를 적어서 가능하긴 함!! 즉 js부분에 검증하거나 html에서 아예 막는 방법이 있다!!
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
        accept="image/jpeg,image/png"
      ></input>

      <img src={"https:/storage.googleapis.com/" + imageUrl}></img>
    </>
  );
}
