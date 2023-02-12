import { ChangeEvent, MouseEvent } from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_BOARD,
  UPDATE_BOARD,
  FETCH_BOARD,
  UPLOAD_FILE,
} from "./BoardWrite.queries";
import BoardWriteUI from "./BoardWrite.presenter";
import {
  IQuery,
  IUpdateBoardInput,
} from "../../../commons/types/generated/types";

interface IBoardWritePageProps {
  data?: any;
  isEdit: boolean;
}

export default function BoardWritePage(props) {
  const router = useRouter();

  // 작성했던 게시글 불러오기
  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: router.query.num,
    },
  });
  console.log(data);

  const [create_board] = useMutation(CREATE_BOARD);
  const [update_board] = useMutation(UPDATE_BOARD);

  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");
  const [error4, setError4] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  const [fileUrls, setFileUrls] = useState(["", "", ""]);

  // 이미지파일 저장 변수

  // 작성자 공백이 아니면 에러 표시 제거
  function writerCheck(event: ChangeEvent<HTMLInputElement>) {
    setWriter(event.target.value);
    if (event.target.value !== "") {
      setError1("");
    }
  }

  // 비밀번호  공백이 아니면 에러 표시 제거  또 작성한 값 불러오기
  function passwordCheck(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
    if (event.target.value !== "") {
      setError2("");
    }
  }

  // 제목  공백이 아니면 에러 표시 제거  또 작성한 값 불러오기
  function titleCheck(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
    if (event.target.value !== "") {
      setError3("");
    }
  }

  // 내용  공백이 아니면 에러 표시 제거  또 작성한 값 불러오기
  function contentCheck(event: ChangeEvent<HTMLInputElement>) {
    setContent(event.target.value);
    if (event.target.value !== "") {
      setError4("");
    }
  }
  // 상세주소 값 불러오기
  function addressDetailCheck(event: ChangeEvent<HTMLInputElement>) {
    setAddressDetail(event.target.value);
  }

  // 유튜브 주소 값 불러오기
  function youtubeUrlCheck(event: ChangeEvent<HTMLInputElement>) {
    setYoutubeUrl(event.target.value);
  }

  // 파일 저장 함수 // index는 몇번째 칸인지 fileUrl은 이미지 경로를 넣는 변수임!!
  function onChangeFileUrls(fileUrl: string, index: number): void {
    const newFileUrls = [...fileUrls]; // 위에 스테이트 파일변수를 구조분해 할당 시킨다!!
    newFileUrls[index] = fileUrl; // index, fileUrl의 매개변수를 할당!
    setFileUrls(newFileUrls); // 파일들을 최종적으로 여기에 담는다!!
  }

  // 유즈이펙트로 이미지를 디폴트벨류 대신 써줄 수 있음 근데 단점으로는 렌더링을 한번 더 하게 됨!
  // 그게 싫으면 프리젠터에서 porps.fileUrl !== "" 이거를 적으셈!!

  useEffect(() => {
    const images = data?.fetchBoard.images;
    console.log("image:는?? ", images);
    if (images !== undefined && images !== null) setFileUrls([...images]);
  }, [data]);
  // 서버에서 이미지 데이터를 가져온다 그리고 const images 변수에 담는다
  // 그리고 만약 images가 언디파인드랑 널값이 아니라면 setfileUrls는 [...images]을 할당해 준다.
  // 그리고 [data]가 변할때마다 실행!

  // 게시글 등록 버튼과 공백 체크
  const onClickCreateButton = async () => {
    if (writer === "") {
      setError1("작성자를 작성하시오.");
    }

    if (password === "") {
      setError2("비밀번호를 작성하시오.");
    }
    if (title === "") {
      setError3("제목을 작성하시오.");
    }
    if (content === "") {
      setError4("내용을 작성하시오.");
    }

    if (writer && password && title && content) {
      const result = await create_board({
        variables: {
          createBoardInput: {
            writer: writer,
            title: title,
            password: password,
            contents: content,
            youtubeUrl: youtubeUrl,
            boardAddress: {
              zipcode: zipcode,
              address: address,
              addressDetail: addressDetail,
            },
            images: [...fileUrls],
          },
        },
      });
      router.push("/boards/board/" + result.data.createBoard._id);
    }
  };

  interface IMyVariables {
    title?: string;
    contents?: string;
  }

  // 게시글 수정하는 버튼
  const onClickUpdateButton = async () => {
    const currentFiles = JSON.stringify(fileUrls);
    const defaultFiles = JSON.stringify(props.data?.fetchBoard.images);
    const isChangedFiles = currentFiles !== defaultFiles;

    const myVariables: IUpdateBoardInput = {}; // 빈객체 선언과 할당
    if (isChangedFiles) myVariables.images = fileUrls;
    if (title !== "") myVariables.title = title;
    if (content !== "") myVariables.contents = content;
    if (youtubeUrl !== "") myVariables.youtubeUrl = youtubeUrl;
    // 객체 안에 객체 선언과 할당
    if (zipcode !== "" || address !== "" || addressDetail !== "") {
      // 셋 중에 하나만 트루라면 밑에 코드들 실행
      myVariables.boardAddress = {}; // 이게 위에 있으면 수정이 안됨
      if (zipcode !== "") myVariables.boardAddress.zipcode = zipcode;
      if (address !== "") myVariables.boardAddress.address = address;
      if (addressDetail !== "")
        myVariables.boardAddress.addressDetail = addressDetail;
    }

    const result2 = await update_board({
      variables: {
        boardId: router.query.num,
        password,
        updateBoardInput: myVariables,
      },
    });
    router.push(`/boards/board/${result2.data.updateBoard._id}`);
  };

  const handleComplete = (data: any) => {
    addressShowModal();
    setAddress(data.address);
    setZipcode(data.zonecode);
    // setZipcode(data.zipcode);
  };

  const addressShowModal = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <BoardWriteUI
      isOpen={isOpen}
      zipcode={zipcode}
      address={address}
      addressShowModal={addressShowModal}
      handleComplete={handleComplete}
      writerCheck={writerCheck}
      passwordCheck={passwordCheck}
      titleCheck={titleCheck}
      contentCheck={contentCheck}
      addressDetailCheck={addressDetailCheck}
      youtubeUrlCheck={youtubeUrlCheck}
      onClickCreateButton={onClickCreateButton}
      onClickUpdateButton={onClickUpdateButton}
      error1={error1}
      error2={error2}
      error3={error3}
      error4={error4}
      isEdit={props.isEdit}
      data={data}
      fileUrls={fileUrls}
      onChangeFileUrls={onChangeFileUrls}
    ></BoardWriteUI>
  );
}
