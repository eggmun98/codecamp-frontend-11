// import ReactQuill from "react-quill";
import { gql, useMutation } from "@apollo/client";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { wrapFormAsync } from "../../../src/commons/components/commons/libraries/asyncFunc";
// import { Modal } from 'antd'

const 나의그래프큐엘셋팅 = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
    }
  }
`;

const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

export default function WebEditorPage(): JSX.Element {
  const router = useRouter();
  const [나의함수] = useMutation(나의그래프큐엘셋팅);

  const { register, handleSubmit, setValue, trigger } = useForm({
    mode: "onChange",
  });

  // ReactQuill 만든 사람들이 만든 onChange 이므로 event 안들어옴
  const onChangeContents = (value: string): void => {
    console.log(value);

    // register로 등록하지 않고, 강제로 값을 넣어주는 기능!!
    setValue("contents", value === "<p><br></p>" ? "" : value);

    // onChange 됐으니까 에러검증 같은것들 해달라고 react-hook-form에 알려주는 기능!!
    void trigger("contents");
  };

  //   useEffect(() => {
  //     async function aaa(): Promise<void> {
  //       const { Modal } = await import("antd"); // code-splitting(코드스플릿팅)
  //       Modal.success({ content: "게시글 등록에 성공하였습니다!!!" });
  //     }
  //     void aaa();
  //   }, []);

  const onClickSubmit = async (data: any): Promise<void> => {
    const result = await 나의함수({
      variables: {
        createBoardInput: {
          writer: data.writer,
          password: data.password,
          title: data.title,
          contents: data.contents,
        },
      },
    });
    const { Modal } = await import("antd"); // code-splitting(코드스플릿팅)
    Modal.success({ content: "게시글 등록에 성공하였습니다!!!" });

    const boardId = result.data.createBoard._id;
    void router.push(`/section27/27-03-web-editor-xss-detail/${boardId}`);
  };

  return (
    <form onSubmit={wrapFormAsync(handleSubmit(onClickSubmit))}>
      작성자: <input type="text" {...register("writer")} />
      <br />
      비밀번호: <input type="password" {...register("password")} />
      <br />
      제목: <input type="text" {...register("title")} />
      <br />
      내용: <ReactQuill onChange={onChangeContents} />
      <button>등록하기</button>
    </form>
  );
}
// // import ReactQuill from "react-quill"; //

// import dynamic from "next/dynamic";
// // import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// import { Modal } from "antd";
// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { gql, useMutation } from "@apollo/client";
// import { useRouter } from "next/router";

// const ReactQuill = dynamic(async () => await import("react-quill"), {
//   ssr: false,
// });

// const 나의그래프큐엘셋팅 = gql`
//   mutation createBoard($createBoardInput: CreateBoardInput!) {
//     createBoard(createBoardInput: $createBoardInput) {
//       _id
//       writer
//       title
//       contents
//     }
//   }
// `;

// export default function WebEditorPage(): JSX.Element {
//   const { register, setValue, trigger, handleSubmit } = useForm({
//     mode: "onChange",
//   });

//   const [나의함수] = useMutation(나의그래프큐엘셋팅);
//   const router = useRouter();

//   const onChangeContents = (value: string): void => {
//     console.log(value);
//     setValue("contents", value === "<p><br></p>" ? "" : value);
//     void trigger("contents"); // onChange 됐으니까 에러검증 같은것들 해달라고 react-hook-form에 알려주는 기능 // 이거를 안적으면  리액트 훅 폼의 에러메세지가 안될거임!
//   };

//   // useEffect(() => {
//   //   async function aaa(): Promise<void> {
//   //     const { Modal } = await import("antd");
//   //     Modal.success({ content: "게시글 등록에 성공하였습니다.!!" });
//   //   }
//   //   void aaa();
//   // }, []);

//   const onClickSubmit = async (data: any): Promise<void> => {
//     const result = await 나의함수({
//       variables: {
//         createBoardInput: {
//           writer: data.writer,
//           title: data.title,
//           contents: data.contents,
//           password: data.password,
//         },
//       },
//     });

//     const { Modal } = await import("antd");
//     Modal.success({ content: "게시글 등록에 성공하였습니다.!!" });

//     const boardId = result.data.createBoard._id;
//     router.push(`/section27/27-03-web-editor-xss-detail/${boardId}`);
//   };

//   return (
//     <form onSubmit={handleSubmit(onClickSubmit)}>
//       작성자: <input type="text" {...register("writer")}></input>
//       <br />
//       비밀번호: <input type="password" {...register("password")}></input>
//       <br />
//       제목: <input type="text" {...register("title")}></input>
//       <br />
//       내용
//       <ReactQuill onChange={onChangeContents}></ReactQuill>
//       <button>등록하기</button>
//     </form>
//   );
// }
