import { useMutation } from "@apollo/client";
import { useRef } from "react";
import type { ChangeEvent } from "react";
import Uploads01UI from "./Uploads01.presenter";
import { UPLOAD_FILE } from "./Uploads01.queries";
import { Modal } from "antd";

export default function Uploads01(props): JSX.Element {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const onClickUpload = (): void => {
    fileRef.current?.click();
  };

  const onChangeFile = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0]; // file는 한개 files는 여러개

    try {
      const result = await uploadFile({ variables: { file } });
      props.onChangeFileUrls(result.data.uploadFile.url, props.index); // url은 result안에 있는거, index로 몇번쨰 칸 클릭했는지 확인 가능 즉 0번쨰 칸 1번째칸 2번째 칸
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  return (
    <Uploads01UI
      fileRef={fileRef}
      fileUrl={props.fileUrl}
      defaultFileUrl={props.defaultFileUrl}
      onClickUpload={onClickUpload}
      onChangeFile={onChangeFile}
    />
  );
}

// import { useMutation } from "@apollo/client";
// import { ChangeEvent } from "react";
// import { useRef } from "react";
// import Uploads01UI from "./Uploads01.presenter";
// import { UPLOAD_FILE } from "./Uploads01.queries";

// export default function Uploads01(props): JSX.Element {
//   const fileRef = useRef(null);
//   const [upload_file] = useMutation(UPLOAD_FILE);

//   const onClickUpload = (): void => {
//     fileRef.current?.click();
//   };

//   const onChangeFile = async (
//     event: ChangeEvent<HTMLInputElement>
//   ): Promise<void> => {
//     const file = event.target.files?.[0];
//     const result = await upload_file({ variables: { file } });
//     props.onChangeFileUrlsCheck(result.data.uploadFile.url, props.index);
//   };

//   return (
//     <Uploads01UI
//       onClickUpload={onClickUpload}
//       onChangeFile={onChangeFile}
//       fileRef={fileRef}
//       fileUrl={props.fileUrl}
//     ></Uploads01UI>
//   );
// }
