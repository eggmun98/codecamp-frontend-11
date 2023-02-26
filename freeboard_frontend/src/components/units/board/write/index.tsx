import * as W from "./BoardWrite.styles";
import { Modal } from "antd";
import DaumPostcodeEmbed from "react-daum-postcode";
import { v4 as uuidv4 } from "uuid";
import Uploads01 from "../../../commons/uploads/01/Uploads01.container";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_BOARD, UPDATE_BOARD, FETCH_BOARD } from "./BoardWrite.queries";
import { IUpdateBoardInput } from "../../../commons/types/generated/types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./BoardWrite.validation";
import { useQueryFetchBoard } from "../../../commons/hooks/queries/board/useQueryFetchBoard";

export default function BoardWriteUI(props: any): JSX.Element {
  const router = useRouter();

  const { data: boardData } = useQueryFetchBoard();

  const [create_board] = useMutation(CREATE_BOARD);
  const [update_board] = useMutation(UPDATE_BOARD);

  const [isOpen, setIsOpen] = useState(false);
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");

  const [fileUrls, setFileUrls] = useState(["", "", ""]);

  const { register, handleSubmit } = useForm({
    // resolver: yupResolver(schema),
    // mode: "onChange",
  });

  // 파일 저장 함수 // index는 몇번째 칸인지 fileUrl은 이미지 경로를 넣는 변수임!!
  function onChangeFileUrls(fileUrl: string, index: number): void {
    const newFileUrls = [...fileUrls]; // 위에 스테이트 파일변수를 구조분해 할당 시킨다!!
    newFileUrls[index] = fileUrl; // index, fileUrl의 매개변수를 할당!
    setFileUrls(newFileUrls); // 파일들을 최종적으로 여기에 담는다!!
  }

  // 유즈이펙트로 이미지를 디폴트벨류 대신 써줄 수 있음 근데 단점으로는 렌더링을 한번 더 하게 됨!
  // 그게 싫으면 프리젠터에서 porps.fileUrl !== "" 이거를 적으셈!!

  useEffect(() => {
    const images = boardData?.fetchBoard.images;
    console.log("image:는?? ", images);
    if (images !== undefined && images !== null) setFileUrls([...images]);
  }, [boardData]);
  // 서버에서 이미지 데이터를 가져온다 그리고 const images 변수에 담는다
  // 그리고 만약 images가 언디파인드랑 널값이 아니라면 setfileUrls는 [...images]을 할당해 준다.
  // 그리고 [data]가 변할때마다 실행!

  interface IProps {
    writer: string;
    title: string;
    password: string;
    contents: string;
    youtubeUrl: string;
    addressDetail: string;
  }

  // 게시글 등록 버튼과 공백 체크
  const onClickCreateButton = async (data: IProps) => {
    const result = await create_board({
      variables: {
        createBoardInput: {
          writer: data.writer,
          title: data.title,
          password: data.password,
          contents: data.contents,
          youtubeUrl: data.youtubeUrl,
          boardAddress: {
            zipcode: zipcode,
            address: address,
            addressDetail: data.addressDetail,
          },
          images: [...fileUrls],
        },
      },
    });
    router.push("/boards/board/" + result.data.createBoard._id);
  };

  // 게시글 수정하는 버튼
  const onClickUpdateButton = async (data: any) => {
    const currentFiles = JSON.stringify(fileUrls);
    const defaultFiles = JSON.stringify(boardData?.fetchBoard.images);
    const isChangedFiles = currentFiles !== defaultFiles;

    const myVariables: IUpdateBoardInput = {}; // 빈객체 선언과 할당
    if (isChangedFiles) myVariables.images = fileUrls;
    if (data.title !== "") myVariables.title = data.title;
    if (data.contents !== "") myVariables.contents = data.contents;
    if (data.youtubeUrl !== "") myVariables.youtubeUrl = data.youtubeUrl;
    // 객체 안에 객체 선언과 할당
    if (zipcode !== "" || address !== "" || data.addressDetail !== "") {
      // 셋 중에 하나만 트루라면 밑에 코드들 실행
      myVariables.boardAddress = {}; // 이게 위에 있으면 수정이 안됨
      if (zipcode !== "") myVariables.boardAddress.zipcode = zipcode;
      if (address !== "") myVariables.boardAddress.address = address;
      if (data.addressDetail !== "")
        myVariables.boardAddress.addressDetail = data.addressDetail;
    }

    const result2 = await update_board({
      variables: {
        boardId: router.query.num,
        password: data.password,
        updateBoardInput: myVariables,
      },
    });
    router.push(`/boards/board/${result2.data.updateBoard._id}`);
  };

  const handleComplete = (boardData: any) => {
    addressShowModal();
    console.log(boardData);
    setAddress(boardData.address);
    setZipcode(boardData.zonecode);
    // setZipcode(data.zipcode);
  };

  const addressShowModal = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <form
      onSubmit={
        props.isEdit
          ? handleSubmit(onClickUpdateButton)
          : handleSubmit(onClickCreateButton)
      }
    >
      <W.Wrapper>
        <W.Title>{props.isEdit ? "게시글 수정" : "게시글 등록"}</W.Title>
        <W.WriterWrapper>
          <W.LeftBox>
            <W.MainLabel>작성자</W.MainLabel>
            <W.Writer
              type="text"
              placeholder="작성자를 작성해주세요."
              {...register("writer")}
              defaultValue={boardData?.fetchBoard.writer}
              readOnly={boardData?.fetchBoard.writer}
            ></W.Writer>
            <W.ErrorText>
              {/* {props.isEdit ? "" : formState.errors.writer?.message}  */}
            </W.ErrorText>
          </W.LeftBox>
          <W.RightBox>
            <W.Label>비밀번호</W.Label>
            <W.Password
              type="password"
              placeholder="비밀번호를 입력해주세요."
              {...register("password")}
            ></W.Password>
            {/* <W.ErrorText>{formState.errors.password?.message}</W.ErrorText> */}
          </W.RightBox>
        </W.WriterWrapper>
        <W.SubJectWrapper>
          <W.Label>제목</W.Label>
          <W.SubJect
            type="text"
            placeholder="제목을 작성해주세요."
            {...register("title")}
            defaultValue={boardData?.fetchBoard.title}
          ></W.SubJect>
          {/* <W.ErrorText>{formState.errors.title?.message}</W.ErrorText> */}
        </W.SubJectWrapper>
        <W.ContentsWrapper>
          <W.Label>내용</W.Label>
          <W.Contents
            type="text"
            placeholder="내용을 작성해주세요."
            {...register("contents")}
            defaultValue={boardData?.fetchBoard.contents}
          ></W.Contents>
          {/* <W.ErrorText>{formState.errors.contents?.message}</W.ErrorText>  */}
        </W.ContentsWrapper>
        <W.AddressWrapper>
          <W.Label>주소</W.Label>
          <W.PostalCodeWrapper>
            <W.PostalCode
              placeholder="07250"
              readOnly
              value={
                zipcode !== ""
                  ? zipcode
                  : boardData?.fetchBoard.boardAddress?.zipcode ?? ""
              }
            ></W.PostalCode>
            <W.PostalCodeButton type="primary" onClick={addressShowModal}>
              주소 검색
            </W.PostalCodeButton>
            {isOpen && (
              <Modal
                title="주소"
                open={isOpen}
                onOk={addressShowModal}
                onCancel={addressShowModal}
              >
                <DaumPostcodeEmbed
                  onComplete={handleComplete}
                ></DaumPostcodeEmbed>
              </Modal>
            )}
          </W.PostalCodeWrapper>
          <W.PostalCodeMain
            readOnly
            value={
              address
                ? address
                : boardData?.fetchBoard?.boardAddress?.address ?? ""
            }
          ></W.PostalCodeMain>
          <W.PostalCodeSub
            {...register("addressDetail")}
            defaultValue={boardData?.fetchBoard?.boardAddress?.addressDetail}
          ></W.PostalCodeSub>
        </W.AddressWrapper>
        <W.YoutubeWrapper>
          <W.Label>유튜브</W.Label>
          <W.Youtube
            {...register("youtubeUrl")}
            defaultValue={boardData?.fetchBoard.youtubeUrl}
          ></W.Youtube>
        </W.YoutubeWrapper>
        <W.ImageWrapper>
          <W.Label>사진첨부</W.Label>
          {fileUrls.map((el, index) => (
            <Uploads01
              key={uuidv4()}
              index={index}
              fileUrl={el}
              onChangeFileUrls={onChangeFileUrls}
            />
          ))}
        </W.ImageWrapper>
        <W.OptionWrapper>
          <W.Label>메인설정</W.Label>
          <W.RadioWrapper>
            <W.RadioButton type="radio" name="opt" id="youtube"></W.RadioButton>
            <W.RadioLabel>유튜브</W.RadioLabel>
            <W.RadioButton type="radio" name="opt" id="image"></W.RadioButton>
            <W.RadioLabel>사진</W.RadioLabel>
          </W.RadioWrapper>
        </W.OptionWrapper>
        <W.SubmitWrapper>
          <W.SubmitButton>
            {props.isEdit ? "수정하기" : "등록하기"}
          </W.SubmitButton>
        </W.SubmitWrapper>
      </W.Wrapper>
    </form>
  );
}
