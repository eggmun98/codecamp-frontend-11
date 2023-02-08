import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import WriterUiPage from "./Writer.presenter";
import { CREATE_BOARD, UPDATE_BOARD, FETCH_BOARD } from "./Writer.queries";
import { useState } from "react";

export default function WriterPage(props) {
  const router = useRouter();

  const [create_board] = useMutation(CREATE_BOARD);
  const [update_board] = useMutation(UPDATE_BOARD);
  // const [upload_file] = useMutation(UPLOAD_FILE);

  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  // const [image, setImage] = useState("");
  // const [image2, setImage2] = useState("");
  // const [image3, setImage3] = useState("");

  // const upImage = useRef(null);
  // const upImage2 = useRef(null);
  // const upImage3 = useRef(null);

  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: router.query.number,
    },
  });

  // const onClickImageUploadButoon = async (event) => {
  //   // console.log(event.target.files?.[0]);
  //   const file = event.target.files?.[0];
  //   const result = await upload_file({ variables: { file } });
  //   setImage(result.data?.uploadFile.url ?? "");
  // };

  // const onClickImageUploadButoon2 = async (event) => {
  //   console.log(event.target.files?.[0]);
  //   const file2 = event.target.files?.[0];
  //   const result2 = await upload_file({ variables: { file2 } });
  //   setImage2(result2.data?.uploadFile.url ?? "");
  // };

  // const onClickImageUploadButoon3 = async (event) => {
  //   const file3 = event.target.files?.[0];
  //   const result3 = await upload_file({ variables: { file3 } });
  //   setImage3(result3.data?.uploadFile.url ?? "");
  // };

  // const onClickImageButton = () => {
  //   upImage.current?.click();
  // };

  // const onClickImageButton2 = () => {
  //   upImage2.current?.click();
  // };

  // const onClickImageButton3 = () => {
  //   upImage3.current?.click();
  // };

  function writerCheck(event) {
    setWriter(event.target.value);
  }

  function passwordCheck(event) {
    setPassword(event.target.value);
  }

  function titleCheck(event) {
    setTitle(event.target.value);
  }

  function contentCheck(event) {
    setContents(event.target.value);
  }

  const onClickCreateButton = async () => {
    const result = await create_board({
      variables: {
        createBoardInput: {
          writer: writer,
          title: title,
          password: password,
          contents: contents,
        },
      },
    });
    router.push("/board/" + result.data.createBoard._id);
    // console.log(result);
    // 작성은 성공
  };

  const onClickUpdateButton = async () => {
    const updateBoardInput = {};
    if (title !== "") updateBoardInput.title = title;
    if (contents !== "") updateBoardInput.contents = contents;

    const result2 = await update_board({
      variables: {
        boardId: router.query.number,
        password,
        updateBoardInput: updateBoardInput,
      },
    });
    router.push(`/board/${result2.data.updateBoard._id}`);
    // console.log(router);
    // alert("수정하였습니다.");
  };

  const onClickWriterCancellationButton = () => {
    router.push("/");
  };

  const onClickUpdateCancellationButton = () => {
    router.push(`/board/${router.query.number}`);
  };

  return (
    <>
      <WriterUiPage
        writerCheck={writerCheck}
        passwordCheck={passwordCheck}
        titleCheck={titleCheck}
        contentCheck={contentCheck}
        onClickCreateButton={onClickCreateButton}
        isEdit={props.isEdit}
        onClickUpdateButton={onClickUpdateButton}
        data={data}
        onClickWriterCancellationButton={onClickWriterCancellationButton}
        onClickUpdateCancellationButton={onClickUpdateCancellationButton}
        onClickImageUploadButoon={onClickImageUploadButoon}
        upImage={upImage}
        image={image}
        onClickImageButton={onClickImageButton}
      ></WriterUiPage>
    </>
  );
}
